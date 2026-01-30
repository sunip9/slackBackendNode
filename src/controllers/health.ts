import { Request, Response } from "express";
import Pool from "../db/config";
import Logger from "../config/logger";

/**
 * Health check endpoint
 * Returns 200 if the service is running
 */
export const healthCheck = (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};

/**
 * Readiness check endpoint
 * Returns 200 if the service is ready to accept traffic (DB connected, etc.)
 */
export const readinessCheck = async (_req: Request, res: Response) => {
  try {
    // Check database connection
    await Pool.query("SELECT 1");

    res.status(200).json({
      status: "ready",
      timestamp: new Date().toISOString(),
      checks: {
        database: "connected",
      },
    });
  } catch (error) {
    Logger.error("Readiness check failed", { error });

    res.status(503).json({
      status: "not ready",
      timestamp: new Date().toISOString(),
      checks: {
        database: "disconnected",
      },
    });
  }
};

/**
 * Liveness check endpoint
 * Returns 200 if the service is alive
 */
export const livenessCheck = (_req: Request, res: Response) => {
  res.status(200).json({
    status: "alive",
    timestamp: new Date().toISOString(),
  });
};
