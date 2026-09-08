import { Component, OnInit } from '@angular/core';
import { PermissoesService } from '../permissoes.service';
import { AlertaService } from '../../alerta.service';
import { AuthService } from '../../auth/auth.service';
import { Permissao } from '../../models/permissions';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-consulta',
  standalone: false,
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})

export class ConsultaComponent implements OnInit{

  permissoes: Permissao[] = [];
  paginaAtual: number = 1;
  itensPorPagina: number = 5;
  totalPaginas: number = 0;

  constructor(
    private permissoesService: PermissoesService,
    private alerta: AlertaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarPermissoesPaginacao();
  }

  carregarPermissoesPaginacao() : void {
    this.permissoesService.obterTodasPaginacao(this.paginaAtual, this.itensPorPagina)
      .subscribe({
        next: response => {
          this.permissoes = response.body ?? [];
          const totalRegistros = Number(
            response.headers.get('X-Total-Count')
          );
          console.log('Permissões: ', this.permissoes);
          this.totalPaginas = Math.ceil(totalRegistros / this.itensPorPagina);
        }
      });
  }


}
