import { logger } from "./util/logger";

require("dotenv").config();
import { createClient } from "./core/client";

const main = async () => {
  await createClient();
};

main().catch((err) => {
  logger.error(err);
});
