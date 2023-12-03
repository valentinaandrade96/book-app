import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevolibroPageRoutingModule } from './nuevolibro-routing.module';

import { NuevolibroPage } from './nuevolibro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevolibroPageRoutingModule
  ],
  declarations: [NuevolibroPage]
})
export class NuevolibroPageModule {}
