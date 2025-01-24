import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { Uk2TagInputChipsDirective } from './uk2-tag-input-chips.directive';
import { MATERIAL_CLASSES } from '../../uk2-internal-utils';
import { UK2_TAG_INPUT_CHIPS_CLASSES } from './constants';

describe('Uk2TagInputChipsDirective', () => {
  let directive: Uk2TagInputChipsDirective;
  let matFormFieldEl: any;
  let elementRefMock: ElementRef;
  let nativeElMock: any;
  let hostMock: any;
  let selectMock: any;
  let chipListMock: any;
  let rendererMock: any;

  beforeEach(() => {
    matFormFieldEl = {
      classList: {
        contains: jasmine.createSpy(),
        remove: jasmine.createSpy(),
        add: jasmine.createSpy(),
        replace: jasmine.createSpy(),
      },
      attributes: {
        getNamedItem: jasmine.createSpy(),
      },
      clientWidth: 0,
    };
    nativeElMock = {
      closest: jasmine.createSpy(),
      classList: { add: jasmine.createSpy() },
    };
    rendererMock = {
      createElement: jasmine.createSpy(),
      addClass: jasmine.createSpy(),
      removeClass: jasmine.createSpy(),
      removeStyle: jasmine.createSpy(),
      setStyle: jasmine.createSpy(),
      insertBefore: jasmine.createSpy(),
      appendChild: jasmine.createSpy(),
      removeChild: jasmine.createSpy(),
    };
    elementRefMock = { nativeElement: nativeElMock };
    hostMock = {
      removable: false,
      selectable: false,
      disabled: false,
    };
    selectMock = {
      value: [],
      stateChanges: {
        pipe: () => {
          return new Observable<void>(subscriber => {
            subscriber.next();
            subscriber.complete();
          });
        },
      },
      disabled: false,
      setValue(value: any) {
        this.value = value;
      },
    };
    chipListMock = {
      chipFocusChanges: {
        pipe: () => {
          return new Observable<void>(subscriber => {
            subscriber.next();
            subscriber.complete();
          });
        },
      },
    };
    directive = new Uk2TagInputChipsDirective(elementRefMock, rendererMock, hostMock, selectMock, chipListMock);
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should call [addClass] and [initialConfigChip] when [ngAfterViewInit] is invoked', () => {
    const addClassSpy = spyOn(directive, 'addClass');
    const initialConfigChipSpy = spyOn(directive, 'initialConfigChip');

    directive.ngAfterViewInit();

    expect(addClassSpy).toHaveBeenCalled();
    expect(initialConfigChipSpy).toHaveBeenCalled();
  });

  it('should add classes to element', () => {
    directive.addClass();

    expect(nativeElMock.closest).toHaveBeenCalledWith(`.${MATERIAL_CLASSES.chipListBox}`);
    expect(nativeElMock.classList.add).toHaveBeenCalledWith(UK2_TAG_INPUT_CHIPS_CLASSES.tagInputChips);
  });

  it('should config the [host] when [initialConfigChip] method is invoked', () => {
    hostMock.removable = false;
    hostMock.selectable = true;

    directive.initialConfigChip();

    expect(hostMock.removable).toBeTrue();
    expect(hostMock.selectable).toBeFalse();
  });

  it('should complete [destroy$] subject on destroy', () => {
    const nextSpy = spyOn(directive['destroy$'], 'next');
    const completeSpy = spyOn(directive['destroy$'], 'complete');

    directive.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should [host.disabled] to be true when [select.disabled] is true as well', () => {
    selectMock.disabled = true;
    directive.ngOnInit();

    expect(hostMock.disabled).toBeTrue();
  });

  it('should call [rerender.addClass] with values "uk2-dropdown-filled" when [inputFilled] method is invoked', () => {
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);
    selectMock.setValue(['test']);

    directive.inputFilled();

    expect(rendererMock.addClass).toHaveBeenCalledOnceWith(matFormFieldEl, 'uk2-dropdown-filled');
  });

  it('should call [rerender.removeClass] with values "uk2-dropdown-filled" when [inputFilled] method is invoked', () => {
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);
    selectMock.setValue([]);

    directive.inputFilled();

    expect(rendererMock.removeClass).toHaveBeenCalledOnceWith(matFormFieldEl, 'uk2-dropdown-filled');
  });

  it('should call [inputFilled] method when [onDestroyed] method is invoked', () => {
    const inputFilledSpy = spyOn(directive, 'inputFilled');

    directive.onDestroyed();

    expect(inputFilledSpy).toHaveBeenCalled();
  });
});
