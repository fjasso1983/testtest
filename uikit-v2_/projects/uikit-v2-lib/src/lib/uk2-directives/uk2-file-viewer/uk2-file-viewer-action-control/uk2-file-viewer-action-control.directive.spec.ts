import { Uk2FileViewerActionControlDirective } from './uk2-file-viewer-action-control.directive';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('Uk2FileViewerActionControlDirective', () => {
  let directive: Uk2FileViewerActionControlDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    const element = document.createElement('div');
    elementRef = new ElementRef(element);

    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: elementRef }],
    });

    directive = new Uk2FileViewerActionControlDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add class "uk2-file-viewer-action-control" on ngOnInit', () => {
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList.contains('uk2-file-viewer-action-control')).toBeTrue();
  });
});
