import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, of } from 'rxjs';
import { RoleService } from '../roles/role.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly apiUrl = 'http://localhost:3000/usuarios';
  permissoesUsuario: string[] = [];

  constructor(private http : HttpClient, private roleService: RoleService) {}

  login(email: string, senha: string){
    return this.http.get<Usuario[]>(
      `${this.apiUrl}?email=${email}&senha=${senha}`
    );
  }

  estaLogado() : boolean {
    return localStorage.getItem('usuario') != null;
  }

  getUsuarioLogado() : Usuario | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  temPermissao(permissao: string) : Observable<boolean> {
    const usuario = this.getUsuarioLogado();
    
    if(!usuario || !usuario.roleId){
      return of(false);
    }

    return this.roleService.obterPorId(usuario.roleId).pipe(
      map(role => role.permissoes.includes(permissao))
    )
  }

  verificaPermissao(permissao: string): boolean {
    return this.permissoesUsuario.includes(permissao);
  }

  carregarPermissoes() : void {
    const usuario = this.getUsuarioLogado();

    if(!usuario || !usuario.roleId){
      this.permissoesUsuario = [];
      return;
    }

    this.roleService.obterPorId(usuario.roleId).subscribe({
      next: role => {
        this.permissoesUsuario = role.permissoes;
        console.log(this.permissoesUsuario);
      },
      error: () => {
        this.permissoesUsuario = [];
      }
    });
  }

  obterPermissoesUsuario() : Observable<string[]> {
    const usuario = this.getUsuarioLogado();
    
    if(!usuario){
      return of([]);
    }

    return this.roleService.obterPorId(usuario.roleId).pipe(
      map(role => role.permissoes),
    );    
  }

  logout(): void {
    return localStorage.removeItem('usuario');
  }

}
