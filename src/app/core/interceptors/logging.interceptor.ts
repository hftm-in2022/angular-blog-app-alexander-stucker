import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Http request:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });

  return next(req);
};
