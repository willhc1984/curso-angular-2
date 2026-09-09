import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissoesRoutingModule } from './permissoes-routing.module';
import { ConsultaComponent } from './consulta/consulta.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConsultaComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    PermissoesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PermissoesModule { }
