import { Component } from '@angular/core';
import { LISTA_PERMISSOES } from '../../models/lista-permissoes';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { Role } from '../../models/roles';
import { AlertaService } from '../../alerta.service';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent {

  permissoes = LISTA_PERMISSOES;
  camposForm: FormGroup;

  constructor(private roleService: RoleService, private alerta: AlertaService) {
    console.log(this.permissoes);
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),

      permissoes: new FormArray(
        this.permissoes.map(() => new FormControl(false))
      )
    })
  };

  salvar(){
    this.camposForm.markAllAsTouched();
    if(this.camposForm.valid){
      const permissoesSelecionadas = this.permissoes
        .filter((_, index) => this.camposForm.value.permissoes[index])
        .map(p => p.codigo);
    
      const role: Role = {
        nome: this.camposForm.value.nome,
        descricao: this.camposForm.value.descricao,
        permissoes: permissoesSelecionadas
      };

      this.roleService.salvar(role).subscribe({
        next: (role) => {
          this.camposForm.reset();
          this.alerta.sucesso('Papel cadastrado');
        },
        error: erro => {
          this.alerta.erro('Erro ao cadastrar');
        }
      });
    }      
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return !!(campo?.touched && campo?.hasError('required'));
  }

}
