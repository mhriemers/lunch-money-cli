export interface ColumnDef {
  header: string;
  key: string;
}

export interface FieldDef {
  format?: (value: unknown) => string;
  key: string;
  label: string;
}

/**
 *
 * @param data
 * @param fields
 */
export function formatDetail(data: Record<string, unknown>, fields: FieldDef[]): string {
  const maxLabel = Math.max(...fields.map((f) => f.label.length));
  return fields
    .map((f) => {
      const raw = resolve(data, f.key);
      const value = f.format ? f.format(raw) : toString(raw);
      return `${f.label.padEnd(maxLabel)}  ${value}`;
    })
    .join("\n");
}

/**
 *
 * @param rows
 * @param columns
 */
export function formatTable(rows: Record<string, unknown>[], columns: ColumnDef[]): string {
  if (rows.length === 0) return "No results.";

  const termWidth = process.stdout.columns || 120;
  const gap = 2;

  // Compute cell values
  const cells: string[][] = rows.map((row) => columns.map((col) => toString(resolve(row, col.key))));

  // Compute column widths
  const widths = columns.map((col, index) => Math.max(col.header.length, ...cells.map((row) => row[index].length)));

  // Shrink last column if total exceeds terminal width
  const totalWidth = widths.reduce((a, b) => a + b, 0) + gap * (widths.length - 1);
  if (totalWidth > termWidth && widths.length > 0) {
    const overflow = totalWidth - termWidth;
    const lastIndex = widths.length - 1;
    widths[lastIndex] = Math.max(4, widths[lastIndex] - overflow);
  }

  const spacer = " ".repeat(gap);
  const headerLine = columns.map((col, index) => pad(col.header, widths[index])).join(spacer);
  const separatorLine = widths.map((w) => "\u2500".repeat(w)).join(spacer);
  const dataLines = cells.map((row) => row.map((cell, index) => pad(cell, widths[index])).join(spacer));

  return [headerLine, separatorLine, ...dataLines].join("\n");
}

/**
 *
 * @param s
 * @param w
 */
function pad(s: string, w: number): string {
  if (s.length > w) return s.slice(0, w - 1) + "\u2026";
  return s + " ".repeat(w - s.length);
}

/**
 *
 * @param object
 * @param key
 */
function resolve(object: Record<string, unknown>, key: string): unknown {
  let current: unknown = object;
  for (const part of key.split(":")) {
    if (current === null || current === undefined || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

/**
 *
 * @param value
 */
function toString(value: unknown): string {
  if (value === null || value === undefined) return "-";
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value);
}
