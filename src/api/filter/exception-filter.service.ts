import {
  HttpException,
  HttpStatus,
  Catch,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggingService } from '../logger/logger.service';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggingService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const responseBody = {
      statusCode: status,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      response,
    };

    if (status >= 200 && status < 300) {
      this.logger.log(responseBody);
    } else {
      this.logger.error(responseBody);
    }

    httpAdapter.reply(ctx.getResponse(), response, status);
  }
}
