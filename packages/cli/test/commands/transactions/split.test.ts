import { expect } from "chai";

import TransactionsSplit from "../../../src/commands/transactions/split.js";
import { runCommand } from "../../helpers/index.js";

describe("transactions split", () => {
  const parts = JSON.stringify([
    { amount: 25, payee: "Part A" },
    { amount: 17.45, payee: "Part B" },
  ]);

  it("splits transaction with parts", async () => {
    const response = { children: [{ id: 101 }, { id: 102 }], id: 100 };
    const { client, result } = await runCommand(TransactionsSplit, ["100", "--parts", parts, "--json"], (c) => {
      c.transactions.split.resolves(response);
    });
    expect(result).to.deep.equal(response);
    const [id, body] = client.transactions.split.firstCall.args;
    expect(id).to.equal(100);
    expect(body.child_transactions).to.have.length(2);
    expect(body.child_transactions[0].amount).to.equal(25);
  });

  it("shows confirmation message with count", async () => {
    const { stdout } = await runCommand(TransactionsSplit, ["100", "--parts", parts], (c) => {
      c.transactions.split.resolves({});
    });
    expect(stdout).to.equal("Split transaction 100 into 2 parts.\n");
  });
});
