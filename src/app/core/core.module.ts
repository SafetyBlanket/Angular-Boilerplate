import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutModule } from './layouts/default-layout/default-layout.module';
import { LoggerService } from './services/logger/logger.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { LogInterceptor } from './interceptors/log/log.interceptor';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, DefaultLayoutModule],
  exports: [DefaultLayoutModule, HttpClientModule],
  providers: [
    LoggerService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
