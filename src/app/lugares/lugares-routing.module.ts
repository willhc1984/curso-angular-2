import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConsultaComponent } from './consulta/consulta.component';

const routes: Routes = [
  {
    path: 'cadastro',
    component: CadastroComponent,
    pathMatch: 'full'
  },
  {
    path: 'consulta',
    component: ConsultaComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LugaresRoutingModule { }
