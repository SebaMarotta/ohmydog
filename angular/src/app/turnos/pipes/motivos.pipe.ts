import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'motivoPipe' })
export class MotivosPipe implements PipeTransform {
  transform(value: string): string {
    if (value.toString().includes('_')) {
      const aux: string[] = value.split('_');
      let texto = '';
      aux.forEach((resp) => {
        texto = texto.concat(`${resp} `);
      });
      return texto;
    }
    return value.toString();

  }
}
