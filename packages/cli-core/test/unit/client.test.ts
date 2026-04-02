import { describe, expect, it } from "vitest";

import { buildBody, type FieldMapping } from "../../src/client.js";

describe("buildBody", () => {
  it("maps flags to snake_case params by default", () => {
    const flags = { "end-date": "2025-01-31", "start-date": "2025-01-01" };
    const mappings: FieldMapping[] = [{ flag: "start-date" }, { flag: "end-date" }];
    expect(buildBody(flags, mappings)).toEqual({ end_date: "2025-01-31", start_date: "2025-01-01" });
  });

  it("skips flags with value undefined", () => {
    const flags = { description: undefined, name: "foo" };
    const mappings: FieldMapping[] = [{ flag: "name" }, { flag: "description" }];
    expect(buildBody(flags, mappings)).toEqual({ name: "foo" });
  });

  it("includes falsy values (empty string, 0, false)", () => {
    const flags = { amount: "0", "category-id": 0, notes: "" };
    const mappings: FieldMapping[] = [{ flag: "amount" }, { flag: "notes" }, { flag: "category-id" }];
    expect(buildBody(flags, mappings)).toEqual({ amount: "0", category_id: 0, notes: "" });
  });

  it("converts boolean string flags", () => {
    const flags = { archived: "true", "is-income": "false" };
    const mappings: FieldMapping[] = [
      { flag: "archived", type: "boolean" },
      { flag: "is-income", type: "boolean" },
    ];
    expect(buildBody(flags, mappings)).toEqual({ archived: true, is_income: false });
  });

  it("converts actual boolean flags (Flags.boolean)", () => {
    const flags = { "apply-rules": true };
    const mappings: FieldMapping[] = [{ flag: "apply-rules", type: "boolean" }];
    expect(buildBody(flags, mappings)).toEqual({ apply_rules: true });
  });

  it("converts nullable string values", () => {
    const flags = { "closed-on": "null", "text-color": "FFE7D4" };
    const mappings: FieldMapping[] = [
      { flag: "closed-on", type: "nullable" },
      { flag: "text-color", type: "nullable" },
    ];
    expect(buildBody(flags, mappings)).toEqual({ closed_on: null, text_color: "FFE7D4" });
  });

  it("converts nullable-boolean values", () => {
    const flags = { collapsed: "null", "is-group": "true" };
    const mappings: FieldMapping[] = [
      { flag: "collapsed", type: "nullable-boolean" },
      { flag: "is-group", type: "nullable-boolean" },
    ];
    expect(buildBody(flags, mappings)).toEqual({ collapsed: null, is_group: true });
  });

  it("converts nullable-int values", () => {
    const flags = { "group-id": "null", order: "5" };
    const mappings: FieldMapping[] = [
      { flag: "group-id", type: "nullable-int" },
      { flag: "order", type: "nullable-int" },
    ];
    expect(buildBody(flags, mappings)).toEqual({ group_id: null, order: 5 });
  });

  it("parses JSON values", () => {
    const flags = { "custom-metadata": '{"key":"value"}' };
    const mappings: FieldMapping[] = [{ flag: "custom-metadata", type: "json" }];
    expect(buildBody(flags, mappings)).toEqual({ custom_metadata: { key: "value" } });
  });

  it("throws on invalid JSON", () => {
    const flags = { "custom-metadata": "bad-json" };
    const mappings: FieldMapping[] = [{ flag: "custom-metadata", type: "json" }];
    expect(() => buildBody(flags, mappings)).toThrow("custom-metadata must be valid JSON");
  });

  it("uses custom param name when provided", () => {
    const flags = { "plaid-account-id": 42 };
    const mappings: FieldMapping[] = [{ flag: "plaid-account-id", param: "id" }];
    expect(buildBody(flags, mappings)).toEqual({ id: 42 });
  });
});
