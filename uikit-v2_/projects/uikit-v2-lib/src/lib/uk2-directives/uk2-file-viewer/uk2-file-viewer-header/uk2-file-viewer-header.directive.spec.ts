import { Uk2FileViewerHeaderDirective } from './uk2-file-viewer-header.directive';
import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

describe('Uk2FileViewerHeaderDirective', () => {
  let directive: Uk2FileViewerHeaderDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    const element = document.createElement('div');
    elementRef = new ElementRef(element);

    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: elementRef }],
    });

    directive = new Uk2FileViewerHeaderDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add class "uk2-file-viewer-header" on ngOnInit', () => {
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList.contains('uk2-file-viewer-header')).toBeTrue();
  });
});
