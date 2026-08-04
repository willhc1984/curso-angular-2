import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './consulta/consulta.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { permissionGuard } from '../auth/permission.guard';
import { PERMISSOES } from '../models/permissoes';

const routes: Routes = [
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [permissionGuard],
    data: { 
      permissao: PERMISSOES.CATEGORIA_CRIAR
    }
  },
  {
    path: 'consulta',
    component: ConsultaComponent,
    canActivate: [permissionGuard],
    data: {
      permissao: PERMISSOES.CATEGORIA_VISUALIZAR
    }
  },
  {
    path: 'editar/:id',
    component: CadastroComponent,
    canActivate: [permissionGuard],
    data: {
      permissao: PERMISSOES.CATEGORIA_EDITAR
    }
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoriasRoutingModule { }
