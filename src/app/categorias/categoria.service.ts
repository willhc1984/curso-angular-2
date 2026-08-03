import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';
import { environment } from '../../../api/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/categorias`;

  salvar(categoria: Categoria) : Observable<Categoria>{
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  obterTodas() : Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  obterPaginacao(pagina: number, itensPorPagina: number) : Observable<HttpResponse<Categoria[]>> {
    return this.http.get<Categoria[]>(
      `${this.apiUrl}?_page=${pagina}&_limit=${itensPorPagina}`,
      {
        observe: 'response'
      }
    );
  }

  excluir(id: string) :  Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obterPorId(id: string) {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  atualizar(categoria : Categoria) {
    return this.http.put<Categoria>(`${this.apiUrl}/${categoria.id}`, categoria)
  }

}
