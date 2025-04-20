import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof HttpException) {
          return {
            statusCode: data.getStatus(),
            message: data.message || 'Error occurred',
            data: null,
            error: data.getResponse(),
          };
        }
        return {
          statusCode: HttpStatus.OK,
          message: 'ok',
          data,
        };
      }),
    );
  }
}
