import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lugar } from './lugar';
import { environment } from '../../../api/environment';
import { Categoria } from '../categorias/categoria';

@Injectable({
  providedIn: 'root'
})

export class LugarService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/lugares`

  salvar(lugar: Lugar) : Observable<Lugar> {
    return this.http.post<Lugar>(this.apiUrl, lugar);
  }

  obterTodos() : Observable<Lugar[]>{
    return this.http.get<Lugar[]>(this.apiUrl);
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
    if(categoria){
      parametros = parametros.set('categoria', categoria);
    }
 
    console.log(parametros);
    
    return this.http.get<Lugar[]>('http://localhost:3000/lugares', {
      params: parametros
    });
  }

}
