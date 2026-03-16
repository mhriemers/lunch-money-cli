import type { ColumnDef, FieldDef } from "./formatters.js";

const bool = (v: unknown) => (v === true ? "true" : v === false ? "false" : "-");

// ── Accounts ──────────────────────────────────────────────

export const accountColumns: ColumnDef[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "type", header: "Type" },
  { key: "balance", header: "Balance" },
  { key: "currency", header: "Currency" },
  { key: "status", header: "Status" },
];

export const accountFields: FieldDef[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  { key: "subtype", label: "Subtype" },
  { key: "display_name", label: "Display Name" },
  { key: "balance", label: "Balance" },
  { key: "currency", label: "Currency" },
  { key: "status", label: "Status" },
  { key: "institution_name", label: "Institution" },
  { key: "balance_as_of", label: "Balance As Of" },
  { key: "closed_on", label: "Closed On" },
  { key: "created_at", label: "Created At" },
];

// ── Categories ────────────────────────────────────────────

export const categoryColumns: ColumnDef[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "is_group", header: "Group" },
  { key: "is_income", header: "Income" },
  { key: "archived", header: "Archived" },
];

export const categoryFields: FieldDef[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "is_group", label: "Group", format: bool },
  { key: "is_income", label: "Income", format: bool },
  { key: "archived", label: "Archived", format: bool },
  { key: "exclude_from_budget", label: "Exclude Budget", format: bool },
  { key: "exclude_from_totals", label: "Exclude Totals", format: bool },
  { key: "group_id", label: "Group ID" },
  { key: "order", label: "Order" },
  { key: "created_at", label: "Created At" },
];

// ── Tags ──────────────────────────────────────────────────

export const tagColumns: ColumnDef[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "archived", header: "Archived" },
];

export const tagFields: FieldDef[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "archived", label: "Archived", format: bool },
  { key: "text_color", label: "Text Color" },
  { key: "background_color", label: "Background Color" },
];

// ── Transactions ──────────────────────────────────────────

export const transactionColumns: ColumnDef[] = [
  { key: "id", header: "ID" },
  { key: "date", header: "Date" },
  { key: "payee", header: "Payee" },
  { key: "amount", header: "Amount" },
  { key: "currency", header: "Currency" },
  { key: "status", header: "Status" },
];

export const transactionFields: FieldDef[] = [
  { key: "id", label: "ID" },
  { key: "date", label: "Date" },
  { key: "payee", label: "Payee" },
  { key: "original_name", label: "Original Name" },
  { key: "amount", label: "Amount" },
  { key: "currency", label: "Currency" },
  { key: "status", label: "Status" },
  { key: "category_id", label: "Category ID" },
  { key: "notes", label: "Notes" },
  { key: "recurring_id", label: "Recurring ID" },
  { key: "manual_account_id", label: "Account ID" },
  { key: "plaid_account_id", label: "Plaid Account ID" },
  { key: "external_id", label: "External ID" },
  { key: "created_at", label: "Created At" },
  { key: "updated_at", label: "Updated At" },
];

// ── Plaid Accounts ────────────────────────────────────────

export const plaidAccountColumns: ColumnDef[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "institution_name", header: "Institution" },
  { key: "type", header: "Type" },
  { key: "balance", header: "Balance" },
  { key: "currency", header: "Currency" },
  { key: "status", header: "Status" },
];

export const plaidAccountFields: FieldDef[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "display_name", label: "Display Name" },
  { key: "institution_name", label: "Institution" },
  { key: "type", label: "Type" },
  { key: "subtype", label: "Subtype" },
  { key: "balance", label: "Balance" },
  { key: "currency", label: "Currency" },
  { key: "status", label: "Status" },
  { key: "balance_last_update", label: "Balance Updated" },
  { key: "date_linked", label: "Date Linked" },
];

// ── Recurring ─────────────────────────────────────────────

export const recurringColumns: ColumnDef[] = [
  { key: "id", header: "ID" },
  { key: "description", header: "Description" },
  { key: "transaction_criteria:payee", header: "Payee" },
  { key: "transaction_criteria:amount", header: "Amount" },
  { key: "transaction_criteria:currency", header: "Currency" },
  { key: "status", header: "Status" },
];

export const recurringFields: FieldDef[] = [
  { key: "id", label: "ID" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status" },
  { key: "transaction_criteria:payee", label: "Payee" },
  { key: "transaction_criteria:amount", label: "Amount" },
  { key: "transaction_criteria:currency", label: "Currency" },
  { key: "transaction_criteria:granularity", label: "Granularity" },
  { key: "transaction_criteria:anchor_date", label: "Anchor Date" },
  { key: "created_at", label: "Created At" },
];

// ── User (detail only) ───────────────────────────────────

export const userFields: FieldDef[] = [
  { key: "id", label: "User ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "account_id", label: "Account ID" },
  { key: "budget_name", label: "Budget Name" },
  { key: "primary_currency", label: "Currency" },
  { key: "api_key_label", label: "API Key Label" },
];

// ── Budget Settings (detail only) ─────────────────────────

export const budgetSettingsFields: FieldDef[] = [
  { key: "budget_period_granularity", label: "Granularity" },
  { key: "budget_period_quantity", label: "Quantity" },
  { key: "budget_period_anchor_date", label: "Anchor Date" },
  { key: "budget_use_last_day_of_month", label: "Use Last Day", format: bool },
  { key: "budget_income_option", label: "Income Option" },
  { key: "budget_hide_no_activity", label: "Hide No Activity", format: bool },
  { key: "budget_rollover_left_to_budget", label: "Rollover Left", format: bool },
];

// ── Summary ───────────────────────────────────────────────

export const summaryColumns: ColumnDef[] = [
  { key: "category_id", header: "Category ID" },
  { key: "totals:budgeted", header: "Budgeted" },
  { key: "totals:recurring_activity", header: "Recurring" },
  { key: "totals:other_activity", header: "Other" },
  { key: "totals:available", header: "Available" },
];
