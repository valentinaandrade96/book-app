import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from 'src/app/interfaces/product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shopping-cart-component',
  templateUrl: './shopping-cart-component.component.html',
  styleUrls: ['./shopping-cart-component.component.scss'],
})
export class ShoppingCartComponentComponent implements OnInit {
 

  constructor(private modalController: ModalController, private router: Router) {}
  [x: string]: any;
  
  public librosQueComprar: Item[]=[]
  @Input() carritoCompra: any;
  @Input() carritoCesta: any;
  

  ngOnInit() {}
  async Comprar(id: String) {
 

}
async dismissModal() {
    
  
  await this.modalController.dismiss();
}



}
