import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { Uk2BottomSheetComponent } from './uk2-bottom-sheet.component';
import { Uk2BottomSheetHeaderComponent } from './uk2-bottom-sheet-header';
import {
  Uk2BottomSheetService,
  Uk2BottomSheetSingleModeService,
  Uk2BottomSheetStackService,
} from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

describe('Uk2BottomSheetComponent', () => {
  let component: Uk2BottomSheetComponent;
  let fixture: ComponentFixture<Uk2BottomSheetComponent>;
  let dismissSpy: jasmine.Spy;

  beforeEach(async () => {
    (dismissSpy = jasmine.createSpy()),
      await TestBed.configureTestingModule({
        declarations: [Uk2BottomSheetComponent, Uk2BottomSheetHeaderComponent],
        imports: [CommonModule, MatBottomSheetModule],
        providers: [
          {
            provide: MatBottomSheetRef,
            useValue: {
              dismiss: dismissSpy,
            },
          },
          Uk2BottomSheetService,
          Uk2BottomSheetSingleModeService,
          Uk2BottomSheetStackService,
        ],
        schemas: [NO_ERRORS_SCHEMA],
      });

    fixture = TestBed.createComponent(Uk2BottomSheetComponent);
    component = fixture.componentInstance;
  });

  it('should render bottom sheet', () => {
    expect(component).toBeDefined();
  });

  it('should dismiss bottom sheet calling close method', () => {
    spyOn(component.bottomSheetStackService, 'closeBottomSheet');
    component.closeBottomSheet();

    expect(component.bottomSheetStackService.closeBottomSheet).toHaveBeenCalled();
  });
});
