
import { Component, OnInit } from '@angular/core';
import { Articulo, Compra, Usuario } from 'src/app/interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth-service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(private navCtrl: NavController, private authService: AuthService, private storage: Storage, private http: HttpClient, private usuarioService: UsuarioService, private router: Router) { }
  usuarioStorage: Usuario;
  carrito: Compra[] = [];
  precioTotalPedido: number = 0;
  gastosEnvio: number;
  descuento: string;
  resultadoPrecio: number;
  libros: Articulo[] = []
  ngOnInit() {
    this.cargarUser();


  }
  getStock(titulo: string): number {

    const libroEncontrado = this.libros.find(libro => libro.titulo === titulo);
    return libroEncontrado ? libroEncontrado.stock : 0;
  }
  async cargarUser() {
    await this.storage.create();
    this.usuarioStorage = await this.storage.get('usuario');
    this.loadBooks();

    this.authService.setCurrentUser(this.usuarioStorage);
    if (this.usuarioStorage) {
      this.carrito = this.usuarioStorage.carrito

      //this.calcularPrecioTotal();
    } else {
      this.carrito = [];

    }

    this.carrito.forEach((item) => {
      if (this.getStock(item.titulo)) {
        this.precioTotalPedido = this.precioTotalPedido + item.precioTotal;
      }});
    this.descuento = "10%"
    this.resultadoPrecio = this.precioTotalPedido - (this.precioTotalPedido * 0.1)
  
}

  async cargarUserAfter(){

  this.usuarioStorage = await this.storage.get('usuario');
  if (this.usuarioStorage) {
    this.carrito = this.usuarioStorage.carrito;
  } else {
    this.carrito = [];
  }
}

verificaCompra(){
  if (this.carrito.length > 0) {
    this.comprar();
  } else {
    alert("No tienes elementos en el carrito que comprar");
  }


}

loadBooks() {
  // Llama a tu servidor para obtener la lista de libros
  this.http.get('https://bookserver-6e5c8a077822.herokuapp.com/articulo/get').subscribe((data: any) => {
    this.libros = data.articulos;
  });
}
  async comprar(){

  const body = {

    email: this.usuarioStorage.email
  }
  console.log(this.usuarioStorage.email)
  this.http.post("https://bookserver-6e5c8a077822.herokuapp.com/usuario/moverCarritoACompras", body).subscribe(async (data: any) => {
    if (data) {
      //console.log(data)
      this.usuarioService.setUsuario(data.usuario);
      console.log("edata.mensaj " + data.mensaje)
      //console.log()
      this.usuarioService.guardarToken(data.token);
      this.usuarioStorage = data.usuario;

      if (!data.carritosafe == null) {
        alert("Se mantienen en el carrito los libros que no tienen stock")
      }
      this.carrito = this.usuarioStorage.carrito;
      this.precioTotalPedido = 0;
      this.carrito.forEach((item) => {
        console.log("precioTotalPedido" + this.precioTotalPedido)
        console.log("item.precioTotal" + item.precioTotal)
        this.precioTotalPedido = this.precioTotalPedido + item.precioTotal
      });
      this.descuento = "10%"
      this.resultadoPrecio = this.precioTotalPedido - (this.precioTotalPedido * 0.1)


      this.usuarioStorage = await this.storage.get('usuario');
      console.log("Comprar carrrito despues del token: " + this.usuarioStorage.carrito[0])
      alert(data.mensaje)
      if (data.carritosafe="") {
        this.navCtrl.navigateForward('/libros');
      }else{
     
    }
    }
  });



}
  

  async eliminarDelCarrito(item: any){
  const body = {
    titulo: item.titulo,
    email: this.usuarioStorage.email
  }

  this.http.post("https://bookserver-6e5c8a077822.herokuapp.com/usuario/eliminarDelCarrito", body).subscribe(async (data: any) => {
    if (data) {
      //console.log(data)
      this.usuarioService.setUsuario(data.usuario);

      //console.log()
      this.usuarioService.guardarToken(data.token);
      this.usuarioStorage = await this.storage.get('usuario');
      this.cargarUserAfter()


      this.usuarioStorage = await this.storage.get('usuario');
      this.authService.setCurrentUser(this.usuarioStorage);
      this.usuarioStorage = data.usuario;
      this.precioTotalPedido = 0;
      this.carrito.forEach((item) => {
        console.log("precioTotalPedido" + this.precioTotalPedido)
        console.log("item.precioTotal" + item.precioTotal)
        this.precioTotalPedido = this.precioTotalPedido + item.precioTotal
      });
      this.descuento = "10%"
      this.resultadoPrecio = this.precioTotalPedido - (this.precioTotalPedido * 0.1)


      this.carrito = this.usuarioStorage.carrito;
      console.log("Ddespues de eliminar del carrito: " + this.usuarioStorage.carrito[0]);
    }
  });


}

 
  
}
