import { describe, it, expect } from "vitest";
import { formatTable, formatDetail } from "../../src/formatters.js";
import type { ColumnDef, FieldDef } from "../../src/formatters.js";

const columns: ColumnDef[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
];

describe("formatTable", () => {
  it("returns 'No results.' for empty array", () => {
    expect(formatTable([], columns)).toBe("No results.");
  });

  it("renders headers and values", () => {
    const rows = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const output = formatTable(rows, columns);
    expect(output).toContain("ID");
    expect(output).toContain("Name");
    expect(output).toContain("Alice");
    expect(output).toContain("Bob");
  });

  it("renders separator line between header and data", () => {
    const rows = [{ id: 1, name: "Test" }];
    const lines = formatTable(rows, columns).split("\n");
    expect(lines.length).toBe(3);
    expect(lines[1]).toMatch(/^[─\s]+$/);
  });
});

describe("formatDetail", () => {
  const fields: FieldDef[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
  ];

  it("renders key-value pairs", () => {
    const output = formatDetail({ id: 42, name: "Test" }, fields);
    expect(output).toContain("ID");
    expect(output).toContain("42");
    expect(output).toContain("Name");
    expect(output).toContain("Test");
  });

  it("shows dash for missing values", () => {
    const output = formatDetail({ id: 1 }, fields);
    expect(output).toContain("-");
  });

  it("applies custom format function", () => {
    const fieldsWithFormat: FieldDef[] = [
      { key: "active", label: "Active", format: (v) => (v ? "YES" : "NO") },
    ];
    const output = formatDetail({ active: true }, fieldsWithFormat);
    expect(output).toContain("YES");
  });
});
