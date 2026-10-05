// Lists every public image that has DZ's -400.webp / -1800.webp siblings.
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
const root = "public";
const out = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(jpe?g|png|webp)$/i.test(f) && !/-(400|1800)\.webp$/.test(f)) {
      const base = p.replace(/\.[^.]+$/, "");
      if (existsSync(`${base}-400.webp`) && existsSync(`${base}-1800.webp`))
        out.push("/" + relative(root, p).split("\\").join("/"));
    }
  }
};
walk(join(root, "work"));
out.sort();
writeFileSync("src/content/img-variants.json", JSON.stringify(out, null, 0) + "\n");
console.log(`img-variants: ${out.length}`);
