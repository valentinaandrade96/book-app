import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BookDetailsComponent } from 'src/app/componentes/book-details/book-details.component';
import { Item } from 'src/app/interfaces/product';
import { SearchPipe } from 'src/app/pipes/filter.pipes';
import { ModalController } from '@ionic/angular';

import { booksService } from 'src/app/servicios/books-service';



@Component({
  selector: 'page-searcher',
  templateUrl: 'searcher.html',
  providers: [SearchPipe]
})
export class SearcherPage implements OnInit {
 
  [x: string]: any;
  public libros: Item[] = [];
  public item: Item;
  public maxDatos: number = 0;
  public idQueComprar: String[]=[];
  public librosEnVenta: any[]=[]
  public librosEnVen: Item[]=[]
  tabBarElement: any;
  public busqueda:string='';
  public campo:string='authors';
  public showMessage: boolean = false;
public mensaje:String=""
 

/*
  prodList:  Array<orderByDistance> = [];
  generalList:Array<Product> = [];
  FilterList:Array<Product> = [];
  */
 
  
  cat = '';
  checkItems = '';

  constructor(private bookService:booksService,private modalController: ModalController) {
                this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
  cambiaTexto(event:any){
    this.busqueda = event.target.value;
  }
  async ngOnInit() {
    
    let libros = await this.bookService.getBooks();
    this.maxDatos = libros.totalItems;
    this.libros.push(...libros.items);
    
    this.librosEnVen=this.libros.filter((x:Item)=>{
      return x.saleInfo.listPrice!=null;
    })
    this.librosEnVen.concat(this.librosEnVen)
   this.librosEnVenta=this.librosEnVen
    this.librosEnVenta.forEach((libro) => {
      libro.isVisible = false;
    
    });


  }

    
    
     
  }
/*
    this.bookService.librosEnVenta.subscribe(data=>{
      console.log('Desde cart.ts, precio del carrito')
      this.libros=data;
      console.log(this.libros);
    })
    console.log(this.libros);
*/

  
  

  
  /*

  ionViewWillLeave() {
    this.initializeItems();
    this.tabBarElement.style.display = 'flex';
  }

  initializeItems(): void {

    this.prodList.forEach(element => {
      
        this.generalList.push(element.prod)
    });

    this.igualarArrays();
  }

  igualarArrays(){
    this.FilterList = this.generalList;
  }

  getItems(searchbar) {
  
    // set q to the value of the searchbar
    var q = searchbar.target.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      this.igualarArrays();
      return;
    }

    this.FilterList = this.FilterList.filter((v) => {
      if(v.titulo && q) {
        if (v.titulo.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  getItemsAutor(searchbar) {
  
    // set q to the value of the searchbar
    var q = searchbar.target.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      this.igualarArrays();
      return;
    }

    this.FilterList = this.FilterList.filter((v) => {
      if(v.autor && q) {
        if (v.autor.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  optionsFn(){
    var q = this.cat;

    this.FilterList = this.FilterList.filter((v) => {
      if(v.categoria && q) {
        if (v.categoria.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  check(){
    if (this.FilterList.length < 0){
      this.initializeItems();
      console.log('vacio')
    }

    this.FilterList = this.FilterList.filter((v) => {
      if(v.accion && this.checkItems) {
        if (v.accion.toLowerCase().indexOf(this.checkItems.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  buscar(){
    this.FilterList.forEach(element => {
      console.log(element.descripcion)
    });  
  }

  clear(){
    this.igualarArrays();
  }
  */
