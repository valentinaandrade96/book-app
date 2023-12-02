import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Storage } from '@ionic/storage-angular';
import { Articulo, Usuario } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage {
  
  libro: any = {};
  cantidad: number = 1;
  usuarioStorage: Usuario;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private storage: Storage
  ) {
    
    
    this.route.params.subscribe((params) => {
      console.log(params)
      if (params['id']) {
        console.log(params['id'])
       
        this.obtenerDetallesLibro(params['id']);
        
      }
    });
    
  }
  esAdmin(): boolean {
    return this.usuarioStorage && this.usuarioStorage.rol === 'admin';
  }
  iniciarEdicion() {
   // const articulo: Articulo=
    
  }

  async obtenerDetallesLibro(titulo: string) {
    this.usuarioStorage = await this.storage.get('usuario');
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
    });
  }
  async verificaSiCarrito(){
    const yaEstaEnCarrito = this.usuarioStorage.carrito.some(item => item.titulo === this.libro.titulo);
    if (yaEstaEnCarrito) {
      if (confirm("Ya tienes este artículo en el carrito. ¿Quieres volver a meterlo?")) {
        this.agregarAlCarrito() 
      }
    } else {
      this.agregarAlCarrito() 
    }
  
  }

  async verificaSiFavoritos(){
    const yaEstaEnFavoritos = this.usuarioStorage.favoritos.some(item => item.titulo === this.libro.titulo);
    if (yaEstaEnFavoritos) {
      alert("Este artículo ya está en tus favoritos.");
      return; 
    }else{
      this.agregarFavoritos();
    }
  }
}

