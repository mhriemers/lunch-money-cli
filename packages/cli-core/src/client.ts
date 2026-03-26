import { LunchMoneyClient } from "@lunch-money/lunch-money-js-v2";

export function createClient(apiKey: string, baseUrl?: string): LunchMoneyClient {
  return new LunchMoneyClient({ apiKey, ...(baseUrl && { baseUrl }) });
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
