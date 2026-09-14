import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../api/environment';
import { Pagina } from '../models/pagina';


@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private readonly apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  salvar(usuario: Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  obterPaginacao(pagina: number, itensPorPagina: number) : Observable<Pagina<Usuario>> {
    return this.http.get<Pagina<Usuario>>(
      `${this.apiUrl}?page=${pagina}&size=${itensPorPagina}`,
    )
  }

  obterTodos() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  excluir(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obterPorId(id: number) {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  atualizar(usuario: Usuario) {
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
  }

}
