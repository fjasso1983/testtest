import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { Uk2BottomSheetComponent } from './uk2-bottom-sheet.component';
import { Uk2BottomSheetHeaderComponent } from './uk2-bottom-sheet-header';

describe('Uk2BottomSheetComponent', () => {
  let component: Uk2BottomSheetComponent;
  let fixture: ComponentFixture<Uk2BottomSheetComponent>;
  let dismissSpy: jasmine.Spy;

  beforeEach(async () => {
    (dismissSpy = jasmine.createSpy()),
      await TestBed.configureTestingModule({
        declarations: [Uk2BottomSheetComponent, Uk2BottomSheetHeaderComponent],
        imports: [CommonModule],
        providers: [
          {
            provide: MatBottomSheetRef,
            useValue: {
              dismiss: dismissSpy,
            },
          },
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
    component.close();

    expect(dismissSpy).toHaveBeenCalled();
  });
});
