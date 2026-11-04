/**
 * Sync prerendered site into hosting/banahosting for Banahosting deploys.
 * Preserves hosting/banahosting/api (PHP contact endpoint).
 */
import { cp, mkdir, rm, access, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, "../dist/public");
const hosting = path.resolve(__dirname, "../../../hosting/banahosting");
const apiDir = path.join(hosting, "api");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(path.join(dist, "index.html")))) {
    throw new Error("dist/public/index.html missing — run build first");
  }
  await mkdir(hosting, { recursive: true });

  const entries = await readdir(hosting, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "api") continue;
    await rm(path.join(hosting, entry.name), { recursive: true, force: true });
  }

  // Keep PHP API intact; copy everything else from dist.
  await cp(dist, hosting, {
    recursive: true,
    filter: (src) => {
      const rel = path.relative(dist, src);
      return !rel.split(path.sep).includes("api");
    },
  });

  if (!(await exists(apiDir))) {
    console.warn("[sync-banahosting] warning: api/ missing after sync — restore api/contact manually");
  }

  console.log(`[sync-banahosting] synced ${dist} → ${hosting}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
