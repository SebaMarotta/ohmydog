import { AbstractControl, ValidationErrors } from '@angular/forms';

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

  if (year > maxYear) {
    return {
      customDate: {
        valid: false,
        message: 'El año no puede ser mayor al actual',
      },
    };
  }


  return null;
}
