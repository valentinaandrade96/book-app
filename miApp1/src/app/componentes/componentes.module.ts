import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent} from './cabecera/cabecera.component';
import {IonicModule} from '@ionic/angular';
import { PopOverComponent } from './pop-over/pop-over.component';

import { BookDetailsComponent } from './book-details/book-details.component';

@NgModule({
  declarations: [CabeceraComponent, PopOverComponent, BookDetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
    
  ],
  exports:[
    CabeceraComponent,
    PopOverComponent,
   
  ]
})
export class ComponentesModule { }
