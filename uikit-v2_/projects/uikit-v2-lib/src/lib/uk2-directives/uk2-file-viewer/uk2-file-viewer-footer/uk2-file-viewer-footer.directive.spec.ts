import { Uk2FileViewerFooterDirective } from './uk2-file-viewer-footer.directive';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('Uk2FileViewerFooterDirective', () => {
  let directive: Uk2FileViewerFooterDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    const element = document.createElement('div');
    elementRef = new ElementRef(element);

    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: elementRef }],
    });

    directive = new Uk2FileViewerFooterDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add class "uk2-file-viewer-footer" on ngOnInit', () => {
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList.contains('uk2-file-viewer-footer')).toBeTrue();
  });
});
