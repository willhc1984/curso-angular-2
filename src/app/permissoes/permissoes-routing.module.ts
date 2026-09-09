import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { permissionGuard } from '../auth/permission.guard';
import { PERMISSOES } from '../models/permissoes';
import { ConsultaComponent } from './consulta/consulta.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  {
    path: 'consulta',
    component: ConsultaComponent,
    canActivate: [permissionGuard],
    data: {
      permissao: PERMISSOES.PERMISSAO_VISUALIZAR
    },
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [permissionGuard],
     data: {
        permissao: PERMISSOES.PERMISSAO_CRIAR
      }
  },
  {
    path: 'editar/:id',
    component: CadastroComponent,
    canActivate: [permissionGuard],
    data: {
      permissao: PERMISSOES.CATEGORIA_EDITAR
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PermissoesRoutingModule { }
