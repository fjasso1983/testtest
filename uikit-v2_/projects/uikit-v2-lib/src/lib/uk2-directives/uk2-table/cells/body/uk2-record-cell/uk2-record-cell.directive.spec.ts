import { ElementRef } from '@angular/core';
import { Uk2RecordCellDirective } from './uk2-record-cell.directive';

describe('Uk2RecordCellDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-cell'));
    const directive = new Uk2RecordCellDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-record-cell');
  });
});
