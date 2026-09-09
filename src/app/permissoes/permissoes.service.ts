import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permissao } from '../models/permissions';

@Injectable({
  providedIn: 'root'
})

export class PermissoesService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = 'http://localhost:8080/permissions';

  obterTodas() : Observable<Permissao[]> {
    return this.http.get<Permissao[]>(this.apiUrl);
  }

  obterTodasPaginacao(pagina: number, itensPagina: number) : Observable<HttpResponse<Permissao[]>> {
    return this.http.get<Permissao[]>(
      `${this.apiUrl}?page=${pagina}&size=${itensPagina}`,
      { observe: 'response'}
    );
  }

  obterPorId(id: number){
    return this.http.get<Permissao>(`${this.apiUrl}/${id}`);
  }

  salvar(permissao: Permissao) : Observable<Permissao>{
    return this.http.post<Permissao>(this.apiUrl, permissao);
  }

  excluir(id: number) : Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizar(permissao: Permissao){
    return this.http.put<Permissao>(`${this.apiUrl}/${permissao.id}`, permissao);
  }

}
