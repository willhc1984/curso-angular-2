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

  constructor(
      private categoriaService: CategoriaService,
      private alerta: AlertaService
    ){}

    ngOnInit(): void {
      this.categoriaService.obterTodas().subscribe({
        next: (listaCategorias) => {
          this.categorias = listaCategorias,
          console.log(this.categorias);
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

}
