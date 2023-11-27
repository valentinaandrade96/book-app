import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { ComprasService } from 'src/app/servicios/compras.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    ComponentesModule
  ],
  declarations: [AdminPage],
  exports: [
    AdminPage,
  ],
  providers:[ComprasService]
})
export class AdminPageModule {}
