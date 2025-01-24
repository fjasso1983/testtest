import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[uk2FileViewerContainer]',
})
export class Uk2FileViewerContainerDirective implements OnInit, AfterViewInit, OnChanges {
  @Input() uk2FileViewerWidth = '1152px';
  @Input() uk2FileViewerHeight = '760px';
  @Input() uk2FileViewerNoBorder = false;

  private domElement: HTMLElement = this.elementRef.nativeElement as HTMLElement;
  private renderReady = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.renderReady) {
      if (changes.uk2FileViewerWidth || changes.uk2FileViewerHeight) {
        this.setFileViewerContainerDimensions();
      }
      if (changes.uk2FileViewerNoBorder) {
        this.setFileViewerBorder(changes.uk2FileViewerNoBorder.currentValue);
      }
    }
  }

  ngOnInit(): void {
    this.domElement = this.elementRef.nativeElement as HTMLElement;
    this.domElement.classList.add('uk2-file-viewer-container-extended');
    this.setFileViewerContainerDimensions();
  }

  ngAfterViewInit() {
    this.renderReady = true;
    this.setFileViewerBorder(this.uk2FileViewerNoBorder);
  }

  private setFileViewerBorder(hideBorder: boolean) {
    this.domElement.classList.remove('uk2-file-viewer-border');
    if (!hideBorder) {
      this.domElement.classList.add('uk2-file-viewer-border');
    }
  }

  private setFileViewerContainerDimensions(): void {
    this.renderer.setStyle(this.domElement, 'height', `${this.uk2FileViewerHeight}`);
    this.renderer.setStyle(this.domElement, 'max-height', `${this.uk2FileViewerHeight}`);
    this.renderer.setStyle(this.domElement, 'width', `${this.uk2FileViewerWidth}`);
    this.renderer.setStyle(this.domElement, 'max-width', `${this.uk2FileViewerWidth}`);
  }
}
