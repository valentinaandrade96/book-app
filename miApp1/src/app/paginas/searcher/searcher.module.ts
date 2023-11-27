import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { SearchPipe } from 'src/app/pipes/filter.pipes';
import { pipesModule } from 'src/app/pipes/pipes.module';
import { CartPageRoutingModule } from '../cart/cart-routing.module';

import { SearcherPage } from './searcher';
import { SearcherPageRoutingModule } from './searcher-routing.module';

@NgModule({
  declarations: [
    SearcherPage,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    SearcherPageRoutingModule,
    pipesModule
  ],
})
export class SearcherPageModule {}
