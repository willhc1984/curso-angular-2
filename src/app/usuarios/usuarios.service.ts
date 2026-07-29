import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../api/environment';


@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private readonly apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  salvar(usuario: Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  obterTodos() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  excluir(id: string) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obterPorId(id: string) {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  atualizar(usuario: Usuario) {
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
  }

}
