import type { LunchMoneyClient } from "@lunch-money/lunch-money-js-v2";

import { LunchMoneyError } from "@lunch-money/lunch-money-js-v2";
import { Command } from "@oclif/core";

import { createClient } from "./client.js";

export abstract class BaseCommand extends Command {
  static enableJsonFlag = true;

  protected async catch(err: Error & { exitCode?: number }): Promise<void> {
    process.exitCode = err.exitCode ?? 1;

    if (this.jsonEnabled()) {
      const json = err instanceof LunchMoneyError ? this.formatErrorJson(err) : { error: err.message ?? String(err) };
      this.logJson(json);
    } else if (err instanceof LunchMoneyError) {
      this.logToStderr(`Error: ${err.message}`);
      if (err.status) this.logToStderr(`  Status: ${err.status}`);
      if (err.errors?.length) {
        for (const detail of err.errors) {
          this.logToStderr(`  - ${typeof detail === "string" ? detail : JSON.stringify(detail)}`);
        }
      }
    } else {
      this.logToStderr(`Error: ${err.message ?? String(err)}`);
    }
  }

  protected createClient(): LunchMoneyClient {
    return createClient();
  }

  protected output<T>(data: T, formatted: string): T {
    this.log(formatted);
    return data;
  }

  private formatErrorJson(err: LunchMoneyError): Record<string, unknown> {
    const output: Record<string, unknown> = { error: err.message };
    if (err.status) output.status = err.status;
    if (err.errors?.length) output.details = err.errors;
    return output;
  }
}
