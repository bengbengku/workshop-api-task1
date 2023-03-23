import { NextFunction, Request, Response } from "express";
import { validate } from "../request/create.request.js";
import { CreateInvoiceService } from "../services/create.service.js";
import { db } from "@src/database/database.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();
    db.startTransaction();

    validate(req.body);

    const createInvoiceService = new CreateInvoiceService(db);
    const result = await createInvoiceService.handle(req.body, session);

    await db.commitTransaction();
    res.status(200).json(result);
  } catch (error) {
    console.log("error,", error);
    next(error);
  }
};
