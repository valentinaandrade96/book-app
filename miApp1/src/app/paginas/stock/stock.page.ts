import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {
libros:Articulo[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerLibros();
  }

  obtenerLibros(){
    this.http.get("https://bookserver-6e5c8a077822.herokuapp.com/articulo/get").subscribe((data: any) => {
      if(data.articulos){
        this.libros=data.articulos;
      }
    });

  }
}
