import { ElementRef } from '@angular/core';
import { Uk2HeaderBulkActionCellDirective } from './uk2-header-bulk-action-cell.directive';

describe('Uk2HeaderBulkActionCellDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-header-cell'));
    const directive = new Uk2HeaderBulkActionCellDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-header-bulk-action-cell');
  });
});
