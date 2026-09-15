import { Component, OnInit } from '@angular/core';
import { Lugar } from '../../models/lugar';
import { Categoria } from '../../models/categoria';
import { LugarService } from '../../lugares/lugar.service';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})

export class GaleriaComponent implements OnInit{

  lugares: Lugar[] = [];
  categoriasFiltro: Categoria[] = [];
  nomeFiltro: string = '';
  categoriaFiltro: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalPaginas: number = 0;

  constructor(private lugarService: LugarService, private categoriaService: CategoriaService){}

  ngOnInit(): void {
    this.carregarLugares();
    // this.categoriaService.obterTodas()
    //   .subscribe(categorias => { this.categoriasFiltro = categorias; });
    // this.lugarService.obterTodos(this.paginaAtual, this.itensPorPagina)
    //   .subscribe(lugares => {this.lugares = lugares; console.log(this.lugares); });
  }

  carregarLugares() : void {
    this.lugarService
      .obterTodosPaginacao(this.paginaAtual -1, this.itensPorPagina)
      .subscribe({
        next: response => {
          this.lugares = response.content;
          this.totalPaginas = response.totalPages;
       }
     })
  };

  buscarNomeCategoria(categoriaId: number){
    const categoria = this.categoriasFiltro.find(
      categoria => categoria.id === categoriaId
    );
    return categoria?.nome ?? 'Categoria não encontrada.';
  }

  getTotalEstrelas(lugar: Lugar) : string {
    return '&#9733;'.repeat(lugar.avaliacao) + '&#9734;'.repeat(5 - (lugar.avaliacao));
  }

  filtrar(){
    this.lugarService.filtrar(this.nomeFiltro, this.categoriaFiltro)
      .subscribe(resultado => this.lugares = resultado);
  }

  proximaPagina() : void {
    if(this.paginaAtual < this.totalPaginas){
      this.paginaAtual++;
      this.carregarLugares();
    }
  }

  paginaAnterior(): void {
     if(this.paginaAtual > 1){
       this.paginaAtual--;
       this.carregarLugares();
    }
  }

}
