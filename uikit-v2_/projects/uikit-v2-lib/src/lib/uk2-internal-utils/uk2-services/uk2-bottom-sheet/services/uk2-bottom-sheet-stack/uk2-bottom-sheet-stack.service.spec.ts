import { TestBed } from '@angular/core/testing';

import { Uk2BottomSheetStackService } from './uk2-bottom-sheet-stack.service';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

describe('Uk2BottomSheetStackServiceService', () => {
  let service: Uk2BottomSheetStackService;
  let bottomSheet: MatBottomSheet;

  @Component({
    selector: 'app-mock-bottom-sheet',
    template: '<p>Mock Bottom Sheet Content</p>',
  })
  class MockBottomSheetComponent {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatBottomSheetModule, NoopAnimationsModule],
      declarations: [MockBottomSheetComponent],
      providers: [Uk2BottomSheetStackService, MatBottomSheet],
    });
    service = TestBed.inject(Uk2BottomSheetStackService);
    bottomSheet = TestBed.inject(MatBottomSheet);
  });

  beforeEach(() => {
    service['templateStack'] = [];
    service['bottomSheetRef'] = undefined;
    service['isOpeningNewBottomSheet'] = false;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get currentBottomSheet', () => {
    expect(service.currentBottomSheet).toBeUndefined();
  });

  it('should open a bottom sheet and add it to the stack', () => {
    service.openBottomSheet(MockBottomSheetComponent);

    expect(service.currentBottomSheet).toBeDefined();
    expect(service['templateStack'].length).toBe(1);
    expect(service['templateStack'][0]).toBe(MockBottomSheetComponent);
  });

  it('should close the current bottom sheet and remove it from the stack', () => {
    service.openBottomSheet(MockBottomSheetComponent);
    service.closeBottomSheet();

    expect(service['templateStack'].length).toBe(0);
  });

  it('closeCurrentBottomSheet should dismiss the bottom sheet', () => {
    const templateStackPopSpy = spyOn(service['templateStack'], 'pop');
    service.openBottomSheet(MockBottomSheetComponent);
    service.closeBottomSheet();

    expect(templateStackPopSpy).toHaveBeenCalled();
  });
});
