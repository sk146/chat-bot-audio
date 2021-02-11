import { configure, getLogger, levels } from "log4js";

//configure("./filename");
const logger = getLogger();

logger.level = "all";
logger.debug("Some debug messages");

export { logger };
