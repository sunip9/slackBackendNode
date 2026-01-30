import Pool from "./db/config";
import { app } from "./app";
import * as dotenv from "dotenv";
import Logger from "./config/logger";

dotenv.config();

const PORT = process.env.PORT || 3001;

Pool.connect()
  .then(() => {
    app.listen(PORT, () => {
      Logger.info(
        `Server running on ${process.env.NODE_ENV || "development"} mode at port ${PORT}`,
      );
      Logger.info(`Health check available at http://localhost:${PORT}/health`);
    });
  })
  .catch((err: Error) => {
    Logger.error("Failed to start server", {
      error: err.message,
      stack: err.stack,
    });
    process.exit(1);
  });
