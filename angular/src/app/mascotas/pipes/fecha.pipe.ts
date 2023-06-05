import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
})
export class FechaPipe implements PipeTransform {
  transform(value: String): string {
    const aux: string[] = value.split('-');
    let texto = `${aux[2]}-${aux[1]}-${aux[0]}`;
    return texto.toString();
  }
}
