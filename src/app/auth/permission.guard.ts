import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { AlertaService } from '../alerta.service';

export const permissionGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  
  const permissao = route.data['permissao'];
  const alerta = inject(AlertaService);

  if(auth.temPermissao(permissao)){
    return true;
  }

  alerta.erroModal('Não permitido','Você não pode acessar essa função.');

  // return router.createUrlTree(['/paginas']);
  return false;

};
