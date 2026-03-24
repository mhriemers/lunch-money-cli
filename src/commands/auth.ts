import { createInterface } from "node:readline";

import { BaseCommand } from "../base-command.js";
import { getConfigPath, saveConfig } from "../config.js";

export default class Auth extends BaseCommand {
  static override description = "Authenticate with Lunch Money by saving your API token";

  async run(): Promise<unknown> {
    const rl = createInterface({ input: process.stdin, output: process.stderr });

    this.logToStderr("\nTo get your API token:\n");
    this.logToStderr('  1. Go to https://my.lunchmoney.app/developers');
    this.logToStderr('  2. Enter a label (e.g. "cli") and click "Request Access Token"');
    this.logToStderr("  3. Copy the token — it is only shown once\n");

    const token = await new Promise<string>((resolve) => {
      rl.question("Paste your API token: ", (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });

    if (!token) {
      throw new Error("No token provided");
    }

    saveConfig(this.config.configDir, { api_key: token });
    const configPath = getConfigPath(this.config.configDir);
    return this.output({ config_path: configPath, success: true }, `API token saved to ${configPath}.`);
  }
}
