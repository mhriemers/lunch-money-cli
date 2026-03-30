 
import { expect } from "chai";

import TransactionsGroup from "../../../src/commands/transactions/group.js";
import { runCommand } from "../../helpers/index.js";

describe("transactions group", () => {
  const groupData = JSON.stringify({ date: "2025-01-15", ids: [1, 2, 3], payee: "Grouped" });

  it("groups transactions from JSON data", async () => {
    const response = { id: 999 };
    const { client, result } = await runCommand(TransactionsGroup, ["--data", groupData, "--json"], (c) => {
      c.transactions.group.resolves(response);
    });
    expect(result).to.deep.equal(response);
    const body = client.transactions.group.firstCall.args[0];
    expect(body.ids).to.deep.equal([1, 2, 3]);
    expect(body.date).to.equal("2025-01-15");
    expect(body.payee).to.equal("Grouped");
  });

  it("shows group ID in confirmation message", async () => {
    const { stdout } = await runCommand(TransactionsGroup, ["--data", groupData], (c) => {
      c.transactions.group.resolves({ id: 999 });
    });
    expect(stdout).to.equal("Grouped transactions (group ID: 999).\n");
  });
});
