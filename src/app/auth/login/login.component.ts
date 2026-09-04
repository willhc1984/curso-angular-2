import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaService } from '../../alerta.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  camposForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private alerta: AlertaService){
    this.camposForm = new FormGroup({
      email: new FormControl('', Validators.email),
      senha: new FormControl('', Validators.required)
    })
  }

  login() : void {
    this.camposForm.markAllAsTouched();
    if(this.camposForm.invalid){
      return;
    }

    this.authService.login(this.camposForm.value.email, this.camposForm.value.senha).subscribe({
        next: resposta => {
          localStorage.setItem('token', resposta.token);
          this.authService.carregarUsuario().subscribe({
            next: () => {
              this.router.navigate(['/']);
            },
            error: erro => {
              console.error('Erro ao obter usuário autenticado.', erro);
              this.authService.logout();
              this.alerta.erroModal('Erro', 'Não foi possível obter os dados do usuário.');
            }
          });
        },
        error: erro => {
          if(erro.status === 401){
            this.alerta.erroModal('Erro:', 'Usuário ou senha inválidos');
          }else{
            this.alerta.erroModal('Erro:', 'Não foi possível realizar o login');
          }
        }
      })
    }

}