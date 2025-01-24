import { Directive, ElementRef, OnInit, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[uk2FileViewerPageControl]',
})
export class Uk2FileViewerPageControlDirective implements OnInit, OnChanges {
  @Input() uk2FileViewerPageSize: number | undefined;

  private domElement: HTMLElement = this.elementRef.nativeElement as HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.domElement = this.elementRef.nativeElement as HTMLElement;
    this.domElement.classList.add('uk2-file-viewer-page-control');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { uk2FileViewerPageSize } = changes;
    if (uk2FileViewerPageSize) {
      this.setFileViewerPageControlInputSize(uk2FileViewerPageSize.currentValue);
    }
  }

  private setFileViewerPageControlInputSize(pageSize: number): void {
    const closestInput = this.domElement.querySelector('input');
    if (closestInput) {
      const digitSize = pageSize ? `${pageSize}`.length : 1;
      const inputSize = 10 + digitSize * 8;

      // 18 is the minimum size of the input when page number have 1 digit, adding 8 px for each addicional digit to get a correct input size.
      this.renderer.setStyle(closestInput, 'width', `${inputSize}px`);
    }
  }
}
