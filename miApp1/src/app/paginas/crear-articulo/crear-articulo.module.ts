import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearArticuloPageRoutingModule } from './crear-articulo-routing.module';

import { CrearArticuloPage } from './crear-articulo.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    CrearArticuloPageRoutingModule
  ],
  declarations: [CrearArticuloPage]
})
export class CrearArticuloPageModule {}
