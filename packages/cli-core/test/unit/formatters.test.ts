/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import type { ColumnDef, FieldDef } from "../../src/formatters.js";

import { formatDetail, formatTable } from "../../src/formatters.js";

const columns: ColumnDef[] = [
  { header: "ID", key: "id" },
  { header: "Name", key: "name" },
];

describe("formatTable", () => {
  it("returns 'No results.' for empty array", () => {
    expect(formatTable([], columns)).to.equal("No results.");
  });

  it("renders headers and values", () => {
    const rows = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const output = formatTable(rows, columns);
    expect(output).to.contain("ID");
    expect(output).to.contain("Name");
    expect(output).to.contain("Alice");
    expect(output).to.contain("Bob");
  });

  it("renders separator line between header and data", () => {
    const rows = [{ id: 1, name: "Test" }];
    const lines = formatTable(rows, columns).split("\n");
    expect(lines).to.have.lengthOf(3);
    expect(lines[1]).to.match(/^[─\s]+$/);
  });
});

describe("formatDetail", () => {
  const fields: FieldDef[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
  ];

  it("renders key-value pairs", () => {
    const output = formatDetail({ id: 42, name: "Test" }, fields);
    expect(output).to.contain("ID");
    expect(output).to.contain("42");
    expect(output).to.contain("Name");
    expect(output).to.contain("Test");
  });

  it("shows dash for missing values", () => {
    const output = formatDetail({ id: 1 }, fields);
    expect(output).to.contain("-");
  });

  it("applies custom format function", () => {
    const fieldsWithFormat: FieldDef[] = [
      { format: (v) => (v ? "YES" : "NO"), key: "active", label: "Active" },
    ];
    const output = formatDetail({ active: true }, fieldsWithFormat);
    expect(output).to.contain("YES");
  });
});
