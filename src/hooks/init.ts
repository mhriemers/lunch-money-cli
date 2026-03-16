import { Hook } from "@oclif/core";
import { setApiKey } from "../client.js";
import { loadConfig } from "../config.js";

const hook: Hook<"init"> = async function (opts) {
  // Skip auth resolution for the auth command itself
  if (opts.id === "auth") return;

  const argv = opts.argv as string[];
  let key: string | undefined;

  // Check --api-key flag
  const flagIndex = argv.indexOf("--api-key");
  if (flagIndex !== -1 && argv[flagIndex + 1]) {
    key = argv[flagIndex + 1];
  }

  // Fallback to env, then config
  key ??= process.env.LUNCH_MONEY_API_KEY ?? loadConfig(opts.config.configDir).api_key;

  if (key) {
    setApiKey(key);
  }
};

export default hook;
