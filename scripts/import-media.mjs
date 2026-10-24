/** Import authenticated Drive file references through stdin. URLs are never saved. */
import { mkdir, stat } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdout.write("Ready for media manifest on stdin (input is hidden).\n");
let input = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) {
  input += chunk;
  if (input.includes("\n")) break;
}
const items = JSON.parse(input.trim());
await mkdir("public/media", { recursive: true });
let cursor = 0;
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (cursor < items.length) {
      const { slug, url, extension } = items[cursor++];
      if (!/^[a-z0-9-]+$/.test(slug) || !["mp4", "mov"].includes(extension))
        throw new Error("Invalid destination");
      const target = path.join("public/media", `${slug}-source.${extension}`);
      try {
        const s = await stat(target);
        if (s.size > 1000000) {
          console.log(`${slug}: already imported`);
          continue;
        }
      } catch {}
      const response = await fetch(url);
      if (!response.ok || !response.body)
        throw new Error(`${slug}: download failed (${response.status})`);
      await pipeline(
        Readable.fromWeb(response.body),
        createWriteStream(target),
      );
      console.log(`${slug}: imported ${(await stat(target)).size} bytes`);
    }
  }),
);
process.stdin.destroy();
