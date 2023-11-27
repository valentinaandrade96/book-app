import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Item } from 'src/app/interfaces/product';
import { Personajes } from '../../interfaces/personajes';
import { booksService } from '../../servicios/books-service';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BookDetailsComponent } from 'src/app/componentes/book-details/book-details.component';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.page.html',
  styleUrls: ['./infinite-scroll.page.scss'],
})
export class InfiniteScrollPage implements OnInit {

  @Input() id:string='';
  @ViewChild('infiniteScroll') infinito: IonInfiniteScroll;

  public libros: Item[] = [];
  public item: Item;
  public maxDatos: number = 0;
  public idQueComprar: any[]=[];
  public librosEnVenta: Item[]=[]
  public librosEnVen: Item[]=[]
  public librosQueComprar: Item[]=[]
  public librosQueDesear: Item[]=[]
  public carrito: number=0;
  public contador: number=0;
  public idDeseos: String[]=[];
  public categoria: String[]=[];

  constructor(private booksService: booksService,
    private navCtrl: NavController,private storage: Storage,private modalController: ModalController, private router: Router, private usuarioService: UsuarioService) { }

  async ngOnInit() {
    this.storage.create();
   
    







    
    let libros = await this.booksService.getBooks();
    this.maxDatos = libros.totalItems;
    this.libros.push(...libros.items);
   
    this.librosEnVen=this.libros.filter((x:Item)=>{
      return x.saleInfo.listPrice!=null;
    })
    this.librosEnVenta=this.librosEnVen.concat(this.librosEnVen)
    this.booksService.librosEnVenta.emit(this.librosQueComprar);
   
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

  async Comprar(id: String) {
    this.idQueComprar.push(id);
    
    this.librosQueComprar.push(...this.librosEnVenta.filter((item: Item) => {
        return item.id === id;
    }));
    
    this.carrito+=this.librosQueComprar[this.contador].saleInfo.listPrice.amount
    console.log(this.librosQueComprar);
    this.booksService.emiteMeteEnCarrito.emit(this.librosQueComprar);
    this.contador ++;
    this.booksService.totalCarrito.emit(this.carrito);
  }

  async Desear(id: String) {
    this.idDeseos.push(id);
    
    this.librosQueDesear.push(...this.librosEnVenta.filter((item: Item) => {
        return item.id === id;
    }));
    
    
    console.log(this.librosQueDesear);
    this.booksService.emiteDeseos.emit(this.librosQueDesear);
    
  }
  
  async showShoppingCart(carrito) {
    /*
    const modal = await this.modalController.create({
      component: ShoppingCartComponentComponent,
      componentProps: {
        carritoCompra: this.librosQueComprar,
        carritoCesta: this.carrito
      }

    });
    modal.onDidDismiss().then(() => {
      this.router.navigate(['/cart']);
    });
    return await modal.present();
    */
  }

  async showBookDetails(item){

    const modal = await this.modalController.create({
      component: BookDetailsComponent,
      componentProps: {
        libroPulsado: item 
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data) {
       
        const id = data.data;
        this.idQueComprar.push(id);
    
        this.librosQueComprar.push(this.librosEnVenta.find((item: Item) => {
            return item.id === id;
        }));
        
        
        this.carrito+=this.librosQueComprar[this.contador].saleInfo.listPrice.amount
        
        this.booksService.emiteMeteEnCarrito.emit(this.librosQueComprar);
        this.contador ++;
        this.booksService.totalCarrito.emit(this.carrito);

      }
    });
  
    return await modal.present();
  }
}