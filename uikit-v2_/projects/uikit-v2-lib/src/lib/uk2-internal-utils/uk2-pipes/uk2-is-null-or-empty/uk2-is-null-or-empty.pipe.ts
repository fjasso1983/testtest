import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uk2IsNullOrEmpty',
  standalone: true,
})
export class Uk2IsNullOrEmptyPipe implements PipeTransform {
  /**
   * checks given value and returns boolean if it is null, undefined or empty string
   * can be used for other primitive types as well.
   * @param value T
   * @returns boolean
   */
  transform<T>(value: T): boolean {
    return value === null || value === undefined || value === '';
  }
}
