import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesAdminPage } from './detalles-admin.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesAdminPageRoutingModule {}
