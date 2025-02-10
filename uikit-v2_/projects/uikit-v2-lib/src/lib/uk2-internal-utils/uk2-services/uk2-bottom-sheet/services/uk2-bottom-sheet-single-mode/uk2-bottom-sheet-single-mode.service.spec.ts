import { TestBed } from '@angular/core/testing';

import { Uk2BottomSheetSingleModeService } from './uk2-bottom-sheet-single-mode.service';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

describe('Uk2BottomSheetSingleModeService', () => {
  let service: Uk2BottomSheetSingleModeService;
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
      providers: [Uk2BottomSheetSingleModeService, MatBottomSheet],
    });
    service = TestBed.inject(Uk2BottomSheetSingleModeService);
    bottomSheet = TestBed.inject(MatBottomSheet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get currentBottomSheet', () => {
    expect(service.currentBottomSheet).toBeUndefined();
  });

  it('should open a bottom sheet', () => {
    const openSpy = spyOn(service['bottomSheetService'], 'open').and.callThrough();
    service.openBottomSheet(MockBottomSheetComponent);

    expect(openSpy).toHaveBeenCalled();
  });
});
