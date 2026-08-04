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
  totalPaginas: number = 0

  constructor(private lugarService: LugarService, private categoriaService: CategoriaService){}

  ngOnInit(): void {
    this.carregarLugares();
    this.categoriaService.obterTodas()
      .subscribe(categorias => { this.categoriasFiltro = categorias; });
    // this.lugarService.obterTodos(this.paginaAtual, this.itensPorPagina)
    //   .subscribe(lugares => {this.lugares = lugares; console.log(this.lugares); });
  }

  carregarLugares() : void {
    this.lugarService
      .obterTodos(this.paginaAtual, this.itensPorPagina)
      .subscribe({
        next: response => {
          this.lugares = response.body ?? [];
          const totalRegistros = Number(
            response.headers.get('X-Total-Count')
          );

          this.totalPaginas = Math.ceil(
            totalRegistros / this.itensPorPagina
          )
          // console.log(response.body);
          // console.log(response.headers);
          // console.log(response.status);
          // console.log(response.url);
        }
    });
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
