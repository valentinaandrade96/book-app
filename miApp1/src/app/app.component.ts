import { Component, OnInit } from '@angular/core';
import { Componente } from './interfaces/componente';
import { ComponentesService } from './servicios/componentes.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from './interfaces/interfaces';
import { AuthService } from './servicios/auth-service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public rutasComponentes:Componente[];
  public componentes: Componente[] = [
    
    {
      nombre: 'Iniciio',
      ruta: '/libros',
      color: 'black',
      icono:'infinite-outline'
    },
    
    
  
    
    {
      nombre: 'Mi cuenta',
      ruta: '/usuario',
      color: 'sucess',
      icono:'mdi:qrcode-scan'
    },
   
    
    
    {
      nombre: 'Favoritos',
      ruta: '/favoritos',
      color: 'sucess',
      icono:'mdi:qrcode-scan'
    },
    {
      nombre: 'Carrito',
      ruta: '/carrito',
      color: 'sucess',
      icono:'mdi:qrcode-scan'
    },
    {
      nombre: 'Compras',
      ruta: '/compras',
      color: 'sucess',
      icono:'mdi:qrcode-scan'
    },
    {
      nombre: 'Log out',
      ruta: '/button',
      color: 'sucess',
      icono:'radio-button-on-outline'
    }
    
   
    
  ];
  public admin: Componente[] = [
    
    {
      nombre: 'Inicio',
      ruta: '/libros',
      color: 'black',
      icono:'infinite-outline'
    },
    {
      nombre: 'Subir nuevo Libro',
      ruta: '/nuevolibro',
      color: 'black',
      icono:'infinite-outline'
    },
    
   
    
    
    {
      nombre: 'Próximos Envios',
      ruta: '/admin',
      color: 'sucess',
      icono:'mdi:qrcode-scan'
    },
    {
      nombre: 'Mi cuenta',
      ruta: '/usuario',
      color: 'sucess',
      icono:'mdi:qrcode-scan'
    },
    
    {
      nombre: 'Log out',
      ruta: '/button',
      color: 'sucess',
      icono:'radio-button-on-outline'
    },
    
    
    
   
    
  ];

  constructor(private route: ActivatedRoute,private modalController: ModalController,private storage: Storage,private authService:AuthService ) {

   }
public nombre:string;
usuarioActual: Usuario;
usuarioStorage: Usuario;
  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.usuarioActual = user;
      // Aquí puedes realizar acciones adicionales cada vez que el usuario cambie
    });
    this.getUsuario();
    //this.geComponents();
    this.route.queryParams.subscribe(params => {
      this.nombre=params.name;
      console.log(params.name);
      
      
/*
      console.log("esAdmin()"+ this.esAdmin())
      console.log("esUser()"+ this.esUser())
      */
    });}

    async getUsuario(){
      await this.storage.create();
      this.usuarioStorage = await this.storage.get('usuario');
    }
   
    async geComponents(){
      
      if(this.usuarioStorage.rol === 'admin'){
        this.rutasComponentes=this.admin;
      }else{
        this.rutasComponentes=this.componentes;
      }
      console.log( "this.rutasComponentes" +this.rutasComponentes);
    }
/*
    esAdmin(): boolean {
      return this.usuarioStorage && this.usuarioStorage.rol === 'admin';
    }
    esUser(): boolean {
      return this.usuarioStorage && this.usuarioStorage.rol === 'usuario';
    }
    */
    /*
    this.storage.create();
    this.storage.get('usuario').then((usuario) => {
      if (usuario && usuario.rol === 'admin') {
        // Si el usuario tiene el rol 'Admin', establece esAdmin en true
        this.esAdmin = true;
        
        // Agrega elementos adicionales al menú si es administrador
        this.componentes.push(
          {
            nombre: 'Administrar Usuarios',
            ruta: '/administrar-usuarios',
            color: 'success', // Corrige el color a 'success' en lugar de 'sucess'
            icono: 'person-circle-outline',
          },
         
          // Agrega más elementos si es necesario
        );
        
        this.componentes = this.componentes.filter((elemento) => elemento.nombre === 'Mi cuenta' || elemento.nombre === 'Libros');
      }
      
    }*/
  
}
