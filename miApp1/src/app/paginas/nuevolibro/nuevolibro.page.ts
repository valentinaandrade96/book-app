import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-nuevolibro',
  templateUrl: './nuevolibro.page.html',
  styleUrls: ['./nuevolibro.page.scss'],
})
export class NuevolibroPage implements OnInit {
 
  articuloForm: FormGroup;
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router,) {
    
  }
 
  

  ngOnInit() {
    this.articuloForm = this.formBuilder.group({
      ISBN: ['', Validators.required],
      titulo: ['', Validators.required],
      precio_compra: [0, [Validators.required, Validators.min(0)]],
      precio_venta: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      autor: ['', Validators.required],
      proveedor: ['', Validators.required],
      telefonoProveedor: ['', Validators.required],
      img: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }
  articulo:Articulo;
  crearArticulo() {
   
    if (this.articuloForm.valid) {
      this.articulo = {
        ISBN: this.articuloForm.value.ISBN ,
        titulo: this.articuloForm.value.titulo ,
        precio_compra: this.articuloForm.value.precio_compra ,
        precio_venta: this.articuloForm.value.precio_venta ,
        categoria: this.articuloForm.value.categoria ,
        descripcion: this.articuloForm.value.descripcion ,
        autor: this.articuloForm.value.autor ,
        proveedor: this.articuloForm.value.proveedor ,
        telefonoProveedor: this.articuloForm.value.telefonoProveedor ,
        img: this.articuloForm.value.img ,
        stock: this.articuloForm.value.stock 
      };
    this.http.post("https://bookserver-6e5c8a077822.herokuapp.com/articulo/post", this.articulo).subscribe((data: any) => {
      console.log(data)
      
      if(data.status == 'Ok'){
        alert("Articulo correctamente registrado.");
        this.router.navigateByUrl('/libros')
      }
    });
  }else{
    alert('Formulario no válido');
  }
  }
}
