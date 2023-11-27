import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Item } from 'src/app/interfaces/product';

@Pipe({
  name: 'bookFilter'
})
@Injectable()
export class SearchPipe implements PipeTransform {
  transform(arreglo: Item[], args: string): any {
    if (!args ||args=='') {
      return arreglo;
    }
    return arreglo.filter((item) => {
      
        return item.volumeInfo.authors[0].toLowerCase().includes(args.toLowerCase()) || item.volumeInfo.title.toLowerCase().includes(args.toLowerCase())
        
      
        return ;
      }
      // return item.volumeInfo.authors[0].toLowerCase().includes(args.toLowerCase())||item.volumeInfo.title.toLowerCase().includes(args.toLowerCase());
    );
  }


  
}