import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[uk2JustifyContentSpaceBetween]',
})
export class Uk2JustifyContentSpaceBetweenDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('uk2-justify-content-space-between');
  }
}
