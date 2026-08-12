import { Component, OnInit } from '@angular/core';
import { LugarService } from '../lugar.service';
import { Lugar } from '../../models/lugar';
import { AlertaService } from '../../alerta.service';
import { AuthService } from '../../auth/auth.service';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-consulta',
  standalone: false,
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})

export class ConsultaComponent implements OnInit{

  lugares: Lugar[] = [];
  categorias: Categoria[] = [];
  paginaAtual: number = 1;
  itensPorPagina: number = 5;
  totalPaginas: number = 0;

  constructor(private lugarService: LugarService, private alerta: AlertaService, 
              public categoriaService: CategoriaService, public authService: AuthService){}

  ngOnInit(): void {
    this.carregarLugares();
    this.categoriaService.obterTodas().subscribe({
      next: (listaCategorias) => {
        this.categorias = listaCategorias,
        console.log(this.categorias)
      }      
    })
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
        }
    });
  }

  excluirLugar(id: string) : void {
    this.alerta.confirmar('Excluir lugar?', 'Essa ação não poderá ser desfeita.')
      .then(confirmado => {
        if(!confirmado){
          return;
        }
        this.lugarService.excluir(id).subscribe({
          next: () => {
            this.lugares = this.lugares.filter(
              lugar => lugar.id !== id
            );
            this.alerta.sucesso(
              'Lugar excluido!'
            );
          },
          error: () => {
            this.alerta.erro(
              'Erro ao excluir.'
            )
          }
        })
     })  
  }

  buscarNomeCategoria(categoriaId: string): string {
    const categoria = this.categorias.find(
      categoria => categoria.id === categoriaId
    );
    return categoria?.nome ?? 'Categoria não encontrada.';
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
