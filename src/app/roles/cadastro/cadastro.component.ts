import { Component } from '@angular/core';
import { LISTA_PERMISSOES } from '../../models/lista-permissoes';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent {

  permissoes = LISTA_PERMISSOES;
  camposForm: FormGroup;

  constructor(private roleService: RoleService) {
    console.log(this.permissoes);
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),

      permissoes: new FormArray(
        this.permissoes.map( () => new FormControl(false) )
      )
    })
  };

  salvar(){

  }




}
