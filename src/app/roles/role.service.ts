import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/roles';
import { Observable } from 'rxjs';
import { RoleResponse } from '../dto/roles/role-response';
import { Pagina } from '../models/pagina';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  constructor(private http: HttpClient) { }
  
  private readonly apiUrl = 'http://localhost:8080/roles';

  obterTodos() : Observable<Role[]>{
    return this.http.get<Role[]>(this.apiUrl);
  }

  obterPorId(id: number) : Observable<RoleResponse>{
    return this.http.get<RoleResponse>(`${this.apiUrl}/${id}`);
  }  

  obterTodosPaginacao(pagina: number, itensPorPagina: number) : Observable<Pagina<Role>>{
    return this.http.get<Pagina<Role>>(
      `${this.apiUrl}?page=${pagina}&size=${itensPorPagina}`
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
