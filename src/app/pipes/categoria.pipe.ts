import { Pipe, PipeTransform } from '@angular/core';
import { CategoriaI } from '../interfaces/categoria';

@Pipe({
  name: 'categoria'
})
export class CategoriaPipe implements PipeTransform {

  transform(value: CategoriaI[], arg: number): unknown {
    const resultCat = [];
    for(const categoria of value){
      if(categoria.cmov_tipo == arg){
        resultCat.push(categoria)
      }
    }
    return resultCat;
  }

}
