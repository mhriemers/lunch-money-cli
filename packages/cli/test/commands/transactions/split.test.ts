import { describe, expect, it, vi } from "vitest";

import TransactionsSplit from "../../../src/commands/transactions/split.js";
import { mockClient, runCommand } from "../../setup.js";

describe("transactions split", () => {
  const parts = JSON.stringify([
    { amount: 25, payee: "Part A" },
    { amount: 17.45, payee: "Part B" },
  ]);

  it("splits transaction with parts", async () => {
    const response = { children: [{ id: 101 }, { id: 102 }], id: 100 };
    const split = vi.fn().mockResolvedValue(response);
    mockClient({ transactions: { split } });

    const { result } = await runCommand(TransactionsSplit, ["100", "--parts", parts, "--json"]);
    expect(result).toEqual(response);
    const [id, body] = split.mock.calls[0];
    expect(id).toBe(100);
    expect(body.child_transactions).toHaveLength(2);
    expect(body.child_transactions[0].amount).toBe(25);
  });

  it("shows confirmation message with count", async () => {
    const split = vi.fn().mockResolvedValue({});
    mockClient({ transactions: { split } });

    const { stdout } = await runCommand(TransactionsSplit, ["100", "--parts", parts]);
    expect(stdout).toBe("Split transaction 100 into 2 parts.\n");
  });
});
