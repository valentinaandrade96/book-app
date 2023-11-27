import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { pipesModule } from './pipes/pipes.module';
import { ShoppingCartComponentComponent } from './componentes/shopping-cart-component/shopping-cart-component.component';
import { BookDetailsComponent } from './componentes/book-details/book-details.component';
import { RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';



import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule, RouterModule],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
