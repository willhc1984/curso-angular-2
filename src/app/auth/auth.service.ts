import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http : HttpClient) { }

  login(email: string, senha: string){
    return this.http.get<Usuario[]>(
      `${this.apiUrl}?email=${email}&senha=${senha}`
    );
  }

  estaLogado() : boolean {
    return localStorage.getItem('usuario') != null;
  }

  logout(): void {
    return localStorage.removeItem('usuario');
  }

  getUsuarioLogado() : Usuario | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

}
