import { Component, OnInit } from '@angular/core';
import { Componente } from './interfaces/componente';
import { ComponentesService } from './servicios/componentes.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from './interfaces/interfaces';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

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
      nombre: 'Próximos Envios',
      ruta: '/admin',
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

  constructor(private route: ActivatedRoute,private modalController: ModalController,private storage: Storage) {

   }
public nombre:string;

usuarioStorage: Usuario;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nombre=params.name;
      console.log(params.name);
      this.getUsuario()
    });}

    async getUsuario(){
      await this.storage.create();
      this.usuarioStorage = await this.storage.get('usuario');
    }

    esAdmin(): boolean {
      return this.usuarioStorage && this.usuarioStorage.rol === 'admin';
    }
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
