import { Uk2FileViewerElementPositionDirective } from './uk2-file-viewer-element-position.directive';
import { ElementRef } from '@angular/core';
import { Uk2FileViewerElementPositionEnum } from './enums/uk2-file-viewer-element-position.enum';

describe('Uk2FileViewerElementPositionDirective', () => {
  let directive: Uk2FileViewerElementPositionDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('div'));
    directive = new Uk2FileViewerElementPositionDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add default center class', () => {
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList).toContain('uk2-file-viewer-item');
    expect(elementRef.nativeElement.classList).toContain('uk2-file-viewer-item-center');
  });

  it('should add uk2-file-viewer-item-left class when position is left', () => {
    directive.uk2FileViewerElementPosition = Uk2FileViewerElementPositionEnum.left;
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList).toContain('uk2-file-viewer-item');
    expect(elementRef.nativeElement.classList).toContain('uk2-file-viewer-item-left');
  });

  it('should add uk2-file-viewer-item-center class when position is center', () => {
    directive.uk2FileViewerElementPosition = Uk2FileViewerElementPositionEnum.center;
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList).toContain('uk2-file-viewer-item');
    expect(elementRef.nativeElement.classList).toContain('uk2-file-viewer-item-center');
  });

  it('should add uk2-file-viewer-item-right class when position is right', () => {
    directive.uk2FileViewerElementPosition = Uk2FileViewerElementPositionEnum.right;
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList).toContain('uk2-file-viewer-item');
    expect(elementRef.nativeElement.classList).toContain('uk2-file-viewer-item-right');
  });
});
