import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevolibroPageRoutingModule } from './nuevolibro-routing.module';

import { NuevolibroPage } from './nuevolibro.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevolibroPageRoutingModule,
    ComponentesModule,
    ReactiveFormsModule
  ],
  declarations: [NuevolibroPage]
})
export class NuevolibroPageModule {}
