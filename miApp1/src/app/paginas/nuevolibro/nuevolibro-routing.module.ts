import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevolibroPage } from './nuevolibro.page';

const routes: Routes = [
  {
    path: '',
    component: NuevolibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevolibroPageRoutingModule {}
