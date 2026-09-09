import { Component, OnInit } from '@angular/core';
import { PermissoesService } from '../permissoes.service';
import { AlertaService } from '../../alerta.service';
import { AuthService } from '../../auth/auth.service';
import { Permissao } from '../../models/permissions';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { PERMISSOES } from '../../models/permissoes';

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
          this.totalPaginas = Math.ceil(totalRegistros / this.itensPorPagina);
        }
      });
  }

  excluirPermissao(id: number) : void {
    if(!this.authService.temPermissao(PERMISSOES.PERMISSAO_EXCLUIR)){
      this.alerta.erroModal('Não permitido.', 'Você não pode acessar essa função');
      return;
    }

    this.alerta.confirmar('Excluir permissão?', 'Essa ação não poderá ser desfeita.')
      .then(confirmado => {
        if(!confirmado){
          return;
        }

        this.permissoesService.excluir(id).subscribe({
          next: () => {
            this.permissoes = this.permissoes.filter(
              permissao => permissao.id !== id
            );
            this.alerta.sucesso('Permissão excluída.');
          },
          error: () => {
            this.alerta.erro('Erro ao excluir permissão');
          }
        });
      })
  }


}
