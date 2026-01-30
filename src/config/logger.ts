import winston from "winston";
import path from "path";

const logDir = "logs";

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

// Define format
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Define JSON format for file logs
const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// Define which transports the logger must use
const transports = [
  // Console transport
  new winston.transports.Console({
    format: format,
  }),
  // Error log file
  new winston.transports.File({
    filename: path.join(logDir, "error.log"),
    level: "error",
    format: jsonFormat,
  }),
  // Combined log file
  new winston.transports.File({
    filename: path.join(logDir, "combined.log"),
    format: jsonFormat,
  }),
];

// Create the logger
const Logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  levels,
  transports,
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "exceptions.log"),
      format: jsonFormat,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "rejections.log"),
      format: jsonFormat,
    }),
  ],
});

export default Logger;
