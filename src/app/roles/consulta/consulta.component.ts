import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/roles';
import { RoleService } from '../role.service';
import { AlertaService } from '../../alerta.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-consulta',
  standalone: false,
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})

export class ConsultaComponent implements OnInit {

  roles: Role[] = [];
  paginaAtual: number = 1;
  itensPorPagina: number = 2;
  totalPaginas: number = 0;

  constructor(private roleService: RoleService, private alerta: AlertaService, public auth: AuthService){}

  ngOnInit(): void {
    this.carregarRolesPaginacao();
  }

  carregarRolesPaginacao() : void {
    this.roleService.obterTodosPaginaco(this.paginaAtual, this.itensPorPagina)
      .subscribe({
        next: response => {
          this.roles = response.body ?? [];
          const totalRegistros = Number(
            response.headers.get('X-Total-Count')
          );

          console.log(this.roles);

          this.totalPaginas = Math.ceil(
            totalRegistros / this.itensPorPagina
          )
        }
      })
  }

  proximaPagina() : void {
    if(this.paginaAtual < this.totalPaginas){
      this.paginaAtual++;
      this.carregarRolesPaginacao();
    }
  }

  paginaAnterior() : void {
    if(this.paginaAtual > 1){
      this.paginaAtual--;
      this.carregarRolesPaginacao();
    }
  }
}
