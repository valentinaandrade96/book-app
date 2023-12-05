import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Storage } from '@ionic/storage-angular';
import { Articulo, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/servicios/auth-service';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit{
  
  libro: any = {};
  cantidad: number = 1;
  usuarioStorage: Usuario;
  usuarioActual:Usuario;
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private storage: Storage,
    private authService: AuthService
  ) {
    
    
    this.route.params.subscribe((params) => {
      console.log(params)
      if (params['id']) {
        console.log(params['id'])
       
        this.obtenerDetallesLibro(params['id']);
        
      }
    });
    
  }
ngOnInit() {
  this.authService.currentUser.subscribe(user => {
    this.usuarioActual = user;
  });
    this.getUser()
  }
  async getUser(){
    this.usuarioStorage = await this.storage.get('usuario');
    
   
  }
  esAdmin(): boolean {
    return this.usuarioStorage && this.usuarioStorage.rol === 'admin';
  }
  iniciarEdicion() {
   // const articulo: Articulo=
    
  }

  async obtenerDetallesLibro(titulo: string) {
    this.usuarioStorage = await this.storage.get('usuario');
    this.authService.setCurrentUser(this.usuarioStorage);
    console.log(titulo)
 
    this.usuarioService.obtenerDetallesLibro(titulo).subscribe(
      (response) => {
        if (response.ok) {
          
          console.log('Libro encontrado:', response.libro);
          this.libro=response.libro
        } else {
          console.log('Libro no encontrado');
        }
      },
      (error) => {
        console.error('Error al buscar el libro:', error);
      }
    );
  }

  agregarFavoritos(){
    
    const body={
      titulo: this.libro.titulo,
      email:this.usuarioStorage.email
    }

    this.http.post("https://bookserver-6e5c8a077822.herokuapp.com/usuario/agregarAFavorito", body).subscribe((data: any) => {
      console.log(data)
      this.usuarioService.setUsuario(data.usuario);
      console.log()
      this.usuarioService.guardarToken(data.token);
      if(data.ok == true){
        alert("Añadido correctamente a favoritos.");
      }
    });
  }

  agregarAlCarrito(){
    const body={
      titulo: this.libro.titulo,
      email:this.usuarioStorage.email
    }

    this.http.post("https://bookserver-6e5c8a077822.herokuapp.com/usuario/agregarCarrito", body).subscribe((data: any) => {
      console.log(data)
      this.usuarioService.setUsuario(data.usuario);
      console.log()
      this.usuarioService.guardarToken(data.token);
      if(data.ok == true){
        alert("Añadido correctamente al carrito.");
      }
    });
  }
  async verificaSiCarrito() {
    this.getUser()
    console.log(this.usuarioStorage.nombre + "this.usuarioStorage.nombre")
    if (this.usuarioStorage) {
      if (this.usuarioStorage.carrito == null || this.usuarioStorage.carrito == null) {
        this.agregarFavoritos();
      } else {
        const yaEstaEnCarrito = this.usuarioStorage.carrito.some(item => item.titulo === this.libro.titulo);
        if (yaEstaEnCarrito) {
          if (confirm("Ya tienes este artículo en el carrito. ¿Quieres volver a meterlo?")) {
            this.agregarAlCarrito()
          }
        } else {
          this.agregarAlCarrito()
        }

        }

      }else{console.log("nada, esto no funciona")}}

  async verificaSiFavoritos(){
    this.getUser()
    //this.usuarioStorage = await this.storage.get('usuario');
    if(this.usuarioStorage.favoritos== null){
      this.agregarFavoritos();
    }else{
    const yaEstaEnFavoritos = this.usuarioStorage.favoritos.some(item => item.titulo === this.libro.titulo);
    console.log(yaEstaEnFavoritos +"yaEstaEnFavoritos")
    if (yaEstaEnFavoritos) {
      alert("Este artículo ya está en tus favoritos.");
     return; 
    }else{
      this.agregarFavoritos();
    }
  }}
}

