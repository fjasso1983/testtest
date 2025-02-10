import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive()
export abstract class Uk2BaseCellDirective implements AfterViewInit {
  protected elementRef: ElementRef<HTMLElement>;
  protected readonly baseCSSClass: string;
  protected readonly selectedCSSClass: string;

  constructor(protected el: ElementRef<HTMLElement>, protected baseClass: string) {
    this.elementRef = el;
    this.baseCSSClass = baseClass;
    this.selectedCSSClass = baseClass + '-selected';
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.classList.add(this.baseCSSClass);
  }
}
