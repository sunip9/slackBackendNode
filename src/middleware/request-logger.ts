import { Request, Response, NextFunction } from "express";
import Logger from "../config/logger";
import { v4 as uuidv4 } from "uuid";

// Extend Express Request type to include correlationId
declare global {
  namespace Express {
    interface Request {
      correlationId?: string;
    }
  }
}

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Generate correlation ID for request tracking
  req.correlationId = uuidv4();

  const startTime = Date.now();

  // Log incoming request
  Logger.http(
    `[${req.correlationId}] ${req.method} ${req.url} - Request received`,
  );

  // Log request body if exists (exclude password)
  if (req.body && Object.keys(req.body).length > 0) {
    const sanitizedBody = { ...req.body };
    if (sanitizedBody.password) {
      sanitizedBody.password = "***REDACTED***";
    }
    Logger.debug(
      `[${req.correlationId}] Request body: ${JSON.stringify(sanitizedBody)}`,
    );
  }

  // Capture the original res.json to log response
  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    const duration = Date.now() - startTime;
    Logger.http(
      `[${req.correlationId}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`,
    );

    // Log response body in debug mode (truncate if too large)
    if (body) {
      const bodyStr = JSON.stringify(body);
      const truncatedBody =
        bodyStr.length > 500 ? bodyStr.substring(0, 500) + "..." : bodyStr;
      Logger.debug(`[${req.correlationId}] Response body: ${truncatedBody}`);
    }

    return originalJson(body);
  };

  next();
};
