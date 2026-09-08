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

}
