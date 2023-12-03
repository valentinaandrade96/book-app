import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Articulo, Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-detalles-admin',
  templateUrl: './detalles-admin.page.html',
  styleUrls: ['./detalles-admin.page.scss'],
})
export class DetallesAdminPage implements OnInit {
  isEditMode = false;
  usuarioStorage: Usuario;
  libro: Articulo = null;
  cantidad: number = 1;
  ISBN: string = '';
  titulo: string = '';
  precio_compra: Number = 0;
  precio_venta: Number = 0;
  categoria: string = '';
  descripcion: string = '';
  autor: string = '';
  proveedor: string = '';
  telefonoProveedor: string = '';
  img: string = '';
  stock: number = 0;
  articulo: Articulo;
tituloBueno:string;
  constructor(private route: ActivatedRoute,
    private router: Router,
              private navCtrl: NavController,
              private usuarioService: UsuarioService,
              private http: HttpClient,
              private storage: Storage) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.tituloBueno=params['id']
        console.log("this.tituloBueno"+ this.tituloBueno)
      }
    });
  }
  ngOnInit() {
    this.obtenerDetallesLibro(this.tituloBueno);
  }

  asignarValoresDeArticulo() {
    if (this.libro) {
      this.articulo = {
        ISBN: this.ISBN || this.libro.ISBN,
        titulo: this.titulo || this.libro.titulo,
        precio_compra: this.precio_compra || this.libro.precio_compra,
        precio_venta: this.precio_venta || this.libro.precio_venta,
        categoria: this.categoria || this.libro.categoria,
        descripcion: this.descripcion || this.libro.descripcion,
        autor: this.autor || this.libro.autor,
        proveedor: this.proveedor || this.libro.proveedor,
        telefonoProveedor: this.telefonoProveedor || this.libro.telefonoProveedor,
        img: this.img || this.libro.img,
        stock: this.stock || this.libro.stock
      };
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  async obtenerDetallesLibro(titulo: string) {
    this.usuarioStorage = await this.storage.get('usuario');
    this.usuarioService.obtenerDetallesLibro(titulo).subscribe(
      (response) => {
        if (response.ok) {
          this.libro = response.libro;
          this.asignarValoresDeArticulo(); // Llama a asignarValoresDeArticulo aquí
        } else {
          console.log('Libro no encontrado');
        }
      },
      (error) => {
        console.error('Error al buscar el libro:', error);
      }
    );
  }
  guardarCambios() {
    this.asignarValoresDeArticulo(); 
    console.log("guardarCambios"+this.articulo.titulo)
   
    this.http.post("https://bookserver-6e5c8a077822.herokuapp.com/articulo/update", this.articulo).subscribe(async (data: any) => {
console.log(data)
    if(data.ok==true){
       alert("Se ha actualizado correctamente el artículo.");
       this.router.navigateByUrl('/libros')
       this.obtenerDetallesLibro(this.titulo);
       
    }else{
      alert("No se ha podido actualizar el el artículo")
    }
    });


  }

  deleteLibro(){
    this.http.delete("https://bookserver-6e5c8a077822.herokuapp.com/articulo/delete/"+ this.articulo.titulo).subscribe(async (data: any) => {
      const confirmacion = confirm("¿Seguro que quieres borrar este libro?")
     if(confirmacion) {
    if(data.success==true){

        alert("Se ha borrado correctamente el artículo.");
        this.router.navigateByUrl('/libros')
        
        
     }else{
      alert("No se ha podido borrar el artículo")
     }}

    });
  }
}
