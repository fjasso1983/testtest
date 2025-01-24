import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Uk2FileViewerElementPositionEnum } from './enums/uk2-file-viewer-element-position.enum';

@Directive({
  selector: '[uk2FileViewerElementPosition]',
})
export class Uk2FileViewerElementPositionDirective implements OnInit {
  @Input() uk2FileViewerElementPosition: Uk2FileViewerElementPositionEnum = Uk2FileViewerElementPositionEnum.center;

  private domElement: HTMLElement = this.elementRef.nativeElement as HTMLElement;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.domElement = this.elementRef.nativeElement as HTMLElement;
    this.domElement.classList.add('uk2-file-viewer-item');
    this.setElementPositionClass(this.uk2FileViewerElementPosition);
  }

  private setElementPositionClass(position: Uk2FileViewerElementPositionEnum): void {
    switch (position) {
      case Uk2FileViewerElementPositionEnum.left:
        this.domElement.classList.add('uk2-file-viewer-item-left');
        break;
      case Uk2FileViewerElementPositionEnum.right:
        this.domElement.classList.add('uk2-file-viewer-item-right');
        break;
      case Uk2FileViewerElementPositionEnum.center:
      default:
        this.domElement.classList.add('uk2-file-viewer-item-center');
    }
  }
}
