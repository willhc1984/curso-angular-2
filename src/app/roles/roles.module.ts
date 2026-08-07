import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultaComponent } from './consulta/consulta.component';


@NgModule({
  declarations: [
    CadastroComponent,
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule
  ]
})

export class RolesModule { }
