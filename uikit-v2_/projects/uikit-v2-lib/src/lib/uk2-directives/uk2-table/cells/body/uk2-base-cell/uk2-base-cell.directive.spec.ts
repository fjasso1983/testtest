import { ElementRef } from '@angular/core';
import { Uk2BaseCellDirective } from './uk2-base-base-cell.directive';

const cellMockClass = 'uk2-mock-cell';

class Uk2MockCellDirective extends Uk2BaseCellDirective {
  constructor(protected elementRef: ElementRef<HTMLElement>) {
    super(elementRef, cellMockClass);
  }
}

describe('Uk2BaseCellDirective', () => {
  let directive: Uk2MockCellDirective;
  let htmlElement: ElementRef<HTMLElement>;

  beforeEach(() => {
    htmlElement = new ElementRef(document.createElement('mat-cell'));
    directive = new Uk2MockCellDirective(htmlElement);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe(cellMockClass);
  });

  it('should add css directive class when ngAfterViewInit is called', () => {
    directive.ngAfterViewInit();
    expect(htmlElement.nativeElement.classList.contains(cellMockClass)).toBeTrue();
  });
});
