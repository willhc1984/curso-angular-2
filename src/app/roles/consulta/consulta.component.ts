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
  itensPorPagina: number = 10;
  totalPaginas: number = 0;

  constructor(private roleService: RoleService, private alerta: AlertaService, public authService: AuthService){}

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

  excluirRole(id: string) : void {
    this.alerta.confirmar('Excluir papel?', 'Essa ação não poderá ser desfeita.')
      .then(confirmado => {
        if(!confirmado){
          return;
        }

        this.roleService.excluir(id).subscribe({
          next: () => {
            this.roles = this.roles.filter(
              role => role.id !== id
            )
            this.alerta.sucesso('Papel excluido!');
          },
          error: () => {
            this.alerta.erro('Erro ao excluir papel');
          }
        });
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
