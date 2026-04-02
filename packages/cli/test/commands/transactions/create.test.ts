import { describe, expect, it, vi } from "vitest";

import TransactionsCreate from "../../../src/commands/transactions/create.js";
import { mockClient, runCommand } from "../../setup.js";

describe("transactions create", () => {
  const txJson = JSON.stringify([{ amount: 42.5, date: "2025-01-15", payee: "Coffee" }]);

  it("creates transactions from JSON", async () => {
    const response = { ids: [100] };
    const create = vi.fn().mockResolvedValue(response);
    mockClient({ transactions: { create } });

    const { result } = await runCommand(TransactionsCreate, ["--transactions", txJson, "--json"]);
    expect(result).toEqual(response);
    const body = create.mock.calls[0][0];
    expect(body.transactions).toEqual([{ amount: 42.5, date: "2025-01-15", payee: "Coffee" }]);
  });

  it("maps boolean flags", async () => {
    const create = vi.fn().mockResolvedValue({});
    mockClient({ transactions: { create } });

    await runCommand(TransactionsCreate, [
      "--transactions",
      txJson,
      "--apply-rules",
      "--skip-duplicates",
      "--skip-balance-update",
      "--json",
    ]);
    const body = create.mock.calls[0][0];
    expect(body.apply_rules).toBe(true);
    expect(body.skip_duplicates).toBe(true);
    expect(body.skip_balance_update).toBe(true);
  });

  it("shows count in confirmation message", async () => {
    const create = vi.fn().mockResolvedValue({ ids: [1] });
    mockClient({ transactions: { create } });

    const { stdout } = await runCommand(TransactionsCreate, ["--transactions", txJson]);
    expect(stdout).toBe("Created 1 transaction(s).\n");
  });

  it("extracts count from transactions array", async () => {
    const create = vi.fn().mockResolvedValue({ transactions: [{ id: 1 }, { id: 2 }] });
    mockClient({ transactions: { create } });

    const { stdout } = await runCommand(TransactionsCreate, [
      "--transactions",
      JSON.stringify([
        { amount: 1, date: "2025-01-01" },
        { amount: 2, date: "2025-01-02" },
      ]),
    ]);
    expect(stdout).toBe("Created 2 transaction(s).\n");
  });

  it("shows 0 count when response has neither ids nor transactions", async () => {
    const create = vi.fn().mockResolvedValue({});
    mockClient({ transactions: { create } });

    const { stdout } = await runCommand(TransactionsCreate, ["--transactions", txJson]);
    expect(stdout).toBe("Created 0 transaction(s).\n");
  });

  it("omits boolean flags from body when not set", async () => {
    const create = vi.fn().mockResolvedValue({});
    mockClient({ transactions: { create } });

    await runCommand(TransactionsCreate, ["--transactions", txJson, "--json"]);
    const body = create.mock.calls[0][0];
    expect(body).not.toHaveProperty("apply_rules");
    expect(body).not.toHaveProperty("skip_duplicates");
    expect(body).not.toHaveProperty("skip_balance_update");
  });
});
