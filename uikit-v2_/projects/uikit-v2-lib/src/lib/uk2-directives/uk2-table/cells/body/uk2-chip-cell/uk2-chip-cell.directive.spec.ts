import { ElementRef } from '@angular/core';
import { Uk2ChipCellDirective } from './uk2-chip-cell.directive';

describe('Uk2ChipCellDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-cell'));
    const directive = new Uk2ChipCellDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-chip-cell');
  });
});
