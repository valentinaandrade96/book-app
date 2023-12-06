import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Observable } from 'rxjs';
import { Usuario, Compra, ResultadoUpdate } from 'src/app/interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  usuarios: Usuario[] = [];
  compras: Compra[];
  //comprasNoEnviadas:ICompra[];
  page:Usuario;
  nombre: string;
  fechaCompra: Date;
  email: string;
  articulo: string[];
  enviado: boolean;
  precioTotal: Number;
  nombreUsuario: string;
  direccion: string;
  ciudad: string;
  localidad: string;
  pais: string;
  cp: string;
  
  constructor( private _usuarioService: UsuarioService, private _toastController: ToastController,private router: Router) { }

  ngOnInit() {
    
    /* 
    this.getComprasNoEnviadas();
    this.getComprasNoEnviadas();
    */
    
    this.obtenerUsuariosConComprasNoEnviadas();
    
  }
  
  async obtenerUsuariosConComprasNoEnviadas(): Promise<void> {
    try {
      const respuesta = await this._usuarioService.obtenerTodosLosUsuarios().toPromise();
      
      if (respuesta && respuesta.usuarios) {
        console.log()
        // Filtra usuarios con compras no enviadas
        this.usuarios = respuesta.usuarios.filter((usuario) => {
          return usuario.compras.some((compra) => !compra.enviado);
        });
    if(this.usuarios[0]){
      console.log("this.usuarios[0]")
        this.page = this.usuarios[0];
        this.email = this.page.email;
        //this.articulo = this.page.compras.titulo;
    
        //this.precioTotal = this.page.compras.precioTotal;
    
        this.nombreUsuario = this.page.nombre + " " + this.page.apellidos;
        this.direccion = this.page.direccion;
        this.ciudad = this.page.ciudad;
        this.localidad = this.page.localidad;
        this.pais = this.page.pais;
        this.cp = this.page.cp;
    
        this.compras = this.page.compras;
      }else{
        
        this.page = null;
        this.email = '';
        //this.articulo = this.page.compras.titulo;
    
        //this.precioTotal = this.page.compras.precioTotal;
    
        this.nombreUsuario = '';
        this.direccion = '';
        this.ciudad = '';
        this.localidad = '';
        this.pais = '';
        this.cp = '';
    
        this.compras = [];
      }
      } else {
        console.error('Respuesta inválida al obtener usuarios');
        // Manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
      }
    } catch (error) {
      console.error('Error al obtener usuarios con compras no enviadas', error);
      // Manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
    }
  }
  
  async marcarComoEnviado(email: string): Promise<void> {
    try {
      // Obtener el email del usuario actual (puedes obtenerlo de donde lo necesites)
      //const emailUsuarioActual = this.page.email; // Cambia esto para obtener el email actual

      // Llamar al servicio para marcar como enviado
      this.page.compras.forEach(item=>{
        item.enviado=true
      })
      const resultadoPromise: Promise<Observable<ResultadoUpdate>> = this._usuarioService.update(this.page);
      resultadoPromise.then(async (observable: Observable<ResultadoUpdate>) => {
        observable.subscribe(async(response: ResultadoUpdate) => {
        console.log('response', response);
        if (response.ok == false) {
          console.log('error al cambiar a enviado las compras');
          const toast = await this._toastController.create({
            duration: 5000,
            message: 'Error en la modificación',
            position: 'bottom',
            cssClass: 'alertToast',
          });
          await toast.present();
        } else {
          if (response.token) {
           // this._usuarioService.setToken(response.token);
            console.log("response.token")
            this.obtenerUsuariosConComprasNoEnviadas();
          }
          if (response.ok) {
            console.log("response.ok")
            this.obtenerUsuariosConComprasNoEnviadas();
            // Actualizar el token con el nuevo usuario (si es necesario)
            if (response.userDB) {
              console.log("response.userDB")
              // Suponiendo que tienes un método para guardar el token en el servicio
              this.obtenerUsuariosConComprasNoEnviadas();
              console.log("Se ha actualizao correctisimamente")
              this.router.navigateByUrl('/admin');
              
              // Actualizar la variable de usuario en la página
              
      
              // Mostrar un mensaje de éxito (puedes personalizarlo)
              
            } else {
              //this.mostrarMensaje('Usuario no encontrado');
            }
          } else {
            // Manejar el caso en el que la actualización no fue exitosa
            
          }
          
        }
      });
    });
      //await this.usuarioService.marcarComoEnviado(email);

      // Recargar la página o actualizar los datos como sea necesario
      
     // this.obtenerUsuariosConComprasNoEnviadas();
    } catch (error) {
      console.error('Error al marcar como enviado:', error);
      // Maneja el error según tus necesidades
    }
  }
  
  /*

  obtenerUsuariosConComprasNoEnviadas(): void {
    ( this.usuarioService.obtenerTodosLosUsuarios()).subscribe((usuarios) => {
      // Filtra usuarios con compras no enviadas
      this.usuarios = usuarios.filter((usuario) => {
        return usuario.compras.some((compra) => !compra.enviado);
      });
    });
    this.page=this.usuarios[0];
    this.email =this.page.email ;
    //this.articulo =this.page.compras.titulo ;
    
    //this.precioTotal = this.page.compras.precioTotal ;

    this.nombreUsuario = this.page.nombre +" "+ this.page.apellidos;
    this.direccion =this.page.direccion ;
    this.ciudad =this.page.ciudad ;
    this.localidad =this.page.localidad ;
    this.pais = this.page.pais;
    this.cp = this.page.cp;

    this.compras= this.page.compras;
  }
  */
/*
  async getComprasNoEnviadas() {
   
       (await this.compraService.getComprasNoEnviadas()).subscribe(resp=>{
        console.log(resp)
        console.log(resp.compras);
        this.comprasNoEnviadas=resp.compras;
        this.page=this.comprasNoEnviadas[0];
        
    this.email =this.page.email ;
    this.articulo =this.page.compras.titulo ;
    
    this.precioTotal = this.page.compras.precioTotal ;
    this.nombreUsuario = this.page.nombre +" "+ this.page.apellidos;
    this.direccion =this.page.direccion ;
    this.ciudad =this.page.ciudad ;
    this.localidad =this.page.localidad ;
    this.pais = this.page.pais;
    this.cp = this.page.cp;
    
        console.log(this.comprasNoEnviadas[0].precioTotal)
    console.log("El array de compras"+this.comprasNoEnviadas[0].articulo)
       // this.comprasNoEnviadas.push(...resp.compras)
        });
      
        




      
  }

  async getCompras() {
   
    (await this.compraService.getCompras()).subscribe(resp=>{
    
     const com = resp.compras;
     this.compras=resp.compras;
    console.log("El array de compras"+this.compras)

      if (Array.isArray(com)) {
        this.compras=resp.compras;
        console.log("El array de compras"+this.compras)
      } else {
        console.error('La respuesta no es un array válido.');
      }
     //this.compras.push(...resp.compras)
     });
   
     

obtenerUsuarios(): void {
    this.usuarioService.obtenerTodosLosUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }


   
}
*/

 
}
    