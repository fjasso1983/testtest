import { ElementRef } from '@angular/core';
import { Uk2MenuCellDirective } from './uk2-menu-cell.directive';

describe('Uk2MenuCellDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-cell'));
    const directive = new Uk2MenuCellDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-menu-cell');
  });
});
