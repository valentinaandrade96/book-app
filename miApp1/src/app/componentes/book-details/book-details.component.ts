import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/interfaces/product';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  @Input() libroPulsado: any;

  constructor(private modalController: ModalController) {}

  async ngOnInit() {
   
  // const modal = await this.modalController.getTop();
  }


  async dismissModal(item) {
    
    const data = item.id;
    await this.modalController.dismiss(data);
  }
}
