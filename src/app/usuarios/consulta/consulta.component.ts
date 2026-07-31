import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';
import { AlertaService } from '../../alerta.service';

@Component({
  selector: 'app-consulta',
  standalone: false,
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})

export class ConsultaComponent implements OnInit{

  usuarios: Usuario[] = [];
  paginaAtual: number = 1;
  itensPorPagina: number = 1;
  totalPaginas: number = 0;

  constructor(private usuarioService: UsuariosService, private alerta: AlertaService){}

  ngOnInit(): void {
    this.carregarUsuarioPaginacao();
  }

  carregarUsuarioPaginacao() : void {
    this.usuarioService.obterPaginacao(this.paginaAtual, this.itensPorPagina)
      .subscribe({
        next: response => {
          this.usuarios = response.body ?? [];
          const totalRegistros = Number(
            response.headers.get('X-Total-Count')
          );

          this.totalPaginas = Math.ceil(
            totalRegistros / this.itensPorPagina
          )
        }
      });
  }

  excluirUsuario(id: string) : void {
    this.alerta.confirmar('Excluir usuário?', 'Esta ação não poderá ser desfeita.')
      .then(confirmado => {
        if(!confirmado){ 
          return;
        }

        this.usuarioService.excluir(id).subscribe({
          next: () => {
            this.usuarios = this.usuarios.filter(
              usuario => usuario.id !== id
            );
            this.alerta.sucesso(
              'Usuário excluido!'
            );
          },
          error: () => {
            this.alerta.erro('Erro ao excluir o usuário')
          }
        });
      })
  }

  proximaPagina() : void {
    if(this.paginaAtual < this.totalPaginas){
      this.paginaAtual++;
      this.carregarUsuarioPaginacao();
    }
  }

  paginaAnterior() : void {
    if(this.paginaAtual > 1){
      this.paginaAtual--;
      this.carregarUsuarioPaginacao();
    }
  }
  

}
