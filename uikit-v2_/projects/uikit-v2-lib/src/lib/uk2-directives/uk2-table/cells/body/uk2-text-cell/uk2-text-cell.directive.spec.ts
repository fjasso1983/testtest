import { ElementRef } from '@angular/core';
import { Uk2TextCellDirective } from './uk2-text-cell.directive';

describe('Uk2TextCellDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-cell'));
    const directive = new Uk2TextCellDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-text-cell');
  });
});
