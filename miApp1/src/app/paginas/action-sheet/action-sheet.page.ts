import { TranslationWidth } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.page.html',
  styleUrls: ['./action-sheet.page.scss'],
})
export class ActionSheetPage implements OnInit {

  constructor(private _actionSheetController:ActionSheetController, private _toastController:ToastController) { }

  ngOnInit() {
  }
  
async mostrar() {
  const actionSheet = await this._actionSheetController.create({
    backdropDismiss:false,
    header: '¿Eliminar registro?',
    subHeader: 'Esta opción no se puede deshacer',
    buttons: [
      {
        text: 'Sí',
        icon:'trash',
        cssClass:'colorRojo',
        role: 'destructive',
        data: {
          action: 'eliminar',
        },
      },
      {
        text: 'No',
        cssClass:'colorAzul',
        icon:'cancel',
        data: {
          action: 'No',
        },
      }
    ],
  });

  await actionSheet.present();

  const {data} = await actionSheet.onDidDismiss();
  if(!data||data.action=='No'){
    const toast = await this._toastController.create({
      duration:2000,
      message:'Se cancelala operación',
      position:'bottom'
    });
    await toast.present();
  }else{
    const toast = await this._toastController.create({
      duration:2000,
      message:'Registro eliminado',
      position:'middle'
    });
    await toast.present();
  }
}
}

