import type { Response } from "express";

export enum MessageType {
  SUCCESS = "success",
  ERROR = "error",
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  type: MessageType;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = "Success",
  statusCode: number = 200,
  type: MessageType = MessageType.SUCCESS
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    type,
  } as ApiResponse<T>);
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500,
  error?: string
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  } as ApiResponse);
};
