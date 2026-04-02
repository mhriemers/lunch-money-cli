import { LunchMoneyClient } from "@lunch-money/lunch-money-js-v2";

export interface FieldMapping<K extends string = string> {
  flag: K;
  param?: string;
  type?: FieldType;
}

export type FieldType = "boolean" | "json" | "nullable" | "nullable-boolean" | "nullable-int" | "passthrough";

/**
 * Build an API request body from parsed CLI flags using a declarative mapping.
 *
 * - `passthrough` (default): forwards the flag value as-is
 * - `boolean`: converts `"true"` / `true` to `true`, anything else to `false`
 * - `nullable`: converts `"null"` to `null`, otherwise passes through
 * - `nullable-boolean`: converts `"null"` to `null`, `"true"` to `true`, else `false`
 * - `nullable-int`: converts `"null"` to `null`, otherwise `parseInt`
 * - `json`: parses the string value as JSON via `parseJsonArg`
 *
 * Only flags with value `!== undefined` are included in the result.
 * `param` defaults to the snake_case version of `flag`.
 */
export function buildBody<T = Record<string, unknown>, F extends Record<string, unknown> = Record<string, unknown>>(
  flags: F,
  mappings: ReadonlyArray<FieldMapping<Extract<keyof F, string>>>,
): Partial<Record<string, unknown> & T> {
  const body: Record<string, unknown> = {};
  for (const { flag, param: parameter = kebabToSnake(flag), type = "passthrough" } of mappings) {
    const value = flags[flag];
    if (value === undefined) continue;
    switch (type) {
      case "boolean": {
        body[parameter] = value === true || value === "true";
        break;
      }

      case "json": {
        body[parameter] = parseJsonArg(value as string, flag);
        break;
      }

      case "nullable": {
        body[parameter] = value === "null" ? null : value;
        break;
      }

      case "nullable-boolean": {
        body[parameter] = value === "null" ? null : value === true || value === "true";
        break;
      }

      case "nullable-int": {
        body[parameter] = value === "null" ? null : Number.parseInt(value as string, 10);
        break;
      }

      case "passthrough": {
        body[parameter] = value;
        break;
      }
      // No default
    }
  }

  return body as Partial<Record<string, unknown> & T>;
}

export function createClient(apiKey: string, baseUrl?: string): LunchMoneyClient {
  return new LunchMoneyClient({ apiKey, ...(baseUrl && { baseUrl }) });
}

export function parseJsonArg(value: string, name: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`${name} must be valid JSON`);
  }
}

function kebabToSnake(s: string): string {
  return s.replaceAll("-", "_");
}
