import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { AlertaService } from '../alerta.service';
import { map } from 'rxjs';

export const permissionGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  
  const permissao = route.data['permissao'];
  const alerta = inject(AlertaService);

  return auth.temPermissao(permissao).pipe(
    map(temPermissao => {
      if(temPermissao) { 
        return true; 
      }

      alerta.erroModal('Não Permitido.', 'Você não pode acessar essa função.');
      return false;
    })
  )
};
