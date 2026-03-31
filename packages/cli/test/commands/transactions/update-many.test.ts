import { expect } from "chai";

import TransactionsUpdateMany from "../../../src/commands/transactions/update-many.js";
import { runCommand } from "../../helpers/index.js";

describe("transactions update-many", () => {
  const txJson = JSON.stringify([
    { category_id: 10, id: 1 },
    { id: 2, status: "reviewed" },
  ]);

  it("updates multiple transactions from JSON", async () => {
    const response = { updated: [1, 2] };
    const { client, result } = await runCommand(TransactionsUpdateMany, ["--transactions", txJson, "--json"], (c) => {
      c.transactions.updateMany.resolves(response);
    });
    expect(result).to.deep.equal(response);
    const body = client.transactions.updateMany.firstCall.args[0];
    expect(body.transactions).to.have.length(2);
    expect(body.transactions[0]).to.deep.include({ category_id: 10, id: 1 });
  });

  it("shows count in confirmation message", async () => {
    const { stdout } = await runCommand(TransactionsUpdateMany, ["--transactions", txJson]);
    expect(stdout).to.equal("Updated 2 transaction(s).\n");
  });
});
