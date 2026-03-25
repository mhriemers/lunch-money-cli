import { LunchMoneyClient } from "@lunch-money/lunch-money-js-v2";

let resolvedApiKey: string | undefined;

export function setApiKey(key: string): void {
  resolvedApiKey = key;
}

export function createClient(): LunchMoneyClient {
  const apiKey = resolvedApiKey;
  if (!apiKey) {
    throw new Error("No API key found. Provide one via: --api-key flag, LUNCH_MONEY_API_KEY env var, or run 'lm auth'");
  }

  return new LunchMoneyClient({ apiKey });
}

export function parseIntArg(value: string, name: string): number {
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n)) {
    throw new TypeError(`${name} must be a valid integer`);
  }

  return n;
}

export function parseJsonArg(value: string, name: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`${name} must be valid JSON`);
  }
}
