import { TestBed } from '@angular/core/testing';

import { Uk2BottomSheetService } from './uk2-bottom-sheet.service';
import { Uk2BottomSheetSingleModeService, Uk2BottomSheetStackService } from './services';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Uk2BottomSheetService', () => {
  let service: Uk2BottomSheetService;
  let bottomSheetSingleMode: Uk2BottomSheetSingleModeService;
  let bottomSheetStack: Uk2BottomSheetStackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatBottomSheetModule, NoopAnimationsModule],
      providers: [Uk2BottomSheetService, Uk2BottomSheetSingleModeService, Uk2BottomSheetStackService, MatBottomSheet],
    });
    service = TestBed.inject(Uk2BottomSheetService);
    bottomSheetSingleMode = TestBed.inject(Uk2BottomSheetSingleModeService);
    bottomSheetStack = TestBed.inject(Uk2BottomSheetStackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get currentBottomSheet', () => {
    expect(service.currentBottomSheet).toBeUndefined();
  });

  it('should set strategy to bottomSheetStack if true, if not, it should be bottomSheetSingle', () => {
    service.setStrategy(true);
    expect(service['bottomSheet']).toBe(bottomSheetStack);

    service.setStrategy(false);
    expect(service['bottomSheet']).toBe(bottomSheetSingleMode);
  });

  it('should open a bottom sheet', () => {
    const openBottomSheetSpy = spyOn(bottomSheetSingleMode, 'openBottomSheet');
    service.setStrategy(false);
    service.openBottomSheet('template', 'config');

    expect(openBottomSheetSpy).toHaveBeenCalled();
  });

  it('should close the current bottom sheet', () => {
    const closeBottomSheetSpy = spyOn(bottomSheetSingleMode, 'closeBottomSheet');
    service.setStrategy(false);
    service.closeBottomSheet();

    expect(closeBottomSheetSpy).toHaveBeenCalled();
  });
});
