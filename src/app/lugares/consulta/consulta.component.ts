import { Component, OnInit } from '@angular/core';
import { LugarService } from '../lugar.service';
import { Lugar } from '../lugar';
import { AlertaService } from '../../alerta.service';

@Component({
  selector: 'app-consulta',
  standalone: false,
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})

export class ConsultaComponent implements OnInit{

  lugares: Lugar[] = [];
  paginaAtual: number = 1;
  itensPorPagina: number = 5;
  totalPaginas: number = 0;

  constructor(private lugarService: LugarService, private alerta: AlertaService){}

  ngOnInit(): void {
    this.carregarLugares();
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
