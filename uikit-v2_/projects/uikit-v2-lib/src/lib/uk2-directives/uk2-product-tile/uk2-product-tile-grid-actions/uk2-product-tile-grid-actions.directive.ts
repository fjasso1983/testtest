import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[uk2ProductTileActions]',
})
export class Uk2ProductTileActionsDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('uk2-product-tile-actions');
  }
}
