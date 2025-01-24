import { Directive, ElementRef, HostBinding, Input, OnInit, inject } from '@angular/core';
import { Uk2ProductTileComponentPositionEnum } from './enums';

@Directive({
  selector: '[uk2ProductTileGrid]',
})
export class Uk2ProductTileGridDirective implements OnInit {
  @Input() uk2ComponentPosition: Uk2ProductTileComponentPositionEnum = Uk2ProductTileComponentPositionEnum.bottom;
  private readonly elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('uk2-product-tile-grid');
  }

  @HostBinding('class.uk2-product-tile-grid--top') get isTopPosition() {
    return this.uk2ComponentPosition === Uk2ProductTileComponentPositionEnum.top;
  }

  @HostBinding('class.uk2-product-tile-grid--bottom') get isBottomPosition() {
    return this.uk2ComponentPosition === Uk2ProductTileComponentPositionEnum.bottom;
  }
}
