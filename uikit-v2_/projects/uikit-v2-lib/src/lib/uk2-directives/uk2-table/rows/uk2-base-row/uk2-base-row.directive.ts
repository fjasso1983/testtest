import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive()
export abstract class Uk2BaseRowDirective implements AfterViewInit {
  protected elementRef: ElementRef<HTMLElement>;
  protected readonly baseCSSClass: string;

  constructor(protected el: ElementRef<HTMLElement>, protected baseClass: string) {
    this.elementRef = el;
    this.baseCSSClass = baseClass;
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.classList.add(this.baseCSSClass);
  }
}
