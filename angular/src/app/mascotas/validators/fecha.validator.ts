import { AbstractControl, ValidationErrors } from '@angular/forms';
import { auto } from '@popperjs/core';

export function fechaValidator(
  control: AbstractControl
): ValidationErrors | null {
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const value = control.value as string;

  if (!dateRegex.test(value)) {
    return {
      customDate: {
        valid: false,
        message: 'Formato de fecha inválido. Debe ser dd/MM/yyyy',
      },
    };
  }

  const [day, month, year] = value.split('/').map(Number);
  const maxDay = 31;
  const maxMonth = 12;
  const aux = new Date(Date.now());
  const maxYear = aux.getFullYear();

  if (day > maxDay) {
    return {
      customDate: { valid: false, message: 'El día no puede ser mayor a 31' },
    };
  }

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

  if (day < 1) {
    return {
      customDate: { valid: false, message: 'El dia no puede ser menor a 1' },
    };
  }

  if (year > maxYear) {
    return {
      customDate: {
        valid: false,
        message: 'Se está colocando un año posterior al actual',
      },
    };
  }
  // Los meses van del 0 al 11, por eso el +1
  if (month > aux.getMonth() + 1 && year == maxYear) {
    return {
      customDate: {
        valid: false,
        message: 'Se está colocando un mes posterior al actual',
      },
    };
  }
  // Los dias van del 0 al 30, por eso el +1
  if (month == aux.getMonth() + 1 && year == maxYear && day > aux.getDate()) {
    return {
      customDate: {
        valid: false,
        message: 'Se está colocando un dia posterior al actual',
      },
    };
  }
  if (year < 1980) {
    return {
      customDate: {
        valid: false,
        message: 'El año no puede ser menor a 1980',
      },
    };
  }

  return null;
}
