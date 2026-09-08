import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissoesRoutingModule } from './permissoes-routing.module';
import { ConsultaComponent } from './consulta/consulta.component';


@NgModule({
  declarations: [
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    PermissoesRoutingModule
  ]
})
export class PermissoesModule { }
