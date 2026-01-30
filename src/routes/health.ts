import express from "express";
import {
  healthCheck,
  readinessCheck,
  livenessCheck,
} from "../controllers/health";

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get("/health", healthCheck);

/**
 * @swagger
 * /ready:
 *   get:
 *     summary: Readiness check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is ready
 *       503:
 *         description: Service is not ready
 */
router.get("/ready", readinessCheck);

/**
 * @swagger
 * /alive:
 *   get:
 *     summary: Liveness check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is alive
 */
router.get("/alive", livenessCheck);

export default router;
