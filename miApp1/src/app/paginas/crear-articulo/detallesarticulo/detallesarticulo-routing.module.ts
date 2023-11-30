import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesarticuloPage } from './detallesarticulo.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesarticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesarticuloPageRoutingModule {}
