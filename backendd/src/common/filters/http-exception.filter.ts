import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';

export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException | ValidationError[], host: ArgumentsHost) {
    console.log('exception', exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg: any;

    if (exception instanceof Array && exception[0] instanceof ValidationError) {
      // Handle ValidationError
      status = HttpStatus.BAD_REQUEST; // 400 Bad Request is often used for validation errors
      msg = exception[0]?.constraints.isIn || exception[0]?.constraints;
    } else if (exception instanceof HttpException) {
      // Handle HttpException
      status = exception.getStatus ? exception.getStatus() : status;
      msg = exception.getResponse ? exception.getResponse() : exception.message;
      msg = !!(msg instanceof Object) ? msg.message : msg;
    } else {
      // Handle other types of exceptions
      msg = exception['message'] || exception['response'] || exception;
    }

    this.logger.error(
      `Http Status: ${status}, Error Message: ${JSON.stringify(msg)}`,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: msg,
      // error: exception,
    });
  }
}
