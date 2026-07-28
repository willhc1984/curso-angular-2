import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-consulta',
  standalone: false,
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})

export class ConsultaComponent implements OnInit{

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuariosService){}

  ngOnInit(): void {
    this.usuarioService.obterTodos().subscribe({
      next: (listaUsuarios) => {
        this.usuarios = listaUsuarios,
        console.log(this.usuarios);
      }
    });
  }
  

}
