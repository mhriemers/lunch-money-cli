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
  } catch {
    /* file may not exist yet */
  }

  const merged = deepMerge(existing, config as Record<string, unknown>);
  mkdirSync(configDir, { recursive: true });
  writeFileSync(getConfigPath(configDir), JSON.stringify(merged, null, 2) + "\n");
}

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    result[key] =
      isPlainObject(result[key]) && isPlainObject(source[key])
        ? deepMerge(result[key] as Record<string, unknown>, source[key] as Record<string, unknown>)
        : source[key];
  }

  return result;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
