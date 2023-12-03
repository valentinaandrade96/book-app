import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
})
export class LibrosPage implements OnInit {
  libros: any[] = [];
  pageNumber: number = 1;
  public busqueda:string='';
  usuarioStorage: Usuario;
  constructor(private http: HttpClient,private navCtrl: NavController,private storage: Storage) {
    
  }

  ngOnInit() {
    this.loadBooks();
    this.userSto();
  }
  async userSto(){
    this.usuarioStorage = await this.storage.get('usuario');
  }
  cambiaTexto(event:any){
    this.busqueda = event.target.value;
  }
  esAdmin(): boolean {
    return this.usuarioStorage && this.usuarioStorage.rol === 'admin';
  }

  loadBooks() {
    // Llama a tu servidor para obtener la lista de libros
    this.http.get('https://bookserver-6e5c8a077822.herokuapp.com/articulo/get').subscribe((data: any) => {
      this.libros = data.articulos;
    });
  }

  loadMoreBooks(event) {
    // Carga más libros cuando el usuario desplaza hacia abajo
    this.pageNumber++;
    // Llama a tu servidor para obtener más libros y agrega a this.libros
    this.http.get("https://bookserver-6e5c8a077822.herokuapp.com/articulo/get").subscribe((data: any) => {
      this.libros.push(...data.articulos);
      event.target.complete();
    });
  }
  verDetalles(libro) {
    if(!this.esAdmin()){
    this.navCtrl.navigateForward(`/libros/detalles/${libro.titulo}`);
  }else{
    this.navCtrl.navigateForward(`/libros/detalleadmin/${libro.titulo}`);
  }
  }
}
