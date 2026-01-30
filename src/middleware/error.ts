import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import Logger from "../config/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const correlationId = req.correlationId || "unknown";

  if (err instanceof CustomError) {
    Logger.warn(
      `[${correlationId}] ${err.statusCode} - ${err.message} - ${req.method} ${req.url}`,
    );
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // Log unexpected errors
  Logger.error(
    `[${correlationId}] 500 - Internal Server Error - ${req.method} ${req.url}`,
    {
      error: err.message,
      stack: err.stack,
    },
  );

  res.status(500).send({
    errors: [{ message: "Internal server error" }],
  });
};
