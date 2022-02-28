import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(req.body);
  console.log(req.ip);
  next();
}
