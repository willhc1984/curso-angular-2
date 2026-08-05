import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/roles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  constructor(private http: HttpClient) { }
  
  private readonly apiUrl = 'http://localhost:3000/roles';

  salvar(role: Role) : Observable<Role> {
    return this.http.post<Role>(this.apiUrl, role);
  }

}
