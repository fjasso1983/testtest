import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[uk2FileViewerActionControl]',
})
export class Uk2FileViewerActionControlDirective implements OnInit {
  private domElement: HTMLElement = this.elementRef.nativeElement as HTMLElement;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.domElement = this.elementRef.nativeElement as HTMLElement;
    this.domElement.classList.add('uk2-file-viewer-action-control');
  }
}
