import { Logger } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger();
  logger.log(`${req.ip} ${req.headers.host} ${req.url}`);

  next();
};
