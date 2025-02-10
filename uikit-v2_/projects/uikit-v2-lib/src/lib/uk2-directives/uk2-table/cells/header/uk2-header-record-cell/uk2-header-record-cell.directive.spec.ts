import { ElementRef } from '@angular/core';
import { Uk2HeaderRecordCellDirective } from './uk2-header-record-cell.directive';

describe('Uk2HeaderRecordCellDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-header-cell'));
    const directive = new Uk2HeaderRecordCellDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-header-record-cell');
  });
});
