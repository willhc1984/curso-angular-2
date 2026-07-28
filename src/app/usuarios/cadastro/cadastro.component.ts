import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';
import { AlertaService } from '../../alerta.service';


@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent {

  camposForm: FormGroup;

  constructor(private usuarioService: UsuariosService, private alerta: AlertaService){
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      senha2: new FormControl('', Validators.required)
    },{
      validators: this.senhasIguais
    });
  }

  salvar(){
    this.camposForm.markAllAsTouched();

    if(this.camposForm.invalid){
      return;
    }

    const usuario: Usuario = {
      nome: this.camposForm.value.nome,
      email: this.camposForm.value.email,
      senha: this.camposForm.value.senha
    }

    this.usuarioService.salvar(usuario)
      .subscribe({
        next: usuario => {
          console.log('Salvo: ', usuario),
          this.camposForm.reset();
          this.alerta.sucesso('Usuário cadastrado!');
        },
        error: erro => {
          this.alerta.erro('Ocorreu um erro ao salvar.'),
          console.log('Ocorreu um erro: ', erro);
        }
      }); 
  }

  isCampoInvalido(nomeCampo: string) : boolean {
    const campo = this.camposForm.get(nomeCampo);
    return !!(campo?.touched && campo?.hasError('required'));
  }

  senhasIguais(control: AbstractControl) : ValidationErrors | null {
    const senha = control.get('senha')?.value;
    const senha2 = control.get('senha2')?.value;

    if(senha !== senha2){
      return { senhasDiferentes: true }
    }

    return null;
  }

}
