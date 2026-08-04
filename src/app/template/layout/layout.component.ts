import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutProps } from '../layoutprops';
import { filter, map } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { PERMISSOES } from '../../models/permissoes';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

export class LayoutComponent implements OnInit {

  readonly PERMISSOES = PERMISSOES;
  props: LayoutProps = { titulo: '', subTitulo: '' }

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    // console.log(this.authService.temPermissao(PERMISSOES.CATEGORIA_EXCLUIR));
    // console.log(this.authService.getUsuarioLogado());
    this.router.events
      .pipe(
        filter( () => this.activatedRoute.firstChild !== null),
        map( () => this.obterPropriedadesLayout() )
      ).subscribe((props: LayoutProps) => this.props = props);
  }

  obterPropriedadesLayout() : LayoutProps {
    let rotaFilha = this.activatedRoute.firstChild;

    while(rotaFilha?.firstChild){
      rotaFilha = rotaFilha.firstChild;
    }

    return rotaFilha?.snapshot.data as LayoutProps;
  }

  logout(event: Event) : void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get usuarioLogado() : Usuario | null {
    return this.authService.getUsuarioLogado();
  }

}
