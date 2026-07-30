import { Component, OnInit } from '@angular/core';
import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria';
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

  constructor(private lugarService: LugarService, private categoriaService: CategoriaService){}

  ngOnInit(): void {
    // this.categoriaService.obterTodas()
    //   .subscribe(categorias => { this.categoriasFiltro = categorias; console.log(this.categoriasFiltro); });
    // this.lugarService.obterTodos()
    //   .subscribe(lugares => {this.lugares = lugares; console.log(this.lugares); });
  }

  getTotalEstrelas(lugar: Lugar) : string {
    return '&#9733;'.repeat(lugar.avaliacao) + '&#9734;'.repeat(5 - (lugar.avaliacao));
  }

  filtrar(){
    this.lugarService.filtrar(this.nomeFiltro, this.categoriaFiltro)
      .subscribe(resultado => this.lugares = resultado);
  }

}
