import { ElementRef } from '@angular/core';
import { Uk2HeaderMenuCellDirective } from './uk2-header-menu-cell.directive';

describe('Uk2HeaderMenuCellDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-header-cell'));
    const directive = new Uk2HeaderMenuCellDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-header-menu-cell');
  });
});
