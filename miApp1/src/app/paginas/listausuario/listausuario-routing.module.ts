import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListausuarioPage } from './listausuario.page';

const routes: Routes = [
  {
    path: '',
    component: ListausuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListausuarioPageRoutingModule {}
