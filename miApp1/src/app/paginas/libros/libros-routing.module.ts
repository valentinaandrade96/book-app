import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrosPage } from './libros.page';

const routes: Routes = [
  {
    path: '',
    component: LibrosPage
  },
  {
    path: 'detalles',
    loadChildren: () => import('./detalles/detalles.module').then( m => m.DetallesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrosPageRoutingModule {}
