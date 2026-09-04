import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { AlertaService } from '../alerta.service';

export const permissionGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const alerta = inject(AlertaService);

  const permissao = route.data['permissao'];

  // console.log("*******Permission Guard*************");
  // console.log("Rota: ", state.url);
  // console.log("Permissão exigida: ", permissao);
  // console.log("Usuário: ", auth.getUsuarioLogado());
  // console.log("Permissões: ", auth.getUsuarioLogado()?.permissoes);
  // console.log(
  //   'Tem permissão:',
  //   auth.temPermissao(permissao)
  // );

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
