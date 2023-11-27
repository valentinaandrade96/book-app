import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.page.html',
  styleUrls: ['./modal-content.page.scss'],
})
export class ModalContentPage implements OnInit {

  constructor(private modalController: ModalController) { }

  @Input() nombre: string;
  @Input() edad: number;

  ngOnInit() {
    console.log('Nombre:', this.nombre);
    console.log('Edad::', this.edad);
  }

  onClick(aceptando: boolean) {
    if(aceptando) {
      this.modalController.dismiss({
        nombre: this.nombre,
        edad: this.edad
      });
    } else {
      this.modalController.dismiss();
    }
  }

  cambiar(ev: any, dato:string) {
    this[dato] = ev.target.value;
  }

}
