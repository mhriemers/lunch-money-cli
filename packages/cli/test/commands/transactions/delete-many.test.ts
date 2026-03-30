/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TransactionsDeleteMany from "../../../src/commands/transactions/delete-many.js";
import { runCommand } from "../../helpers/index.js";

describe("transactions delete-many", () => {
  it("deletes multiple transactions by IDs", async () => {
    const { result, client } = await runCommand(
      TransactionsDeleteMany,
      ["--ids", "[100, 200, 300]", "--json"],
    );
    expect(result).to.deep.equal({ deleted_ids: [100, 200, 300], success: true });
    expect(client.transactions.deleteMany.calledOnce).to.be.true;
    expect(client.transactions.deleteMany.firstCall.args[0]).to.deep.equal({ ids: [100, 200, 300] });
  });

  it("shows count in confirmation message", async () => {
    const { stdout } = await runCommand(TransactionsDeleteMany, ["--ids", "[1, 2]"]);
    expect(stdout).to.equal("Deleted 2 transaction(s).\n");
  });
});
