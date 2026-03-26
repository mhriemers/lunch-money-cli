import { getHttpOperationsFromSpec } from "@stoplight/prism-http";
import { createServer, type IPrismHttpServer } from "@stoplight/prism-http-server";
import { createRequire } from "node:module";
import pino from "pino";

const require = createRequire(import.meta.url);
const SPEC_PATH = require.resolve("@lunch-money/v2-api-spec/lunch-money-api-v2.yaml");
const PORT = 4010;
const API_KEY = "test-api-key-e2e";

let server: IPrismHttpServer | undefined;

export async function startPrism(): Promise<void> {
  if (server) return;

  const logger = pino({ level: "silent", customLevels: { success: 32 } });
  const operations = await getHttpOperationsFromSpec(SPEC_PATH);

  server = createServer(operations as Parameters<typeof createServer>[0], {
    components: { logger },
    config: {
      checkSecurity: false,
      validateRequest: true,
      validateResponse: true,
      mock: { dynamic: false },
      errors: false,
    },
    cors: true,
  });

  await server.listen(PORT, "127.0.0.1");

  process.env.LUNCH_MONEY_API_KEY = API_KEY;
  process.env.LUNCH_MONEY_BASE_URL = `http://127.0.0.1:${PORT}`;
}

export async function stopPrism(): Promise<void> {
  if (server) {
    await server.close();
    server = undefined;
  }

  delete process.env.LUNCH_MONEY_API_KEY;
  delete process.env.LUNCH_MONEY_BASE_URL;
}
