import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const permissionGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  
  const permissao = route.data['permissao'];

  if(auth.temPermissao(permissao)){
    return true;
  }

  router.navigate(['/']);  
  return false;

};
