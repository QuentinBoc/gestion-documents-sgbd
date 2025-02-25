import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'alphabeticalSort'
})

export class AlphabeticalSortPipe implements PipeTransform {
  transform(array: any[]): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    return array.sort((a, b) => {
      const nameA = a.parentName.toLowerCase() || '';
      const nameB = b.parentName.toLowerCase() || '';

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
}
