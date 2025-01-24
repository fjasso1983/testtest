import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[uk2ProductTileComponent]',
})
export class Uk2ProductTileComponentDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('uk2-product-tile-component');
  }
}
