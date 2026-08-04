import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { permissionGuard } from '../auth/permission.guard';
import { PERMISSOES } from '../models/permissoes';

const routes: Routes = [
  {
    path: 'consulta',
    component: ConsultaComponent,
    canActivate: [permissionGuard],
    data: {
      permissao: PERMISSOES.USUARIO_VISUALIZAR
    }
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [permissionGuard],
    data: {
      permissao: PERMISSOES.USUARIO_CRIAR
    }
  },
  {
    path: 'editar/:id',
    component: CadastroComponent,
    canActivate: [permissionGuard],
    data: {
      permissao: PERMISSOES.USUARIO_EDITAR
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsuariosRoutingModule { }
