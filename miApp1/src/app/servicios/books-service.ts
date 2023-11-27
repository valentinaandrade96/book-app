import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Datos } from '../interfaces/personajes';
import { RootObject } from '../interfaces/product';
import { Item } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class booksService {
  public librosEnVenta:EventEmitter<Item[]>= new EventEmitter();
  public emiteMeteEnCarrito:EventEmitter<Item[]> = new EventEmitter();
  public totalCarrito:EventEmitter<number> = new EventEmitter();
  constructor(private http: HttpClient) { }
  public url: string = environment.urlDatos;
  public emiteDeseos:EventEmitter<Item[]>= new EventEmitter();

  getBooks() {
    return new Promise<RootObject>((resolve, reject) => {
      this.http.get<RootObject>(`${this.url}`).subscribe({
        next: (RootObject) => {
          resolve(RootObject);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        }
      });
    });

  }
  login(datos:any) {
    const urlBD= `${environment.urlUsuario}login`;
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(urlBD,datos).subscribe(resp=>{
        if(resp.status=='fail'){
        reject(new Error(resp.message));
        }
        resolve(resp.message);

        },err=>{
          reject(err);
        
      
      });
    });

  }


}

