import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { Uk2DropdownHandler } from './uk2-dropdown-handler';
import { MatSelect } from '@angular/material/select';
import { fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';

describe('Uk2DropdownHandler', () => {
  let uk2DropdownHandler: Uk2DropdownHandler;
  let matBottomSheetSpy: MatBottomSheet;
  let matSelectSpy: MatSelect;
  let windowSize = window.innerWidth;
  let markAsUntouchedSpy: jasmine.Spy;

  beforeEach(() => {
    matBottomSheetSpy = jasmine.createSpyObj<MatBottomSheet>('MatBottomSheet', ['dismiss']);
    markAsUntouchedSpy = jasmine.createSpy();
    matBottomSheetSpy._openedBottomSheetRef = {
      afterOpened: () => {
        return new Observable<void>(subscriber => {
          subscriber.next();
          subscriber.complete();
        });
      },
    } as any;
    matSelectSpy = jasmine.createSpyObj<MatSelect>('MatSelect', ['close', 'open']);
    matSelectSpy.ngControl = {
      control: {
        markAsUntouched: markAsUntouchedSpy,
      },
    } as any;

    uk2DropdownHandler = new Uk2DropdownHandler(matBottomSheetSpy, matSelectSpy);
    window.innerWidth = windowSize;
  });

  describe('onInit()', () => {
    it('should override open function of mat-select with an empty function on mobile screen', () => {
      window.innerWidth = 200;
      uk2DropdownHandler.onInit();

      expect(matSelectSpy.open).not.toEqual(uk2DropdownHandler['_open']);
    });

    it('should not override open function', () => {
      uk2DropdownHandler.onInit();

      expect(matSelectSpy.open).toEqual(uk2DropdownHandler['_open']);
    });

    it('should call chooseSelectionOption and closeResponsiveFlyDown when window resize', fakeAsync(() => {
      let chooseSelectionOptionSpy = spyOn(uk2DropdownHandler, 'chooseSelectionOption');
      let closeResponsiveFlyDownSpy = spyOn(uk2DropdownHandler, 'closeResponsiveFlyDown');
      uk2DropdownHandler.onInit();

      triggerResize();
      tick(100);

      expect(chooseSelectionOptionSpy).toHaveBeenCalled();
      expect(closeResponsiveFlyDownSpy).toHaveBeenCalled();
    }));
  });

  describe('onBlur', () => {
    it('should mark mat select as untouched', () => {
      uk2DropdownHandler.onBlur();

      expect(markAsUntouchedSpy).toHaveBeenCalled();
    });
  });

  describe('onClick', () => {
    it('should return undefined', () => {
      const res = uk2DropdownHandler.onClick();

      expect(res).toBeUndefined();
    });
  });

  describe('onDestroy', () => {
    it('should call subject complete method', () => {
      let completeSpy = spyOn(uk2DropdownHandler['_destroy'], 'complete');

      uk2DropdownHandler.onDestroy();

      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('closeResponsiveFlyDown', () => {
    it('should close select and bottom sheet', () => {
      uk2DropdownHandler.closeResponsiveFlyDown();

      expect(matSelectSpy.close).toHaveBeenCalled();
      expect(matBottomSheetSpy.dismiss).toHaveBeenCalled();
    });
  });
});

function triggerResize() {
  const resizeEvent = new Event('resize');
  window.dispatchEvent(resizeEvent);
}
