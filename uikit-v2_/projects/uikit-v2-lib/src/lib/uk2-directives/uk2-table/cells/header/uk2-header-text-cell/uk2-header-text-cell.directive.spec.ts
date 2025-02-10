import { ElementRef } from '@angular/core';
import { Uk2HeaderTextCellDirective } from './uk2-header-text-cell.directive';

describe('Uk2HeaderTextCellDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-header-cell'));
    const directive = new Uk2HeaderTextCellDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-header-text-cell');
  });
});
