// After `next build`, remove files from out/ that Cloudflare Pages cannot host (over 25 MiB).
// This only touches the build output in out/; nothing in public/ is changed or deleted.
// Videos are served from R2 instead (see src/content/media.ts); the large artwork originals
// listed here are not used by any page, which pages show the smaller web versions.
import fs from "node:fs";
import path from "node:path";

const LIMIT = 25 * 1024 * 1024 - 1024; // a little under 25 MiB
const OUT = "out";

if (!fs.existsSync(OUT)) {
  console.log("prune-deploy: no out/ folder, nothing to do");
  process.exit(0);
}

const removed = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (fs.statSync(p).size > LIMIT) {
      removed.push([p.split(path.sep).join("/"), fs.statSync(p).size]);
      fs.rmSync(p);
    }
  }
})(OUT);

for (const [p, size] of removed) console.log(`prune-deploy: left out ${(size / 1048576).toFixed(1)} MB ${p}`);
console.log(`prune-deploy: ${removed.length} file(s) over 25 MiB left out of out/`);
