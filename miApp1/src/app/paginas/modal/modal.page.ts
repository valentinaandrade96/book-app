import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopOverComponent } from 'src/app/componentes/pop-over/pop-over.component';
import { ModalContentPage } from '../modal-content/modal-content.page';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private modalController: ModalController,
              private popoverController: PopoverController) { }

  ngOnInit() {
  }

  async muestraModal() {
    const modal = await this.modalController.create({
      component: ModalContentPage,
      componentProps: {
        nombre: 'Valentina',
        edad: 26
      }
    });
    await modal.present();

    const datos = await modal.onDidDismiss();
    console.log('Datos:', datos);
    const elemento = datos.data;
    console.log('Elemento:', elemento);
  }

  async muestraPopover(ev: any) {
    const popOver= await this.popoverController.create({
      component: PopOverComponent,
      event: ev,
      backdropDismiss: false,
      mode: 'ios',
      arrow: true
    });
    await popOver.present();
    const {data} = await popOver.onDidDismiss();
    console.log('Item:', data);
  }

}
