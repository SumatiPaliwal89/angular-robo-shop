import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryToPartType'
})
export class CategoryToPartTypePipe implements PipeTransform {

  transform(category: string): string {
    return category[0].toUpperCase() + category.slice(1,-1);
  }

}
