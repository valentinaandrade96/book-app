import { Component, OnInit } from '@angular/core';
import { Componente } from './interfaces/componente';
import { ComponentesService } from './servicios/componentes.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';



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
      nombre: 'Buscar',
      ruta: '/search',
      color: 'black',
      icono:'search-outline'

    },
    {
      nombre: 'Log out',
      ruta: '/button',
      color: 'sucess',
      icono:'radio-button-on-outline'
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
    }
    
    
   
    
  ];

  constructor(private route: ActivatedRoute,private modalController: ModalController,) {

   }
public nombre:string;
public esAdmin: boolean = false
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nombre=params.name;
      console.log(params.name);
    });
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
}
