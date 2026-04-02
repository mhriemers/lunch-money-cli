import { describe, expect, it, vi } from "vitest";

import TransactionsGroup from "../../../src/commands/transactions/group.js";
import { mockClient, runCommand } from "../../setup.js";

describe("transactions group", () => {
  const groupData = JSON.stringify({ date: "2025-01-15", ids: [1, 2, 3], payee: "Grouped" });

  it("groups transactions from JSON data", async () => {
    const response = { id: 999 };
    const group = vi.fn().mockResolvedValue(response);
    mockClient({ transactions: { group } });

    const { result } = await runCommand(TransactionsGroup, ["--data", groupData, "--json"]);
    expect(result).toEqual(response);
    const body = group.mock.calls[0][0];
    expect(body.ids).toEqual([1, 2, 3]);
    expect(body.date).toBe("2025-01-15");
    expect(body.payee).toBe("Grouped");
  });

  it("shows group ID in confirmation message", async () => {
    const group = vi.fn().mockResolvedValue({ id: 999 });
    mockClient({ transactions: { group } });

    const { stdout } = await runCommand(TransactionsGroup, ["--data", groupData]);
    expect(stdout).toBe("Grouped transactions (group ID: 999).\n");
  });
});
