/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import BudgetsDelete from "../../../src/commands/budgets/delete.js";
import { runCommand } from "../../helpers/index.js";

describe("budgets delete", () => {
  it("deletes budget by category and start date", async () => {
    const { result, client } = await runCommand(BudgetsDelete, [
      "--category-id",
      "10",
      "--start-date",
      "2025-01-01",
      "--json",
    ]);
    expect(result).to.deep.equal({ message: "Budget deleted", success: true });
    expect(client.budgets.delete.calledOnce).to.be.true;
    expect(client.budgets.delete.firstCall.args[0]).to.deep.equal({
      category_id: 10,
      start_date: "2025-01-01",
    });
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(BudgetsDelete, ["--category-id", "10", "--start-date", "2025-01-01"]);
    expect(stdout).to.equal("Deleted budget for category 10 starting 2025-01-01.\n");
  });
});
