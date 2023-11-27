import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Componente } from '../../interfaces/componente';
import {LoginPage} from '../login/login.page'
import { Item } from 'src/app/interfaces/product';

import { booksService } from '../../servicios/books-service';
import { IonInfiniteScroll } from '@ionic/angular';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild('infiniteScroll') infinito: IonInfiniteScroll;
  public componentes: Componente[] = [
    
    {
      nombre: 'Books',
      ruta: '/infinite-scroll',
      color: 'medium',
      icono:'infinite-outline'
    },
    {
      nombre: 'shopping cart',
      ruta: '/cart',
      color: 'dark',
      icono:'refresh-outline'
    },
    {
      nombre: 'Buscar',
      ruta: '/search',
      color: 'primary',
      icono:'search-outline'

    },
    {
      nombre: 'Log out',
      ruta: '/button',
      color: 'sucess',
      icono:'radio-button-on-outline'
    }
  ];

 public loginPage=LoginPage;
 
  constructor(private route: ActivatedRoute, private booksService: booksService, private usuarioService: UsuarioService) {
    
   
   }
   public librosGratis: Item[]=[]
public nombre:string;
public librosEnVenta: Item[]=[]
public libros: Item[] = [];
public maxDatos: number = 0;
  async ngOnInit() {

    
    this.route.queryParams.subscribe(params => {
      this.nombre=params.name;
      console.log(params.name);
    });
    let libros = await this.booksService.getBooks();
    this.maxDatos = libros.totalItems;
    this.libros.push(...libros.items);
   
    this.librosEnVenta=this.libros.filter((x:Item)=>{
      return x.saleInfo.listPrice!=null;
    })
    this.librosGratis=this.libros.filter((x:Item)=>{
      return x.accessInfo.pdf.acsTokenLink!=null;
    })
    
}
async loadData() {
  if(this.libros.length >= this.maxDatos) {
    this.infinito.complete();
    this.infinito.disabled;
    return;
  }
  let libros = await this.booksService.getBooks();
  this.maxDatos = libros.totalItems;
  
  
  this.libros.push(...libros.items);
  this.librosEnVenta=this.libros.filter((x:Item)=>{
    return x.saleInfo.listPrice!=null;
  })
 
  this.infinito.complete();

}


}
