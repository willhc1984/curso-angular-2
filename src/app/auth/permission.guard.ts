import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { AlertaService } from '../alerta.service';
import { map } from 'rxjs';

export const permissionGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const alerta = inject(AlertaService);

  const permissao = route.data['permissao'];

  if(auth.temPermissao(permissao)){
    return true;
  }

  alerta.erroModal('Não permitido', 'Você não pode acessar essa função.');

  return false;

  // if(auth.temPermissao(permissao)){
  //   return true;
  // }

  // alerta.erroModal('Não permitido','Você não pode acessar essa função.');

  // return false;

};
