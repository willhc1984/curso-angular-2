import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lugar } from '../models/lugar';
import { environment } from '../../../api/environment';
import { Pagina } from '../models/pagina';

@Injectable({
  providedIn: 'root'
})

export class LugarService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/lugares`

  salvar(lugar: Lugar) : Observable<Lugar> {
    return this.http.post<Lugar>(this.apiUrl, lugar);
  }

  obterTodosPaginacao(pagina: number, itensPorPagina: number) : Observable<Pagina<Lugar>> {
    return this.http.get<Pagina<Lugar>>(
      `${this.apiUrl}?page=${pagina}&size=${itensPorPagina}`
    );
  }

  excluir(id: number) : Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obterPorId(id: number) {
    return this.http.get<Lugar>(`${this.apiUrl}/${id}`);
  }

  atualizar(lugar : Lugar) {
    return this.http.put<Lugar>(`${this.apiUrl}/${lugar.id}`, lugar);
  }

  filtrar(nome: string, categoria: string) : Observable<Lugar[]> {
    let parametros = new HttpParams();

    if(nome){
      parametros = parametros.set('nome_like', nome);
    }
    if(categoria && categoria !== '-1'){
      parametros = parametros.set('categoria', categoria);
    }
 
    console.log(parametros.toString());

    return this.http.get<Lugar[]>(`${this.apiUrl}`, {
      params: parametros
    });
  }

}
