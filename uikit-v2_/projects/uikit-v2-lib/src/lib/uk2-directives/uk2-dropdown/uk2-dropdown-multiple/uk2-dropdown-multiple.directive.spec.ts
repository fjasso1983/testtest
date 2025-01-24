import { fakeAsync, tick } from '@angular/core/testing';

import { getElementRef, getHost, getMatFormField, getRenderer } from '../uk2-dropdown-single/tests/mocks/index.spec';
import { Uk2DropdownMultipleDirective } from './uk2-dropdown-multiple.directive';

import { UK2_DROPDOWN_MULTIPLE_CLASSES } from './constants';

describe('Uk2DropdownMultipleDirective Class', () => {
  let directive: Uk2DropdownMultipleDirective;

  let matFormFieldEl: any;
  let elementRefMock: any;
  let hostMock: any;
  let rendererMock: any;

  beforeEach(() => {
    elementRefMock = getElementRef();
    hostMock = getHost();
    matFormFieldEl = getMatFormField();
    rendererMock = getRenderer();
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);

    directive = new Uk2DropdownMultipleDirective(elementRefMock, rendererMock, hostMock);
  });

  it('should call [addClass] method when [ngAfterViewInit] is invoked', () => {
    const addClassSpy = spyOn(directive, 'addClass');
    directive.ngAfterViewInit();

    expect(addClassSpy).toHaveBeenCalled();
  });

  it('should call [updateOverlayPosition] when [onChange] is invoked', () => {
    const updateOverlayPositionSpy = spyOn(directive, 'updateOverlayPosition');
    directive.onChange();

    expect(updateOverlayPositionSpy).toHaveBeenCalled();
  });

  it('should call [updatePosition] method when [updateOverlayPosition] method is invoked', fakeAsync(() => {
    directive.updateOverlayPosition();
    tick(10);

    expect(hostMock._overlayDir.overlayRef.updatePosition).toHaveBeenCalled();
  }));

  it('should call [classList.add] when [addClass] method is invoked', () => {
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);
    directive.addClass();

    expect(matFormFieldEl.classList.add).toHaveBeenCalledWith(UK2_DROPDOWN_MULTIPLE_CLASSES.tagInput);
  });
});
