import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.user = {
      name: 'user',
      id: 1,
      email: 'abc@gmail.com',
      password: '123',
      isActive: true,
    };
    console.log(req.originalUrl);
    next();
  }
}
