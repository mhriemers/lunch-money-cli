import { describe, expect, it, vi } from "vitest";

import TransactionsList from "../../../src/commands/transactions/list.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("transactions list", () => {
  it("returns transactions as JSON", async () => {
    const data = { transactions: [{ amount: "-4.50", id: 1, payee: "Coffee" }] };
    const getAll = vi.fn().mockResolvedValue(data);
    mockClient({ transactions: { getAll } });

    const { result } = await runCommand(TransactionsList, ["--json"]);
    expect(result).toEqual(data);
  });

  it("formats transactions as a table", async () => {
    const getAll = vi.fn().mockResolvedValue({
      transactions: [
        { amount: "-4.50", currency: "usd", date: "2025-01-15", id: 1, payee: "Coffee", status: "cleared" },
      ],
    });
    mockClient({ transactions: { getAll } });

    const { stdout } = await runCommand(TransactionsList, []);
    await expect(stdout).toMatchFileSnapshot(fixture("transactions/list-table"));
  });

  it("maps CLI flags to API params", async () => {
    const getAll = vi.fn().mockResolvedValue({ transactions: [] });
    mockClient({ transactions: { getAll } });

    await runCommand(TransactionsList, [
      "--start-date",
      "2025-01-01",
      "--end-date",
      "2025-01-31",
      "--category-id",
      "5",
      "--status",
      "reviewed",
      "--limit",
      "100",
      "--json",
    ]);
    expect(getAll.mock.calls[0][0]).toEqual({
      category_id: 5,
      end_date: "2025-01-31",
      limit: 100,
      start_date: "2025-01-01",
      status: "reviewed",
    });
  });

  it("maps boolean and pagination flags", async () => {
    const getAll = vi.fn().mockResolvedValue({ transactions: [] });
    mockClient({ transactions: { getAll } });

    await runCommand(TransactionsList, [
      "--include-pending",
      "--include-children",
      "--offset",
      "50",
      "--json",
    ]);
    const params = getAll.mock.calls[0][0];
    expect(params.include_pending).toBe(true);
    expect(params.include_children).toBe(true);
    expect(params.offset).toBe(50);
  });

  it("shows pagination message when has_more is true", async () => {
    const getAll = vi.fn().mockResolvedValue({
      has_more: true,
      transactions: [
        { amount: "-4.50", currency: "usd", date: "2025-01-15", id: 1, payee: "Coffee", status: "cleared" },
      ],
    });
    mockClient({ transactions: { getAll } });

    const { stdout } = await runCommand(TransactionsList, []);
    await expect(stdout).toMatchFileSnapshot(fixture("transactions/list-pagination"));
  });

  it("does not show pagination message when has_more is false", async () => {
    const getAll = vi.fn().mockResolvedValue({
      has_more: false,
      transactions: [
        { amount: "-4.50", currency: "usd", date: "2025-01-15", id: 1, payee: "Coffee", status: "cleared" },
      ],
    });
    mockClient({ transactions: { getAll } });

    const { stdout } = await runCommand(TransactionsList, []);
    await expect(stdout).toMatchFileSnapshot(fixture("transactions/list-no-pagination"));
  });

  it("shows pagination message when hasMore (camelCase) is true", async () => {
    const getAll = vi.fn().mockResolvedValue({
      hasMore: true,
      transactions: [
        { amount: "-4.50", currency: "usd", date: "2025-01-15", id: 1, payee: "Coffee", status: "cleared" },
      ],
    });
    mockClient({ transactions: { getAll } });

    const { stdout } = await runCommand(TransactionsList, []);
    await expect(stdout).toMatchFileSnapshot(fixture("transactions/list-pagination"));
  });

  it("maps additional filter flags to API params", async () => {
    const getAll = vi.fn().mockResolvedValue({ transactions: [] });
    mockClient({ transactions: { getAll } });

    await runCommand(TransactionsList, [
      "--tag-id", "7",
      "--recurring-id", "3",
      "--manual-account-id", "10",
      "--plaid-account-id", "20",
      "--created-since", "2025-01-01",
      "--updated-since", "2025-01-15",
      "--is-pending",
      "--is-group-parent",
      "--include-files",
      "--include-metadata",
      "--include-group-children",
      "--include-split-parents",
      "--json",
    ]);
    const params = getAll.mock.calls[0][0];
    expect(params.tag_id).toBe(7);
    expect(params.recurring_id).toBe(3);
    expect(params.manual_account_id).toBe(10);
    expect(params.plaid_account_id).toBe(20);
    expect(params.created_since).toBe("2025-01-01");
    expect(params.updated_since).toBe("2025-01-15");
    expect(params.is_pending).toBe(true);
    expect(params.is_group_parent).toBe(true);
    expect(params.include_files).toBe(true);
    expect(params.include_metadata).toBe(true);
    expect(params.include_group_children).toBe(true);
    expect(params.include_split_parents).toBe(true);
  });

  it("calls getAll with empty params when no flags", async () => {
    const getAll = vi.fn().mockResolvedValue({ transactions: [] });
    mockClient({ transactions: { getAll } });

    await runCommand(TransactionsList, ["--json"]);
    expect(getAll.mock.calls[0][0]).toEqual({});
  });
});
