import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth-service';
import { Storage } from '@ionic/storage-angular';
import { Usuario, RespuestaLogin } from 'src/app/interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../../servicios/usuario.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-cambio',
  templateUrl: './cambio.page.html',
  styleUrls: ['./cambio.page.scss'],
})
export class CambioPage implements OnInit {
  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  usuarioStorage: Usuario;
  confirmarContrasena: string = '';
  email:string='';
  constructor(private authService: AuthService, private _usuarioService: UsuarioService,private router: Router,private storage: Storage,private toastController:ToastController) { }

  ngOnInit() {
  }
  async cambiarContrasena() {
    try {
    this.storage.create();

  this.usuarioStorage = await this.storage.get('usuario');
  this.email=this.usuarioStorage.email;
  if (this.contrasenaActual === this.nuevaContrasena) {
    // Manejar el caso en el que la contraseña actual y la nueva son iguales
    this.mostrarMensaje('La nueva contraseña debe ser diferente de la actual');
    return;
  }
  if (this.nuevaContrasena !== this.confirmarContrasena) {
    const toast = await this.toastController.create({
      duration: 5000,
      message: 'Las contraseñas no coinciden',
      position: 'bottom',
      cssClass: 'alertToast',
    });
    await toast.present();
    return; // Detener la función si las contraseñas no coinciden
  }
  const resultadoPromise: Promise<Observable<RespuestaLogin>> = this._usuarioService.cambiarContraseña(this.email, this.contrasenaActual, this.nuevaContrasena);
  const observable: Observable<RespuestaLogin> = await resultadoPromise;

  observable.subscribe(async (response:RespuestaLogin) => {
    console.log('response', response);
    if (response.ok) {
      // Actualiza el token con el nuevo usuario (si es necesario)
      if (response.token) {
        this._usuarioService.setTokenByString(response.token);
        this._usuarioService.setUsuario(response.usuario);
        this.mostrarMensaje('Contraseña cambiada con éxito');
        this.router.navigate['/usuario']; 
      }
      // Mostrar un mensaje de éxito (puedes personalizarlo)
      
    } else {
      // Manejar el caso en el que el cambio de contraseña no fue exitoso
      this.mostrarMensaje('Error al cambiar la contraseña');
    }
  });
} catch (error) {
  console.error('Error al cambiar la contraseña:', error);
  this.mostrarMensaje('Error interno al cambiar la contraseña');
}
}






  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      cssClass: 'tu-clase-css-personalizada',
    });
    await toast.present();
  }
  
 
  }

