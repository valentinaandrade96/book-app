import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfiniteScrollPageRoutingModule } from './infinite-scroll-routing.module';

import { InfiniteScrollPage } from './infinite-scroll.page';

import { ComponentesModule } from '../../componentes/componentes.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfiniteScrollPageRoutingModule,
    ComponentesModule,

  ],
  declarations: [InfiniteScrollPage]
})
export class InfiniteScrollPageModule {}
