import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, of } from 'rxjs';
import { RoleService } from '../roles/role.service';
import { map } from 'rxjs';
import { LoginResponse } from '../dto/auth/login-response';
import { UsuarioMeResponse } from '../dto/auth/usuario-me-response';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly apiUrl = 'http://localhost:8080';
  private usuarioLogado: UsuarioMeResponse | null = null;

  permissoesUsuario: string[] = [];

  constructor(private http: HttpClient, private roleService: RoleService) {}

  login(email: string, senha: string) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {
        email: email,
        senha: senha
      }
    );
  }

  obterUsuarioLogado(): Observable<UsuarioMeResponse> {
    return this.http.get<UsuarioMeResponse>(
      `${this.apiUrl}/me`
    );
  }

  definirUsuarioLogado(usuario: UsuarioMeResponse): void {
    this.usuarioLogado = usuario;
  }

  getUsuarioLogado() : UsuarioMeResponse | null {
    return this.usuarioLogado;
  }

  estaLogado(): boolean {
    return localStorage.getItem('token') != null;
  }

  temPermissao(permissao: string) : boolean {
    return this.usuarioLogado?.permissoes.includes(permissao) ?? false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioLogado = null;
  }

}
