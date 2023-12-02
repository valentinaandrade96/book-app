
import { Component, OnInit } from '@angular/core';
import { Compra, Usuario } from 'src/app/interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(private storage: Storage,private http: HttpClient,private usuarioService: UsuarioService,private router: Router) { }
  usuarioStorage: Usuario;
  carrito: Compra[]=[];
  precioTotalPedido:number;
  gastosEnvio:number;
  descuento:string;
  resultadoPrecio:number;

  ngOnInit() {
    this.cargarUser();
  }
  async cargarUser(){
    await this.storage.create();
    this.usuarioStorage = await this.storage.get('usuario');
    if(this.usuarioStorage){
    this.carrito=this.usuarioStorage.carrito;
  }else{
    this.carrito = [];
  }
  this.carrito.forEach((item)=>{this.precioTotalPedido=+item.precioTotal});
  this.descuento="10%"
  this.resultadoPrecio=this.precioTotalPedido-(this.precioTotalPedido*0.1)
  }
  async comprar(){
    const body={
      
      email:this.usuarioStorage.email
    }

    this.http.post("https://bookserver-6e5c8a077822.herokuapp.com/usuario/moverCarritoACompras", body).subscribe(async (data: any) => {
      if(data){
      //console.log(data)
      this.usuarioService.setUsuario(data.usuario);
      
      //console.log()
      this.usuarioService.guardarToken(data.token);
      
      
      
    
    this.usuarioStorage = await this.storage.get('usuario');
    console.log("Comprar carrrito despues del token: "+this.usuarioStorage.carrito[0])}});
    
    
  }

  async eliminarCarrito(favorito:any){
    const body={
      
      email:this.usuarioStorage.email
    }

    this.http.post("https://bookserver-6e5c8a077822.herokuapp.com/usuario/eliminarDelCarrito", body).subscribe(async (data: any) => {
      if(data){
      //console.log(data)
      this.usuarioService.setUsuario(data.usuario);
      
      //console.log()
      this.usuarioService.guardarToken(data.token);
      this.usuarioStorage = await this.storage.get('usuario');
      
      
    
    this.usuarioStorage = await this.storage.get('usuario');
    console.log("Ddespues de eliminar del carrito: "+this.usuarioStorage.carrito[0])}});
    
    
  }

}
