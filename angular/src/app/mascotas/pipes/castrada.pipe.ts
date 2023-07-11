import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'castrada',
})
export class CastradaPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return 'Si';
    return 'No';
  }
}
