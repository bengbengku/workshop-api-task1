import { NextFunction, Request, Response } from "express";

export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      text: "Hello",
    });
  } catch (error) {
    next(error);
  }
};
