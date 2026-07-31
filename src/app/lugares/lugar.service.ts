import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lugar } from './lugar';
import { environment } from '../../../api/environment';

@Injectable({
  providedIn: 'root'
})

export class LugarService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/lugares`

  salvar(lugar: Lugar) : Observable<Lugar> {
    return this.http.post<Lugar>(this.apiUrl, lugar);
  }

  obterTodos(pagina: number, itensPorPagina: number) : Observable<HttpResponse<Lugar[]>> {
    return this.http.get<Lugar[]>(
      `${this.apiUrl}?_page=${pagina}&_limit=${itensPorPagina}`,
      {
        observe: 'response'
      }
    );
  }

  excluir(id: string) : Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obterPorId(id: string) {
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
