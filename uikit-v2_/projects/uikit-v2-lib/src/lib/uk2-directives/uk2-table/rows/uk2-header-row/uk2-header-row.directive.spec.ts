import { ElementRef } from '@angular/core';
import { Uk2HeaderRowDirective } from './uk2-header-row.directive';
import { Uk2TableHeaderRowColorEnum } from '../../enums';

describe('Uk2HeaderRowDirective', () => {
  let directive: Uk2HeaderRowDirective;
  let htmlElement: ElementRef<HTMLElement>;

  beforeEach(() => {
    htmlElement = new ElementRef(document.createElement('mat-header-row'));
    directive = new Uk2HeaderRowDirective(htmlElement);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-header-row');
  });

  it('should add css directive class when ngAfterViewInit is called', () => {
    directive.ngAfterViewInit();
    expect(htmlElement.nativeElement.classList.contains(directive['baseCSSClass'])).toBeTrue();
    expect(
      htmlElement.nativeElement.classList.contains(`${directive['baseCSSClass']}-${directive['_uk2ColorVariant']}`)
    ).toBeTrue();
  });

  it('should add css directive class for color variant when uk2ColorVariant changes', () => {
    directive.uk2ColorVariant = Uk2TableHeaderRowColorEnum.grey;
    expect(
      htmlElement.nativeElement.classList.contains(`${directive['baseCSSClass']}-${Uk2TableHeaderRowColorEnum.grey}`)
    ).toBeTrue();

    directive.uk2ColorVariant = Uk2TableHeaderRowColorEnum.white;
    expect(
      htmlElement.nativeElement.classList.contains(`${directive['baseCSSClass']}-${Uk2TableHeaderRowColorEnum.grey}`)
    ).toBeFalse();
    expect(
      htmlElement.nativeElement.classList.contains(`${directive['baseCSSClass']}-${Uk2TableHeaderRowColorEnum.white}`)
    ).toBeTrue();
  });
});
