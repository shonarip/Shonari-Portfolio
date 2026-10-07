// One command to publish the site: builds with the production addresses, then uploads out/ to Cloudflare.
//   npm run deploy:site
// Needs `npx wrangler login` once on this computer. Videos live in the R2 bucket (not uploaded here).
import { spawnSync } from "node:child_process";

const env = {
  ...process.env,
  NEXT_PUBLIC_MEDIA_BASE: "https://media.nariportfolio.com",
  NEXT_PUBLIC_SITE_URL: "https://nariportfolio.com",
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID ?? "862c0069ecf7dfc1cb9c1be15886722b",
};

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: "inherit", env, shell: true });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

run("npm", ["run", "build"]);
run("npx", ["wrangler", "deploy", "--config", "wrangler.jsonc"]);
