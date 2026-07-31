import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';
import { AlertaService } from '../../alerta.service';


@Component({
  selector: 'app-consulta',
  standalone: false,
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})

export class ConsultaComponent implements OnInit{

  categorias: Categoria[] = [];
  paginaAtual: number = 1;
  itensPorPagina: number = 4;
  totalPaginas: number = 0;

  constructor(
      private categoriaService: CategoriaService,
      private alerta: AlertaService
    ){}

  ngOnInit(): void {
    this.carregarCategoriasPaginacao();
  }

  carregarCategoriasPaginacao() : void {
    this.categoriaService
      .obterPaginacao(this.paginaAtual, this.itensPorPagina)
      .subscribe({
        next: response => {
          this.categorias = response.body ?? [];
          const totalRegistros = Number(
            response.headers.get('X-Total-Count')
          );

          this.totalPaginas = Math.ceil(
            totalRegistros / this.itensPorPagina
          )
      }
    });
  }

  excluirCategoria(id: string) : void {
      this.alerta.confirmar('Excluir categoria?','Essa ação não poderá ser desfeita.')
        .then(confirmado => {
          if (!confirmado) {
            return;
          }
      this.categoriaService.excluir(id).subscribe({
        next: () => {
          this.categorias = this.categorias.filter(
            categoria => categoria.id !== id
          );
          this.alerta.sucesso(
            'Categoria excluída com sucesso!'
          );
        },
        error: () => {
          this.alerta.erro(
            'Erro ao excluir categoria.'
          );
        }
      });
    });
  }

  proximaPagina() : void {
    if(this.paginaAtual < this.totalPaginas){
      this.paginaAtual++;
      this.carregarCategoriasPaginacao();
    }
  }

  paginaAnterior() : void {
    if(this.paginaAtual > 1){
      this.paginaAtual--;
      this.carregarCategoriasPaginacao();
    }
  }

}
