import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Componente } from '../interfaces/componente';

@Injectable({
  providedIn: 'root'
})
export class ComponentesService {

  constructor(private http: HttpClient) { }

  getComponentes() {
    return new Promise<Componente[]>((resolve, reject) => {
      let url: string = "assets/componentes.json";

      this.http.get<Componente[]>(url).subscribe({
        next: (datos) => {
          resolve(datos);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        }
      })
    });

  }
}
