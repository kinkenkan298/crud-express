import type { Request, Response, NextFunction } from "express";
import { HttpException } from "@/utils/httpException";
import { errorResponse } from "@/utils/apiResponse";

export const errorHandler = (
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof HttpException) {
    errorResponse(res, err.message, err.status);
    return;
  }

  console.error("Unexpected error:", err);
  errorResponse(res, "Internal Server Error", 500, err.message);
};
