import { ElementRef } from '@angular/core';
import { Uk2HeaderNumericCellDirective } from './uk2-header-numeric-cell.directive';

describe('Uk2HeaderNumericCellDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-header-cell'));
    const directive = new Uk2HeaderNumericCellDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-header-numeric-cell');
  });
});
