import { startPrism, stopPrism } from "./prism.js";

export const mochaHooks = {
  async beforeAll() {
    await startPrism();
  },
  async afterAll() {
    await stopPrism();
  },
};
