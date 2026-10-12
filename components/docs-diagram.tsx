import type { CSSProperties } from "react";
import {
  type DiagramEdge,
  type DiagramName,
  type DiagramNode,
  type DiagramSpec,
  diagrams,
  type Point,
} from "@/lib/diagrams";

/** Round the corners of an explicitly routed orthogonal polyline. */
function connector(points: readonly Point[]) {
  let path = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const [px, py] = points[i - 1];
    const [nx, ny] = points[i + 1];
    const radius = Math.min(
      8,
      Math.hypot(x - px, y - py) / 2,
      Math.hypot(nx - x, ny - y) / 2,
    );
    path += ` L ${x + Math.sign(px - x) * radius} ${y + Math.sign(py - y) * radius}`;
    path += ` Q ${x} ${y} ${x + Math.sign(nx - x) * radius} ${y + Math.sign(ny - y) * radius}`;
  }
  const last = points[points.length - 1];
  return `${path} L ${last[0]} ${last[1]}`;
}

function Edge({ edge, prefix }: { edge: DiagramEdge; prefix: string }) {
  const tone = edge.tone ?? "muted";
  const labelWidth = edge.label
    ? Math.ceil((edge.label.text.length * 6.2 + 16) / 4) * 4
    : 0;
  return (
    <g className={`diagram-edge diagram-edge-${tone}`} data-edge={edge.id}>
      <path
        d={connector(edge.points)}
        fill="none"
        strokeWidth="1.5"
        strokeDasharray={edge.dashed ? "5 4" : undefined}
        markerEnd={`url(#${prefix}-arrow-${tone})`}
      />
      {edge.label && (
        <g className="diagram-edge-label">
          <rect
            x={edge.label.x - labelWidth / 2}
            y={edge.label.y}
            width={labelWidth}
            height={16}
            rx={2}
          />
          <text x={edge.label.x} y={edge.label.y + 11} textAnchor="middle">
            {edge.label.text}
          </text>
        </g>
      )}
    </g>
  );
}

function Node({ node }: { node: DiagramNode }) {
  const { x, y, w, h } = node;
  const titles = typeof node.title === "string" ? [node.title] : node.title;
  const details =
    typeof node.detail === "string" ? [node.detail] : (node.detail ?? []);
  const decision = node.treatment === "decision";
  const compact = !node.detail;
  const titleLineHeight = 20;
  const titleY = decision
    ? y + h / 2 + 5 - ((titles.length - 1) * titleLineHeight) / 2
    : y + (compact ? 48 : 44);
  return (
    <g
      className={`diagram-node diagram-node-${node.treatment ?? "default"}`}
      data-node={node.id}
    >
      {decision ? (
        <polygon
          points={`${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}`}
        />
      ) : (
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={node.treatment === "terminal" ? 24 : 8}
        />
      )}
      {node.tag && (
        <text className="diagram-tag" x={x + 16} y={y + 22}>
          {node.tag}
        </text>
      )}
      {titles.map((title, index) => (
        <text
          className="diagram-node-title"
          key={title}
          x={decision ? x + w / 2 : x + 16}
          y={titleY + index * titleLineHeight}
          textAnchor={decision ? "middle" : undefined}
        >
          {title}
        </text>
      ))}
      {details.map((detail, index) => (
        <text
          className="diagram-node-detail"
          key={detail}
          x={x + 16}
          y={y + 62 + index * 14}
        >
          {detail}
        </text>
      ))}
    </g>
  );
}

export function DocsDiagram({
  name,
  standalone = false,
}: {
  name: DiagramName;
  standalone?: boolean;
}) {
  const diagram: DiagramSpec = diagrams[name];
  const prefix = `everstrat-${name}`;
  return (
    <figure
      id={`${prefix}-diagram`}
      className="docs-diagram not-prose"
      style={{ "--diagram-width": `${diagram.width}px` } as CSSProperties}
    >
      <figcaption className="diagram-heading">
        <div>
          <span className="diagram-eyebrow">
            {diagram.number} / {diagram.kind}
          </span>
          <p className="diagram-title">{diagram.title}</p>
        </div>
        {!standalone && (
          <a
            className="diagram-open"
            href={`/diagrams/${name}.html`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${diagram.title} in a new tab`}
          >
            Open <span aria-hidden="true">↗</span>
          </a>
        )}
      </figcaption>
      <section
        className="diagram-scroll"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: The horizontal scroll region needs keyboard access.
        tabIndex={0}
        aria-label={`${diagram.title} Scroll horizontally to explore.`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          role="img"
          aria-labelledby={`${prefix}-title ${prefix}-desc`}
        >
          <title id={`${prefix}-title`}>{diagram.title}</title>
          <desc id={`${prefix}-desc`}>{diagram.description}</desc>
          <defs>
            {(["muted", "accent", "link"] as const).map((tone) => (
              <marker
                key={tone}
                id={`${prefix}-arrow-${tone}`}
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon
                  className={`diagram-marker-${tone}`}
                  points="0 0, 8 3, 0 6"
                />
              </marker>
            ))}
          </defs>
          <rect
            className="diagram-paper"
            width={diagram.width}
            height={diagram.height}
          />
          {diagram.lifelines?.map((line) => (
            <line
              key={line.x}
              className="diagram-lifeline"
              x1={line.x}
              x2={line.x}
              y1={line.from}
              y2={line.to}
            />
          ))}
          {diagram.edges.map((edge) => (
            <Edge key={edge.id} edge={edge} prefix={prefix} />
          ))}
          {diagram.nodes.map((node) => (
            <Node key={node.id} node={node} />
          ))}
          {diagram.notes?.map((note) => (
            <g key={note.title} className="diagram-note">
              <text className="diagram-tag" x={note.x} y={note.y}>
                {note.title}
              </text>
              {note.detail && (
                <text
                  className="diagram-node-detail"
                  x={note.x}
                  y={note.y + 20}
                >
                  {note.detail}
                </text>
              )}
            </g>
          ))}
        </svg>
      </section>
      <div className="diagram-legend">
        {diagram.legend.map((item) => (
          <span key={item.text}>
            <i aria-hidden="true" className={`diagram-key-${item.treatment}`} />
            {item.text}
          </span>
        ))}
      </div>
      <p className="diagram-caption">{diagram.caption}</p>
      <span className="diagram-scroll-hint" aria-hidden="true">
        Scroll horizontally to explore <span>↔</span>
      </span>
    </figure>
  );
}
