import { ElementRef } from '@angular/core';
import { Uk2NumericCellDirective } from './uk2-numeric-cell.directive';

describe('Uk2NumericCellDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-cell'));
    const directive = new Uk2NumericCellDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-numeric-cell');
  });
});
