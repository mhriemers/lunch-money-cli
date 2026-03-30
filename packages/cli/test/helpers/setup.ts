import { Config } from "@oclif/core";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "../..");

let _config: Config | undefined;

/**
 * Returns a cached oclif Config instance. The first call loads it;
 * subsequent calls return the same instance.
 */
export async function getConfig(): Promise<Config> {
  if (!_config) {
    _config = await Config.load({ root });
  }

  return _config;
}
