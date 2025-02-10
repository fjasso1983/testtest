import { ElementRef } from '@angular/core';
import { Uk2RowDirective } from './uk2-row.directive';

describe('Uk2RowDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-row'));
    const directive = new Uk2RowDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-row');
  });
});
