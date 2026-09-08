import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { permissionGuard } from '../auth/permission.guard';
import { PERMISSOES } from '../models/permissoes';
import { ConsultaComponent } from './consulta/consulta.component';

const routes: Routes = [
  {
    path: 'consulta',
    component: ConsultaComponent,
    canActivate: [permissionGuard],
    data: {
      permissao: PERMISSOES.PERMISSAO_VISUALIZAR
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PermissoesRoutingModule { }
