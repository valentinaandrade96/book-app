import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticulosService } from 'src/app/servicios/articulo.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.page.html',
  styleUrls: ['./crear-articulo.page.scss'],
})
export class CrearArticuloPage implements OnInit {
  public form: any = {
    ISBN: '',
    titulo: '',
    precio_compra: null,
    precio_venta: null,
    categoria: '',
    descripcion: '',
    autor: '',
    proveedor: '',
    telefonoProveedor: '',
    img: '',
    stock: null,
  };
  constructor(private articulosService: ArticulosService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  async crearArticulo(form: any) {
    // Lógica para crear el artículo utilizando el servicio
    this.articulosService.create(form).subscribe(
      (response) => {
        // Verificar si la respuesta es exitosa
        if (response && response.titulo) {
          // Navegar a la página de detalles del artículo recién creado
         // this.navCtrl.navigateForward(['/detalles-articulo', response.titulo]);
        }else{
         
        }
      },
      (error) => {
        // Manejar errores aquí
      }
    );
}
}
