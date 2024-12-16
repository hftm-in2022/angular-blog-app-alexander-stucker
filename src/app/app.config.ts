import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { GlobalErrorHandler } from './core/service/global-error-handler.service';
import { authConfig } from './core/auth/auth.config';
import { provideAuth } from 'angular-auth-oidc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    GlobalErrorHandler,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loggingInterceptor])),
    provideAuth(authConfig),
  ],
};
