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

  constructor(private lugarService: LugarService, private alerta: AlertaService){}

  ngOnInit(): void {
    this.lugarService.obterTodos(this.paginaAtual, this.itensPorPagina)
      .subscribe({
        next: (listaLugares) => {
          this.lugares = listaLugares,
          console.log(this.lugares)
        }
      })
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

  paginaAnterior(){

  }

  proximaPagina(){

  }

}
