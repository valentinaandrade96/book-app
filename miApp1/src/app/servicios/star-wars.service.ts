import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Datos } from '../interfaces/personajes';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  constructor(private http: HttpClient) { }
  public url: string = environment.urlDatos;
  public numPagina: number = 1;

  getPersonajes() {
    return new Promise<Datos>((resolve, reject) => {
      this.http.get<Datos>(`${this.url}/?page=${this.numPagina}`).subscribe({
        next: (datos) => {
          resolve(datos);
          this.numPagina++;
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        }
      });
    });

  }

}

