import express from "express";
//express-async-errors for throw err for async req.
import "express-async-errors";
import { errorHandler } from "./middleware/error";
import { requestLogger } from "./middleware/request-logger";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import healthRouter from "./routes/health";
import { NotFoundError } from "./errors/not-found-error";
// import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import Logger from "./config/logger";

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Testing API",
      version: "1.0.0",
      description: "Demonstrating various RESTful APIs for testing..",
      contact: { email: "sunip.ete@gmail.com" },
    },

    host: "/",
    basePath: "/",
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
  },
  // path to the API docs
  apis: ["**/*.ts"],
  //apis: ['./routes/*.ts', './routes/*/*.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//For trust https connection
app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(options));

app.use(cookieParser());

// Add request logging middleware
app.use(requestLogger);

// Health check routes (no logging needed)
app.use(healthRouter);

app.use(userRouter);
app.use(authRouter);

app.set("view engine", "ejs");
app.get("/", (_req, res) => {
  res.render("index");
});
app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
