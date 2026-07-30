import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'categorias',
        canActivate: [authGuard],
        loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasModule),
        data: { titulo: 'Categorias', subTitulo: 'CRUD de categorias'}
      },
      {
        path: 'lugares',
        canActivate: [authGuard],
        loadChildren: () => import('../lugares/lugares.module').then(m => m.LugaresModule),
        data: { titulo: 'Lugares', subTitulo: 'CRUD de lugares'}
      },
      {
        path: 'usuarios',
        canActivate: [authGuard],
        loadChildren: () => import('../usuarios/usuarios.module').then(m => m.UsuariosModule),
        data: { titulo: 'Usuários', subTitulo: 'CRUD de usuários' }
      },
      {
        path: '',
        loadChildren:  () => import('../galeria/galeria.module').then(m => m.GaleriaModule),
        data: { titulo: 'Galeria', subTitulo: 'Descubra os melhores lugares' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TemplateRoutingModule { }
