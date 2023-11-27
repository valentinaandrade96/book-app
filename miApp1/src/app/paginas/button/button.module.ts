import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ButtonPageRoutingModule } from './button-routing.module';

import { ButtonPage } from './button.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ButtonPageRoutingModule,
    ComponentesModule
  ],
  declarations: [ButtonPage]
})
export class ButtonPageModule {}
