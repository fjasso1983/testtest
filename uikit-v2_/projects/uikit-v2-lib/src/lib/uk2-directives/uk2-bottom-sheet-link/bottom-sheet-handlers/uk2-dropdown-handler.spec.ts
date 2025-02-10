import { Uk2DropdownHandler } from './uk2-dropdown-handler';
import { MatSelect } from '@angular/material/select';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Uk2BottomSheetService } from '../../../uk2-internal-utils';
import { MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';

describe('Uk2DropdownHandler', () => {
  let uk2DropdownHandler: Uk2DropdownHandler;
  let bottomSheetStackSpy: Uk2BottomSheetService;
  let matSelectSpy: MatSelect;
  let windowSize = window.innerWidth;
  let markAsUntouchedSpy: jasmine.Spy;
  let mockBottomSheetRef: jasmine.SpyObj<MatBottomSheetRef<any>>;

  beforeEach(() => {
    markAsUntouchedSpy = jasmine.createSpy();
    mockBottomSheetRef = jasmine.createSpyObj('MatBottomSheetRef', ['afterOpened']);
    mockBottomSheetRef.afterOpened.and.returnValue(of(undefined));
    matSelectSpy = jasmine.createSpyObj<MatSelect>('MatSelect', ['close', 'open']);
    matSelectSpy.ngControl = {
      control: {
        markAsUntouched: markAsUntouchedSpy,
      },
    } as any;

    uk2DropdownHandler = new Uk2DropdownHandler(bottomSheetStackSpy, matSelectSpy);
    window.innerWidth = windowSize;

    TestBed.configureTestingModule({
      imports: [MatBottomSheetModule],
      providers: [Uk2BottomSheetService, { provide: MatBottomSheetRef, useValue: mockBottomSheetRef }],
    });

    bottomSheetStackSpy = TestBed.inject(Uk2BottomSheetService);
    Object.defineProperty(bottomSheetStackSpy, 'currentBottomSheet', {
      get: () => mockBottomSheetRef,
    });
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
      const mockControl = jasmine.createSpyObj('AbstractControl', ['markAsUntouched']);
      uk2DropdownHandler['matSelect'] = {
        ngControl: {
          control: mockControl,
        },
      } as any;
      uk2DropdownHandler.onBlur();

      expect(uk2DropdownHandler['matSelect'].ngControl.control?.markAsUntouched).toHaveBeenCalled();
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
      const closeBottomSheetSpy = spyOn(bottomSheetStackSpy, 'closeBottomSheet').and.callThrough();
      uk2DropdownHandler['bottomSheetService'] = bottomSheetStackSpy;
      uk2DropdownHandler.closeResponsiveFlyDown();

      expect(matSelectSpy.close).toHaveBeenCalled();
      expect(closeBottomSheetSpy).toHaveBeenCalled();
    });
  });
});

function triggerResize() {
  const resizeEvent = new Event('resize');
  window.dispatchEvent(resizeEvent);
}
