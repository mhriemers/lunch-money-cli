import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

export interface Config {
  api_key?: string;
}

export function getConfigPath(configDir: string): string {
  return join(configDir, "config.json");
}

export function loadConfig(configDir: string): Config {
  try {
    const raw = readFileSync(getConfigPath(configDir), "utf-8");
    return JSON.parse(raw) as Config;
  } catch {
    return {};
  }
}

export function saveConfig(configDir: string, config: Config): void {
  mkdirSync(configDir, { recursive: true });
  writeFileSync(getConfigPath(configDir), JSON.stringify(config, null, 2) + "\n");
}
