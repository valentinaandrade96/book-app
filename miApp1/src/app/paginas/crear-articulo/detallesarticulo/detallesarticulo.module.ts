import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesarticuloPageRoutingModule } from './detallesarticulo-routing.module';

import { DetallesarticuloPage } from './detallesarticulo.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesarticuloPageRoutingModule,
    ComponentesModule
  ],
  declarations: [DetallesarticuloPage]
})
export class DetallesarticuloPageModule {}
