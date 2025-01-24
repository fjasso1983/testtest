import { Uk2FileViewerZoomControlDirective } from './uk2-file-viewer-zoom-control.directive';
import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

describe('Uk2FileViewerZoomControlDirective', () => {
  let directive: Uk2FileViewerZoomControlDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    const element = document.createElement('div');
    elementRef = new ElementRef(element);

    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: elementRef }],
    });

    directive = new Uk2FileViewerZoomControlDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add class "uk2-file-viewer-zoom-control" on ngOnInit', () => {
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList.contains('uk2-file-viewer-zoom-control')).toBeTrue();
  });
});
