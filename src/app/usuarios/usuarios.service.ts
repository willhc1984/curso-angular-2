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

}
