import { ElementRef } from '@angular/core';
import { Uk2BulkActionCellDirective } from './uk2-bulk-action-cell.directive';

describe('Uk2BulkActionCellDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-cell'));
    const directive = new Uk2BulkActionCellDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-bulk-action-cell');
  });
});
