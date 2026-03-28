import { stat } from "node:fs/promises";
import path from "node:path";

export async function getContentFileLastModified(
  relativePath: string,
): Promise<Date | undefined> {
  try {
    const file = path.join(process.cwd(), "content", "docs", relativePath);
    const info = await stat(file);
    return info.mtime;
  } catch {
    return undefined;
  }
}
