import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, of } from 'rxjs';
import { RoleService } from '../roles/role.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http : HttpClient, private roleService: RoleService) { }

  login(email: string, senha: string){
    return this.http.get<Usuario[]>(
      `${this.apiUrl}?email=${email}&senha=${senha}`
    );
  }

  estaLogado() : boolean {
    return localStorage.getItem('usuario') != null;
  }

  temPermissao(permissao: string) : Observable<Boolean> {
    const usuario = this.getUsuarioLogado();

    if(!usuario) {
      return of(false);
    }

    return this.roleService.obterPorId(usuario.roleId).pipe(
      map(role => role.permissoes.includes(permissao))
    )
  }

  getUsuarioLogado() : Usuario | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  obterPermissoesUsuario() : Observable<string[]> {
    const usuario = this.getUsuarioLogado();
    
    if(!usuario){
      return of([]);
    }

    return this.roleService.obterPorId(usuario.roleId).pipe(
      map(role => role.permissoes)
    );    
  }

  logout(): void {
    return localStorage.removeItem('usuario');
  }

}
