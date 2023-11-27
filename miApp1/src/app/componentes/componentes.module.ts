import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent} from './cabecera/cabecera.component';
import {IonicModule} from '@ionic/angular';
import { PopOverComponent } from './pop-over/pop-over.component';
import { ShoppingCartComponentComponent } from './shopping-cart-component/shopping-cart-component.component';
import { BookDetailsComponent } from './book-details/book-details.component';

@NgModule({
  declarations: [CabeceraComponent, PopOverComponent, ShoppingCartComponentComponent, BookDetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
    
  ],
  exports:[
    CabeceraComponent,
    PopOverComponent,
    ShoppingCartComponentComponent
  ]
})
export class ComponentesModule { }
