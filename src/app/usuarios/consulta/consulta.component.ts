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

  constructor(private usuarioService: UsuariosService, private alerta: AlertaService){}

  ngOnInit(): void {
    this.usuarioService.obterTodos().subscribe({
      next: (listaUsuarios) => {
        this.usuarios = listaUsuarios,
        console.log(this.usuarios);
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
  

}
