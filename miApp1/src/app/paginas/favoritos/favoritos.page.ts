import { Component, OnInit } from '@angular/core';
import { Compra, Usuario } from 'src/app/interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  usuarioStorage: Usuario;
  favoritos: Compra[]=[]
  constructor(private storage: Storage,private http: HttpClient,private usuarioService: UsuarioService,private router: Router) { }

  ngOnInit() {
    this.cargarUser();
     
  }


  async cargarUser(){
    await this.storage.create();
    this.usuarioStorage = await this.storage.get('usuario');
    if(this.usuarioStorage){
    this.favoritos=this.usuarioStorage.favoritos;
  }else{
    this.favoritos = [];
  }
  }
  async cargarUserAfter(){
    
    this.usuarioStorage = await this.storage.get('usuario');
    if(this.usuarioStorage){
    this.favoritos=this.usuarioStorage.favoritos;
  }else{
    this.favoritos = [];
  }
  this.router.navigateByUrl('/favoritos');
  }
  async agregarAlCarrito(favorito:any){
    const body={
      titulo: favorito.titulo,
      email:this.usuarioStorage.email
    }
    

    this.http.post("https://bookserver-6e5c8a077822.herokuapp.com/usuario/agregarCarrito", body).subscribe(async (data: any) => {
      console.log("data"+data)
      if(data){
      //console.log(data)
      this.usuarioService.setUsuario(data.usuario);
      
      //console.log()
      this.usuarioService.guardarToken(data.token);
      this.usuarioStorage = await this.storage.get('usuario');
      const newfav={
        titulo: favorito.titulo,
        email:this.usuarioStorage.email
      }
      
    this.http.post("https://bookserver-6e5c8a077822.herokuapp.com/usuario/eliminarDeFavoritos", newfav).subscribe(async (data: any) => {
      console.log("lerelere"+ data.usuario)
      this.usuarioService.setUsuario(data.usuario);
      console.log(data+ "data")
      console.log(data.token+ "data.token")
      console.log("dataToken"+data.token)
      this.usuarioService.guardarToken(data.token);
      this.usuarioStorage=data.usuario;
      await this.storage.set('usuario', this.usuarioStorage);
      // Actualiza la lista de favoritos en el estado local
      this.favoritos = this.usuarioStorage.favoritos;
      //this.cargarUserAfter()
    });
    this.usuarioStorage = await this.storage.get('usuario');
    console.log(this.usuarioStorage.favoritos[0])}});


    
  }


async verificaSiCarrito(favorito:any){
  const yaEstaEnCarrito = this.usuarioStorage.carrito.some(item => item.titulo === favorito.titulo);
  if (yaEstaEnCarrito) {
    if (confirm("Ya tienes este artículo en el carrito. ¿Quieres volver a meterlo?")) {
      this.agregarAlCarrito(favorito) // Si el usuario acepta, agrega el artículo
    }
  } else {
    this.agregarAlCarrito(favorito) // Si no está en el carrito, simplemente lo agrega
  }

}

async eliminarDeFav(favorito:any){
const req={
  titulo: favorito.titulo,
  email:this.usuarioStorage.email
}
this.http.post("https://bookserver-6e5c8a077822.herokuapp.com/usuario/eliminarDeFavoritos", req).subscribe(async (data: any) => {
  console.log("lerelere"+ data.usuario)
  this.usuarioService.setUsuario(data.usuario);
  console.log(data+ "data")
  console.log(data.token+ "data.token")
  console.log("dataToken"+data.token)
  this.usuarioService.guardarToken(data.token);
  this.usuarioStorage=data.usuario;
  await this.storage.set('usuario', this.usuarioStorage);
  // Actualiza la lista de favoritos en el estado local
  this.favoritos = this.usuarioStorage.favoritos;
  //this.cargarUserAfter()
});




}
}
