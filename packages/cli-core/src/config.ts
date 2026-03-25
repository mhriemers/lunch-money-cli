import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export interface Config {
  api_key?: string;
  plugins?: Record<string, Record<string, unknown>>;
}

export function getConfigPath(configDir: string): string {
  return join(configDir, "config.json");
}

export function loadConfig(configDir: string): Config {
  try {
    const raw = readFileSync(getConfigPath(configDir), "utf8");
    return JSON.parse(raw) as Config;
  } catch {
    return {};
  }
}

export function saveConfig(configDir: string, config: Partial<Config>): void {
  let existing: Record<string, unknown> = {};
  try {
    existing = JSON.parse(readFileSync(getConfigPath(configDir), "utf8"));
  } catch {}

  const merged: Record<string, unknown> = { ...existing };
  for (const [key, value] of Object.entries(config)) {
    const isNestedMerge =
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      existing[key] &&
      typeof existing[key] === "object" &&
      !Array.isArray(existing[key]);

    merged[key] = isNestedMerge
      ? { ...(existing[key] as Record<string, unknown>), ...(value as Record<string, unknown>) }
      : value;
  }

  mkdirSync(configDir, { recursive: true });
  writeFileSync(getConfigPath(configDir), JSON.stringify(merged, null, 2) + "\n");
}
