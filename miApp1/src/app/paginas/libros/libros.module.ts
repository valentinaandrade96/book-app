import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrosPageRoutingModule } from './libros-routing.module';
import { ComponentesModule } from "../../componentes/componentes.module";
import { LibrosPage } from './libros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibrosPageRoutingModule,
    ComponentesModule,
  ],
  declarations: [LibrosPage]
})
export class LibrosPageModule {}
