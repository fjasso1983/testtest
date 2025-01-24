import { ElementRef } from '@angular/core';
import { Uk2ElementPositionDirective } from './uk2-element-position.directive';
import { Uk2ElementPositionEnum } from './enums';

describe('Uk2ElementPositionDirective', () => {
  let directive: Uk2ElementPositionDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('div'));
    directive = new Uk2ElementPositionDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add default center class', () => {
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList).toContain('uk2-element-position-item');
    expect(elementRef.nativeElement.classList).toContain('uk2-element-position-center');
  });

  it('should add uk2-element-position-left class when position is left', () => {
    directive.uk2ElementPosition = Uk2ElementPositionEnum.left;
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList).toContain('uk2-element-position-item');
    expect(elementRef.nativeElement.classList).toContain('uk2-element-position-left');
  });

  it('should add uk2-file-viewer-item-center class when position is center', () => {
    directive.uk2ElementPosition = Uk2ElementPositionEnum.center;
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList).toContain('uk2-element-position-item');
    expect(elementRef.nativeElement.classList).toContain('uk2-element-position-center');
  });

  it('should add uk2-element-position-right class when position is right', () => {
    directive.uk2ElementPosition = Uk2ElementPositionEnum.right;
    directive.ngOnInit();
    expect(elementRef.nativeElement.classList).toContain('uk2-element-position-item');
    expect(elementRef.nativeElement.classList).toContain('uk2-element-position-right');
  });
});
