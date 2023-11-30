import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearArticuloPage } from './crear-articulo.page';

const routes: Routes = [
  {
    path: '',
    component: CrearArticuloPage
  },
  {
    path: 'detallesarticulo',
    loadChildren: () => import('./detallesarticulo/detallesarticulo.module').then( m => m.DetallesarticuloPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearArticuloPageRoutingModule {}
