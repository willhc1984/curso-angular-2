import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LugaresRoutingModule } from './lugares-routing.module';
import { ɵInternalFormsSharedModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConsultaComponent } from './consulta/consulta.component';


@NgModule({
  declarations: [
    CadastroComponent,
    ConsultaComponent,
  ],
  imports: [
    CommonModule,
    LugaresRoutingModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule
]
})

export class LugaresModule { }
