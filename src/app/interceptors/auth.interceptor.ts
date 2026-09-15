import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  const rotasPublicas = [
    '/login', '/lugares', '/categorias'
  ];

  const rotaPublica = rotasPublicas.some(
    rota => req.url.includes(rota)
  );

  if(!token || rotaPublica){
    return next(req);
  }

  const request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(request);
};
