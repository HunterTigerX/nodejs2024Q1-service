import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const queryParams = req.query;
    const url = req.baseUrl;
    const body = req.body;
    const result = {
      url,
      queryParams,
      body,
    };
    this.logger.log(result);
    next();
  }
}
