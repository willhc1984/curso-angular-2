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
    this.authService.login(
      this.camposForm.value.email,
      this.camposForm.value.senha
    ).subscribe({
      next: usuarios => {
        if(usuarios.length > 0){
          localStorage.setItem(
            'usuario', 
            JSON.stringify(usuarios[0]),
          ),
          localStorage.setItem('token', 'token-de-teste');
          this.authService.carregarPermissoes();
          this.router.navigate(['/']);
        }else{
          this.alerta.erroModal('Erro', 'Usuário ou senha inválidos!');
        }
      }
    })
  }

}
