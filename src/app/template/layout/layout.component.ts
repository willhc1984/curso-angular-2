import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutProps } from '../layoutprops';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

export class LayoutComponent implements OnInit {

  props: LayoutProps = { titulo: '', subTitulo: '' }

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter( () => this.activatedRoute.firstChild !== null),
        map( () => this.obterPropriedadesLayout())
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
    console.log(event);
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get usuarioLogado() : boolean {
    return this.authService.estaLogado();
  }

}
