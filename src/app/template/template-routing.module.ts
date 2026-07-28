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
      },
      {
        path: 'lugares',
        canActivate: [authGuard],
        loadChildren: () => import('../lugares/lugares.module').then(m => m.LugaresModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TemplateRoutingModule { }
