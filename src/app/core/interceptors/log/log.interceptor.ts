import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoggerService } from '@core/services/logger/logger.service';

@Injectable()
export class LogInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(request).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        (event: any) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        // Operation failed; error is an HttpErrorResponse
        (error) => (ok = 'failed')
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${request.method} "${request.urlWithParams}"
             ${ok} in ${elapsed} ms.`;

        this.logger.debug(`Request Logger: ${msg}`, () => console.dir(request));
      })
    );

    return next.handle(request);
  }
}
