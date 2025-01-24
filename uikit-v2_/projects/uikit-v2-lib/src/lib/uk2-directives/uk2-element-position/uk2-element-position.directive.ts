import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Uk2ElementPositionEnum } from './enums';

@Directive({
  selector: '[uk2ElementPosition]',
})
export class Uk2ElementPositionDirective implements OnInit {
  @Input() uk2ElementPosition: Uk2ElementPositionEnum = Uk2ElementPositionEnum.center;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.setElementPositionClasses(this.uk2ElementPosition);
  }

  private setElementPositionClasses(position: Uk2ElementPositionEnum): void {
    const htmlElement: HTMLElement = this.elementRef.nativeElement as HTMLElement;
    htmlElement.classList.add('uk2-element-position-item');
    switch (position) {
      case Uk2ElementPositionEnum.left:
        htmlElement.classList.add('uk2-element-position-left');
        break;
      case Uk2ElementPositionEnum.right:
        htmlElement.classList.add('uk2-element-position-right');
        break;
      case Uk2ElementPositionEnum.center:
      default:
        htmlElement.classList.add('uk2-element-position-center');
    }
  }
}
