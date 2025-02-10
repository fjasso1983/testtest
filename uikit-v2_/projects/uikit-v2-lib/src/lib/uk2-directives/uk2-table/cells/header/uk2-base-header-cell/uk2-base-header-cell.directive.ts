import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive()
export abstract class Uk2BaseHeaderCellDirective implements AfterViewInit {
  protected elementRef: ElementRef<HTMLElement>;
  protected readonly baseCSSClass: string;
  protected readonly pressedCSSClass: string;
  @Input()
  public set uk2IsPressed(isPressed: boolean) {
    isPressed
      ? this.elementRef.nativeElement.classList.add(this.pressedCSSClass)
      : this.elementRef.nativeElement.classList.remove(this.pressedCSSClass);
  }

  constructor(protected el: ElementRef<HTMLElement>, protected baseClass: string) {
    this.elementRef = el;
    this.baseCSSClass = baseClass;
    this.pressedCSSClass = baseClass + '-pressed';
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.classList.add(this.baseCSSClass);
  }
}
