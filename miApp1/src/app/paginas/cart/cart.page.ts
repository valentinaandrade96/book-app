import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, IonRefresher } from '@ionic/angular';
import { Personajes } from 'src/app/interfaces/personajes';
import { StarWarsService } from 'src/app/servicios/star-wars.service';
import { Item } from 'src/app/interfaces/product';
import { booksService } from 'src/app/servicios/books-service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-refresher',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(public alertControl: AlertController,private route: ActivatedRoute, private bookService:booksService, private modalController: ModalController, private router: Router) { }

  public librosEnCarrito: Item[] = [];
  public total: number=0;
  
  public maxDatos: number;
/*
  async presentAlert() {
    const alert = await this.alertControl.create({
      header: 'Pago Exitoso',
      message: 'Se ha efectuado el pago de forma exitosa.',
      buttons: ['OK']
    });

    await alert.present();
  }
*/
  async ngOnInit() {
     


      this.bookService.totalCarrito.subscribe(data=>{
     
        this.total=data;
        console.log(this.total);
      })
      
  }


  
    
   
  

}
