import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Articulo, Usuario } from '../interfaces/interfaces';


@Pipe({
  name: 'bookFilter'
})
@Injectable()
export class SearchPipe implements PipeTransform {
  transform(items: any[], filtro: string): any {
    if (!items) return [];
    if (!filtro) return items;

    filtro = filtro.toLowerCase();

    if (items.length > 0 && "ISBN" in items[0]) {
      // Filtrar Articulos
      return items.filter((item: Articulo) => {
        return item.titulo.toLowerCase().includes(filtro) || 
               item.autor.toLowerCase().includes(filtro);
      });
    } else if (items.length > 0 && "email" in items[0]) {
      // Filtrar Usuarios
      return items.filter((usuario: Usuario) => {
        return usuario.nombre.toLowerCase().includes(filtro) ||
               usuario.email.toLowerCase().includes(filtro);
      });
    }

    return items; // Si no se reconoce el tipo, devuelve la lista original
  }


  
}