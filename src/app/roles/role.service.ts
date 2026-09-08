import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/roles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  constructor(private http: HttpClient) { }
  
  private readonly apiUrl = 'http://localhost:8080/roles';

  obterTodos() : Observable<Role[]>{
    return this.http.get<Role[]>(this.apiUrl);
  }

  obterPorId(id: number) {
    return this.http.get<Role>(`${this.apiUrl}/${id}`);
  }  

  obterTodosPaginacao(pagina: number, itensPorPagina: number) : Observable<HttpResponse<Role[]>>{
    return this.http.get<Role[]>(
      `${this.apiUrl}?_page=${pagina}&_limit=${itensPorPagina}`,
      {
        observe: 'response'
      }
    );
  }

  salvar(role: Role) : Observable<Role> {
    return this.http.post<Role>(this.apiUrl, role);
  }

  atualizar(role: Role) {
    return this.http.put<Role>(`${this.apiUrl}/${role.id}`, role);
  }

  excluir(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
