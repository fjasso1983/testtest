import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[uk2FileViewerZoomControl]',
})
export class Uk2FileViewerZoomControlDirective implements OnInit {
  private domElement: HTMLElement = this.elementRef.nativeElement as HTMLElement;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.domElement = this.elementRef.nativeElement as HTMLElement;
    this.domElement.classList.add('uk2-file-viewer-zoom-control');
  }
}
