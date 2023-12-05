import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../../servicios/usuario.service';
import * as jwt_decode from 'jwt-decode';
import { ResultadoUpdate, Usuario } from 'src/app/interfaces/interfaces';
//import bcrypt from 'bcrypt';
import { Storage } from '@ionic/storage-angular';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuarioStorage: Usuario;
  
  isEditMode = false; 
  nombre: string= null ;
  apellidos: string= null ;
  
  
 
  nacimiento: Date = null;
  sexo: string = null;
  direccion: string= null;
  ciudad: string = null;
  localidad: string= null ;
  pais: string = null;
  rol: string = null;
  cp: string = null;
 
  usuario: Usuario;
  
  private _toastController: any;

  constructor(private _usuarioService: UsuarioService,private storage: Storage,private toastController: ToastController,private router: Router) {
    
    
  }
  formattedDate:string;
  async toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    
    // Si estamos en modo de edición, carga los datos del usuario desde el storage
    if (this.isEditMode) {
      this.usuarioStorage = await this.storage.get('usuario');
      console.log(this.usuarioStorage.nacimiento+ " this.usuarioStorage.nacimiento")
      this.nombre = this.usuarioStorage.nombre;
      this.apellidos = this.usuarioStorage.apellidos;
      this.nombre = this.usuarioStorage.nombre, // Valor por defecto si no está definido
       this.apellidos =this.usuarioStorage.apellidos ,
       //this.password=this.usuarioStorage.password ,
       //this.usuarioStorage.email , // Valor por defecto si no está definido
       this.nacimiento =this.usuarioStorage.nacimiento , // Valor por defecto si no está definido
     this.sexo = this.usuarioStorage.sexo ,
      this.direccion = this.usuarioStorage.direccion ,
      this.ciudad  = this.usuarioStorage.ciudad ,
       this.localidad  = this.usuarioStorage.localidad,
       this.pais  =this.usuarioStorage.pais ,
       this.cp= this.usuarioStorage.cp ,
      this.usuarioStorage.favoritos ,
       this.usuarioStorage.compras ,
      this.usuarioStorage.rol ,
       this.usuarioStorage.carrito 
      // Asigna más campos de datos aquí
    }
  }
  // En tu componente TypeScript
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }


  async guardarCambios(){
    this.storage.create();

    this.usuarioStorage = await this.storage.get('usuario');
   console.log("usuario en storage"+this.usuarioStorage)
   console.log("this.nombre"+this.nombre);

    this.usuario = {
      nombre: this.nombre || this.usuarioStorage.nombre, // Valor por defecto si no está definido
      apellidos: this.apellidos || this.usuarioStorage.apellidos ,
      password : this.usuarioStorage.password ,
      email : this.usuarioStorage.email , // Valor por defecto si no está definido
      nacimiento: this.nacimiento || this.usuarioStorage.nacimiento , // Valor por defecto si no está definido
      sexo: this.sexo || this.usuarioStorage.sexo ,
      direccion: this.direccion || this.usuarioStorage.direccion ,
      ciudad : this.ciudad  || this.usuarioStorage.ciudad ,
      localidad : this.localidad  || this.usuarioStorage.localidad,
      pais : this.pais  || this.usuarioStorage.pais ,
      cp: this.cp || this.usuarioStorage.cp ,
      favoritos: this.usuarioStorage.favoritos ,
      compras: this.usuarioStorage.compras ,
      rol: this.usuarioStorage.rol ,
      carrito: this.usuarioStorage.carrito 
    };
    console.log("el usuario desde guardar cambios : "+this.usuario)
    const resultadoPromise: Promise<Observable<ResultadoUpdate>> = this._usuarioService.update(this.usuario);
    resultadoPromise.then(async (observable: Observable<ResultadoUpdate>) => {
      observable.subscribe(async(response: ResultadoUpdate) => {
      console.log('response', response);
      if (response.ok == false) {
        console.log('error de inicio de sesión');
        const toast = await this._toastController.create({
          duration: 5000,
          message: 'Error en la modificación',
          position: 'bottom',
          cssClass: 'alertToast',
        });
        await toast.present();
      } else {
        if (response.token) {
          this._usuarioService.setToken(response);
          this._usuarioService.setUsuario(response.userDB);
          console.log(response.userDB);
          console.log(typeof response.userDB);
        }
        if (response.ok) {
          // Actualizar el token con el nuevo usuario (si es necesario)
          if (response.userDB) {
            // Suponiendo que tienes un método para guardar el token en el servicio
            this._usuarioService.guardarToken(response.token);
    
            // Actualizar la variable de usuario en la página
            this.usuario = response.userDB;
    
            // Mostrar un mensaje de éxito (puedes personalizarlo)
            this.mostrarMensaje('Usuario actualizado con éxito');
          } else {
            this.mostrarMensaje('Usuario no encontrado');
          }
        } else {
          // Manejar el caso en el que la actualización no fue exitosa
          this.mostrarMensaje('Error al actualizar el usuario');
        }
        this.router.navigateByUrl('/usuario');
        console.log('El login es correcto');
      }
    });
  });



  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000, // Duración del mensaje en milisegundos (opcional)
      position: 'bottom', // Posición del mensaje en la pantalla (opcional)
      cssClass: 'tu-clase-css-personalizada', // Clase CSS personalizada para el estilo del mensaje (opcional)
    });
    await toast.present();
  }
    
 
  async ngOnInit() {
   
    this.usuarioStorage = await this.storage.get('usuario');
    this.nombre= this.usuarioStorage.nombre;
    this.apellidos = this.usuarioStorage.apellidos;
    this.nacimiento =this.usuarioStorage.nacimiento , // Valor por defecto si no está definido
    this.sexo = this.usuarioStorage.sexo ,
     this.direccion = this.usuarioStorage.direccion ,
     this.ciudad  = this.usuarioStorage.ciudad ,
      this.localidad  = this.usuarioStorage.localidad,
      this.pais  =this.usuarioStorage.pais ,
      this.cp= this.usuarioStorage.cp

/*
  this.usuario = {
  nombre: this.nombre || this.usuarioStorage.nombre,
  apellidos: this.apellidos || this.usuarioStorage.apellidos,
  password : this.password || this.usuarioStorage.password,
  email : this.usuarioStorage.email,
  nacimiento: this.nacimiento || this.usuarioStorage.nacimiento,
  sexo: this.sexo || this.usuarioStorage.sexo,
  direccion:this.direccion || this.usuarioStorage.direccion,
  ciudad : this.ciudad  || this.usuarioStorage.ciudad,
  localidad : this.localidad  || this.usuarioStorage.localidad,
  pais : this.pais  || this.usuarioStorage.pais,
  cp: this.cp || this.usuarioStorage.cp,
  favoritos: this.usuarioStorage.favoritos,
  compras: this.usuarioStorage.compras,
  rol: this.usuarioStorage.rol,
  carrito: this.usuarioStorage.carrito

}
*/

}

}
