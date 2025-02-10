import { ElementRef } from '@angular/core';
import { Uk2InlineActionsCellDirective } from './uk2-inline-actions-cell.directive';

describe('Uk2InlineActionsCellDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-cell'));
    const directive = new Uk2InlineActionsCellDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-inline-actions-cell');
  });
});
