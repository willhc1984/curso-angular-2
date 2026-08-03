import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../usuarios.service';
import { AlertaService } from '../../alerta.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit{

  camposForm: FormGroup;
  id?: string;

  constructor(private usuarioService: UsuariosService, private alerta: AlertaService, private router: Router, private route: ActivatedRoute){
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
      senha2: new FormControl('', Validators.required)
    },{
      validators: this.senhasIguais
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
    if(this.id){
      this.carregarUsuarioId(this.id);
      console.log('ID: ', this.id);
    }
  }

  carregarUsuarioId(id: string) : void {
    this.usuarioService.obterPorId(id).subscribe({
      next: usuario => {
        this.camposForm.patchValue({
          nome: usuario.nome,
          email: usuario.email,
        });
      }
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

  atualizar() : void {
    this.camposForm.markAllAsTouched();
    if(this.camposForm.invalid || !this.id){
      return;
    }

    const usuario: Usuario = {
      id: this.id,
      ...this.camposForm.value
    };

    console.log(usuario);

    this.usuarioService.atualizar(usuario).subscribe({
      next: () => {
        this.alerta.sucesso('Dados atualizados!');
        this.router.navigate(['/paginas/usuarios/consulta']);
      },
      error: () => { 
        this.alerta.erro('Erro ao atualizar dados.') 
      }
    });
  }

  isCampoInvalido(nomeCampo: string) : boolean {
    const campo = this.camposForm.get(nomeCampo);
    return !!(campo?.touched && campo?.invalid);
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
