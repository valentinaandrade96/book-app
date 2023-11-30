import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Articulo } from '../interfaces/interfaces';


@Pipe({
  name: 'bookFilter'
})
@Injectable()
export class SearchPipe implements PipeTransform {
  transform(arreglo: Articulo[], args: string): any {
    if (!args ||args=='') {
      return arreglo;
    }
    return arreglo.filter((item) => {
      
        return item.titulo.toLowerCase().includes(args.toLowerCase()) || item.autor.toLowerCase().includes(args.toLowerCase())
        
      
        return ;
      }
      // return item.volumeInfo.authors[0].toLowerCase().includes(args.toLowerCase())||item.volumeInfo.title.toLowerCase().includes(args.toLowerCase());
    );
  }


  
}