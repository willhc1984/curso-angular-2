import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { permissionGuard } from '../auth/permission.guard';
import { PERMISSOES } from '../models/permissoes';

const routes: Routes = [
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [permissionGuard],
    data: { 
      permissao: PERMISSOES.PAPEL_CRIAR 
    }
  },
  {
    path: 'editar/:id',
    component: CadastroComponent,
    // canActivate: [permissionGuard],
    data: {
      permissao: PERMISSOES.PAPEL_EDITAR
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RolesRoutingModule { }
