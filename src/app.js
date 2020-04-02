import express from "express";
import session from "express-session";
import { SESSION_OPTIONS } from "../config";
import cors from "cors";
import { userRoutes } from "./routes";
import { serverError, notFound, active, catchAsync } from "./middlewares";

export const createApp = store => {
  const app = express();
  app.use(express.json());
  app.use(cors({ preflightContinue: true, credentials: true }));

  app.use(session({ ...SESSION_OPTIONS, store }));

  app.use(catchAsync(active));

  app.get("/", (req, res) => {
    res.json({ message: "OKAY" });
  });

  app.use("/users", userRoutes);

  app.use(notFound);
  app.use(serverError);

  return app;
};
