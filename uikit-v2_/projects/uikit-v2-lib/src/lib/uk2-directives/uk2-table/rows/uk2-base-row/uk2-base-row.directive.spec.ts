import { ElementRef } from '@angular/core';
import { Uk2BaseRowDirective } from './uk2-base-row.directive';

const rowMockClass = 'uk2-mock-row';

class Uk2MockRowDirective extends Uk2BaseRowDirective {
  constructor(protected elementRef: ElementRef<HTMLElement>) {
    super(elementRef, rowMockClass);
  }
}

describe('Uk2BaseRowDirective', () => {
  let directive: Uk2BaseRowDirective;
  let htmlElement: ElementRef<HTMLElement>;

  beforeEach(() => {
    htmlElement = new ElementRef(document.createElement('mat-row'));
    directive = new Uk2MockRowDirective(htmlElement);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe(rowMockClass);
  });

  it('should add css directive class when ngAfterViewInit is called', () => {
    directive.ngAfterViewInit();
    expect(htmlElement.nativeElement.classList.contains(rowMockClass)).toBeTrue();
  });
});
