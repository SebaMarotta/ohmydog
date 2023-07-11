import { AbstractControl, ValidationErrors } from '@angular/forms';
import { auto } from '@popperjs/core';

export function fechaValidator(
  control: AbstractControl
): ValidationErrors | null {
  const dateRegex = /^(\d{2})\/(\d{2})$/;
  const value = control.value as string;

  if (!dateRegex.test(value)) {
    return {
      customDate: {
        valid: false,
        message: 'Formato de fecha inválido. Debe ser mm/yy',
      },
    };
  }

  const [month, year] = value.split('/').map(Number);
  const maxMonth = 12;
  const aux = new Date(Date.now());
  const minYear = (Number)(aux.getFullYear().toString().substring(2,5));


  if (month > maxMonth) {
    return {
      customDate: { valid: false, message: 'El mes no puede ser mayor a 12' },
    };
  }

  if (month < 1) {
    return {
      customDate: { valid: false, message: 'El mes no puede ser menor a 1' },
    };
  }

  if (year < minYear) {
    return {
      customDate: { valid: false, message: 'El año no puede ser menor al actual' },
    };
  }

  // Los meses van del 0 al 11, por eso el +1
  if (month < aux.getMonth() + 1 && year == minYear) {
    return {
      customDate: {
        valid: false,
        message: 'Se está colocando un mes anterior al actual',
      },
    };
  }
  // Los dias van del 0 al 30, por eso el +1

  return null;
}
