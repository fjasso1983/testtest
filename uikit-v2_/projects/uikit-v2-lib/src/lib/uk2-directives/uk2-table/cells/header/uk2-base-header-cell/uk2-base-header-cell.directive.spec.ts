import { ElementRef } from '@angular/core';
import { Uk2BaseHeaderCellDirective } from './uk2-base-header-cell.directive';

const headerCellMockClass = 'uk2-header-mock-cell';

class Uk2HeaderMockCellDirective extends Uk2BaseHeaderCellDirective {
  constructor(protected elementRef: ElementRef<HTMLElement>) {
    super(elementRef, headerCellMockClass);
  }
}

describe('Uk2BaseHeaderCellDirective', () => {
  let directive: Uk2HeaderMockCellDirective;
  let htmlElement: ElementRef<HTMLElement>;

  beforeEach(() => {
    htmlElement = new ElementRef(document.createElement('mat-header-cell'));
    directive = new Uk2HeaderMockCellDirective(htmlElement);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe(headerCellMockClass);
  });

  it('should add css directive class when ngAfterViewInit is called', () => {
    directive.ngAfterViewInit();
    expect(htmlElement.nativeElement.classList.contains(headerCellMockClass)).toBeTrue();
  });

  it('should add css directive class for pressed state when uk2IsPressed is set to true', () => {
    directive.uk2IsPressed = true;
    expect(htmlElement.nativeElement.classList.contains(headerCellMockClass + '-pressed')).toBeTrue();
  });

  it('should remove css directive class for pressed state when uk2IsPressed is set to false', () => {
    htmlElement.nativeElement.classList.add(headerCellMockClass + '-pressed');
    directive.uk2IsPressed = false;
    expect(htmlElement.nativeElement.classList.contains(headerCellMockClass + '-pressed')).toBeFalse();
  });
});
