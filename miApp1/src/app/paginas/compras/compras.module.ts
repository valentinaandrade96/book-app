import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprasPageRoutingModule } from './compras-routing.module';

import { ComprasPage } from './compras.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprasPageRoutingModule,
    ComponentesModule
  ],
  declarations: [ComprasPage]
})
export class ComprasPageModule {}
