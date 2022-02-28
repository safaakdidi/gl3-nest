import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
export class RequestDurationInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before handling Request ...');
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const end = Date.now();
        console.log(`After ${start - end} ms`);
      }),
    );
  }
}
