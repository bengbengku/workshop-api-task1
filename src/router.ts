import express, { Express } from "express";
import invoicesRouter from "./modules/invoices/router.js";
import customersRouter from "./modules/customers/router.js";

export default async function () {
  const app: Express = express();
  /**
   * Register all available modules
   * <modules>/router.ts
   */
  // app.use(`/auth`, authRouter);
  app.use(`/customers`, customersRouter);
  app.use(`/invoices`, invoicesRouter);

  return app;
}
