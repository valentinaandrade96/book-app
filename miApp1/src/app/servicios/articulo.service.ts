import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
//import { Articulo, RespuestaArticulo, RespuestaCrearArticulo } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Router } from 'express';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Articulo, RespuestaGetArticulos, RespuestaGetUsers, RespuestaUpdateArtticulo } from '../interfaces/interfaces';

//const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  public url: string;


  constructor(private _http:HttpClient, private _router: Router,private storage: Storage, private navCrtl: NavController){
    
    this.url=environment.urlArticulo;
    
    //const store = new Storage();
  
    this.storage.create();
  
}

obtenerTodosLosArticulos(): Observable<RespuestaGetArticulos> {
  return this._http.get<RespuestaGetArticulos>(this.url + "get");
}

create(form:any): Observable<any>{
           
    
  return this._http.post(this.url+'post',{
    ISBN:form.ISBN,
    titulo: form.titulo   ,
    precio_compra:  form.precio_compra   ,
    precio_venta:  form.precio_venta   ,
    categoria:  form.categoria   ,
    descripcion: form.descripcion   ,
    autor:  form.autor,
    proveedor:  form.proveedor,
    telefonoProveedor: form.telefonoProveedor   ,
    img:  form.img   ,
    stock: form.stock 
 
  });

}

async update( articulo:Articulo): Promise<Observable<RespuestaUpdateArtticulo>>{
           
 
  
 const response = this._http.post<RespuestaUpdateArtticulo>(this.url + 'update',articulo);
  return Promise.resolve(response);
  
}


obtenerLibroPorTítulo(): Observable<RespuestaGetArticulos> {
  return this._http.get<RespuestaGetArticulos>(this.url + "getLibroPorTitulo");
}






}