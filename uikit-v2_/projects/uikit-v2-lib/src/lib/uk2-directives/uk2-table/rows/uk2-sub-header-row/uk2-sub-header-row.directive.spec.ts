import { ElementRef } from '@angular/core';
import { Uk2SubHeaderRowDirective } from './uk2-sub-header-row.directive';

describe('Uk2SubHeaderRowDirective', () => {
  it('should create an instance', () => {
    const htmlElement = new ElementRef(document.createElement('mat-row'));
    const directive = new Uk2SubHeaderRowDirective(htmlElement);
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-sub-header-row');
  });
});
