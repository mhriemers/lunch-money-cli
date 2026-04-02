import { describe, expect, it, vi } from "vitest";

import TransactionsUpdateMany from "../../../src/commands/transactions/update-many.js";
import { mockClient, runCommand } from "../../setup.js";

describe("transactions update-many", () => {
  const txJson = JSON.stringify([
    { category_id: 10, id: 1 },
    { id: 2, status: "reviewed" },
  ]);

  it("updates multiple transactions from JSON", async () => {
    const response = { updated: [1, 2] };
    const updateMany = vi.fn().mockResolvedValue(response);
    mockClient({ transactions: { updateMany } });

    const { result } = await runCommand(TransactionsUpdateMany, ["--transactions", txJson, "--json"]);
    expect(result).toEqual(response);
    const body = updateMany.mock.calls[0][0];
    expect(body.transactions).toHaveLength(2);
    expect(body.transactions[0]).toMatchObject({ category_id: 10, id: 1 });
  });

  it("shows count in confirmation message", async () => {
    const updateMany = vi.fn().mockResolvedValue({ updated: [1, 2] });
    mockClient({ transactions: { updateMany } });

    const { stdout } = await runCommand(TransactionsUpdateMany, ["--transactions", txJson]);
    expect(stdout).toBe("Updated 2 transaction(s).\n");
  });
});
