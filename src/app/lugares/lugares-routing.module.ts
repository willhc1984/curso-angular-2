import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { permissionGuard } from '../auth/permission.guard';
import { PERMISSOES } from '../models/permissoes';


const routes: Routes = [
  {
    path: 'cadastro',
    component: CadastroComponent,
    pathMatch: 'full',
    canActivate: [permissionGuard],
    data: {
      permissao: PERMISSOES.LUGAR_CRIAR
    }
  },
  {
    path: 'consulta',
    component: ConsultaComponent,
    pathMatch: 'full',
    canActivate: [permissionGuard],
    data: {
      permissao: PERMISSOES.LUGAR_VISUALIZAR
    }
  },
  {
    path: 'editar/:id',
    component: CadastroComponent,
    pathMatch: 'full',
    canActivate: [permissionGuard],
    data: {
      permissao: PERMISSOES.LUGAR_EDITAR
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LugaresRoutingModule { }
