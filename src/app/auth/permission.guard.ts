import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

export const permissionGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  
  const permissao = route.data['permissao'];

  return auth.temPermissao(permissao).pipe(
    map(permitido => {
      if(permitido){
        return true;
      }

      return router.createUrlTree(['/paginas']);
    })
  )
};
