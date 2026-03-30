 
import { expect } from "chai";

import RecurringList from "../../../src/commands/recurring/list.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("recurring list", () => {
  it("returns recurring items as JSON", async () => {
    const data = [{ amount: "15.99", id: 1, payee: "Netflix" }];
    const { result } = await runCommand(RecurringList, ["--json"], (c) => {
      c.recurringItems.getAll.resolves(data);
    });
    expect(result).to.deep.equal(data);
  });

  it("formats recurring items as a table", async () => {
    const { stdout } = await runCommand(RecurringList, [], (c) => {
      c.recurringItems.getAll.resolves([
        {
          description: "Streaming",
          id: 1,
          status: "active",
          transaction_criteria: { amount: "15.99", currency: "usd", payee: "Netflix" },
        },
      ]);
    });
    expectFixture(stdout, "recurring/list-table");
  });

  it("maps date range flags to params", async () => {
    const { client } = await runCommand(RecurringList, [
      "--start-date",
      "2025-01-01",
      "--end-date",
      "2025-01-31",
      "--json",
    ]);
    expect(client.recurringItems.getAll.firstCall.args[0]).to.deep.equal({
      end_date: "2025-01-31",
      start_date: "2025-01-01",
    });
  });

  it("calls getAll with empty params when no flags", async () => {
    const { client } = await runCommand(RecurringList, ["--json"]);
    expect(client.recurringItems.getAll.firstCall.args[0]).to.deep.equal({});
  });
});
