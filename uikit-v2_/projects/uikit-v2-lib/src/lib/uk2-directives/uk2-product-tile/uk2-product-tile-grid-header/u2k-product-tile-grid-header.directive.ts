import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[uk2ProductTileHeader]',
})
export class Uk2ProductTileHeaderDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('uk2-product-tile-header');
  }
}
