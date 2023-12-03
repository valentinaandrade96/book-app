import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesAdminPageRoutingModule } from './detalles-admin-routing.module';

import { DetallesAdminPage } from './detalles-admin.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesAdminPageRoutingModule,
    ComponentesModule
  ],
  declarations: [DetallesAdminPage]
})
export class DetallesAdminPageModule {}
