import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cruza',
})
export class CruzaPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return 'Si';
    return 'No';
  }
}
