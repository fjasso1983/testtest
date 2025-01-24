import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[uk2JustifyContentCenter]',
})
export class Uk2JustifyContentCenterDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('uk2-justify-content-center');
  }
}
