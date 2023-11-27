import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { JuegoInterfaz } from 'src/app/interfaces/juego-interfaz';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {

  constructor(private _alertController:AlertController, private _toastController: ToastController) { }

  public arrayJuegos: JuegoInterfaz[] = [];

  ngOnInit() {
  }

  /*async mostrarAlertaDatos(){
    const alert = await this._alertController.create({
      backdropDismiss:false,
      header: 'Please enter your info',
      buttons:[{
        text:'OK',
        role:'ok'
      },
      {
        text:'Cancelar',
        role:'cancelar'
      }
    ],
      inputs:[
        {
          placeholder:'Nombre',
          name:'Nombre'
        },
        {
          placeholder:'Categoría',
          name:'Nickname',
          attributes:{
            maxlength:8,
          },
        },
        {
          type:'number',
          name:'puntuacion',
          placeholder:'Puntuacion',
          min:1,
          max:100,

        },
        {
          type:'textarea',
          name:'descripcion',
          placeholder:'¿De qué va el juego?',
        },
      ],
    });
    await alert.present();
    const datos=await alert.onDidDismiss();
    console.log('datos',datos);
  }
  async mostrarAlert(){
    const alert= await this._alertController.create({
      header:'Alerta',
      subHeader:'Mensaje importante',
      message:'Alerta simple',
      mode:'md',
      buttons:[
        {
          text:'OK',
          handler:()=>{
            console.log('Se ha pulsado ok');
          }
        },
        {
          text:'Cancelar',
          handler:()=>{
            console.log('Se ha pulsado cancelar');
          }
        }


      ],
    });
    await alert.present();
  }*/

  async formularioJuegos() {
    let aceptado = -1;
    const alert = await this._alertController.create({
      header: 'Juegos',
      backdropDismiss: false,
      buttons: [
        {
          text: "Aceptar",
          role: "Aceptado",
          cssClass: "alert-button-confirm",
          handler: () => {
            aceptado = 1;
            console.log("Aceptando...");
          }
        },
        {
          handler: () => {
            console.log("Cancelando...");
          },
          text: "Cancelar",
          role: "Cancelado",
          cssClass: "alert-button-cancel"
        }
      ],
      inputs: [
        { 
          type: 'text',    
          id: "nombre",
          placeholder: 'Nombre'
        },
        {
          type: 'text',
          id: "categoria",
          placeholder: 'Categoría',
        },
        {
          type: 'number',
          id: "puntuacion",
          placeholder: 'Puntuación',
        },
        {
          type: 'date',
          id: "fecha",
          placeholder: 'Fecha de lanzamiento'
        }]
    });

    await alert.present();

    const datos = await alert.onWillDismiss();
    let juegoRegistrado = this.arrayJuegos.some(item => {
      return item.nombre == datos.data.values[0];
    });
    if (juegoRegistrado == true) {
      const toast = await this._toastController.create({
        duration: 4000,
        message: "ERROR: Ese juego ya está registrado"})
        toast.present();
        console.log('Ese juego ya está registrado');
    } else {
      if (aceptado == 1) {
        if (datos.data.values[2] > 10) {
          datos.data.values[2] = 10
        };
        let juego = { nombre: datos.data.values[0], categoria: datos.data.values[1], 
          puntuacion: datos.data.values[2], 
          fechaEstreno: datos.data.values[3]}

        this.arrayJuegos.push(juego);
        console.log('Juegos:', this.arrayJuegos);
      }
    }
  }

}
