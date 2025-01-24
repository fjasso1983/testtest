import { Uk2FileViewerFileNameDirective } from './uk2-file-viewer-file-name.directive';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('Uk2FileViewerFileNameDirective', () => {
  let directive: Uk2FileViewerFileNameDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    const element = document.createElement('div');
    elementRef = new ElementRef(element);

    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: elementRef }],
    });

    directive = new Uk2FileViewerFileNameDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add class "uk2-file-viewer-file-name" on ngOnInit', () => {
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList.contains('uk2-file-viewer-file-name')).toBeTrue();
  });
});
