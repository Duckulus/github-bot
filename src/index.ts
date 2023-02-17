import { logger } from "./util/logger";

import { createClient } from "./core/client";

const main = async () => {
  await createClient();
};

main().catch((err) => {
  logger.error(err);
});
