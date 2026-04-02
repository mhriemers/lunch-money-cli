import { describe, expect, it, vi } from "vitest";

import TransactionsGet from "../../../src/commands/transactions/get.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("transactions get", () => {
  it("returns transaction as JSON", async () => {
    const data = { amount: "-4.50", date: "2025-01-15", id: 100, payee: "Coffee" };
    const get = vi.fn().mockResolvedValue(data);
    mockClient({ transactions: { get } });

    const { result } = await runCommand(TransactionsGet, ["100", "--json"]);
    expect(result).toEqual(data);
    expect(get.mock.calls[0][0]).toBe(100);
  });

  it("formats transaction detail as text", async () => {
    const get = vi.fn().mockResolvedValue({
      amount: "-4.50",
      category_id: 10,
      created_at: "2025-01-15T12:00:00.000Z",
      currency: "usd",
      date: "2025-01-15",
      external_id: null,
      id: 100,
      manual_account_id: 42,
      notes: "Morning coffee",
      original_name: "COFFEE SHOP #123",
      payee: "Coffee",
      plaid_account_id: null,
      recurring_id: null,
      status: "cleared",
      updated_at: "2025-01-15T12:00:00.000Z",
    });
    mockClient({ transactions: { get } });

    const { stdout } = await runCommand(TransactionsGet, ["100"]);
    await expect(stdout).toMatchFileSnapshot(fixture("transactions/get-detail"));
  });
});
