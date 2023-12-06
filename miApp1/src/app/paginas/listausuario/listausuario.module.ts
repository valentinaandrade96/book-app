import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListausuarioPageRoutingModule } from './listausuario-routing.module';

import { ListausuarioPage } from './listausuario.page';
import { pipesModule } from 'src/app/pipes/pipes.module';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    pipesModule,
    ComponentesModule,
    ListausuarioPageRoutingModule
  ],
  declarations: [ListausuarioPage]
})
export class ListausuarioPageModule {}
