import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { UK2_BOTTOM_SHEET_VIEWPORT, Uk2BottomSheetLinkDirective } from './uk2-bottom-sheet-link.directive';
import { Uk2DropdownDirective } from '../uk2-dropdown/uk2-dropdown-single';
import {
  Uk2BottomSheetComponent,
  Uk2BottomSheetHeaderComponent,
  Uk2BottomSheetOptionsComponent,
} from '../../uk2-components';
import { By } from '@angular/platform-browser';
import {
  Uk2BottomSheetCalculatorDirective,
  Uk2BottomSheetStyleDirective,
} from '../../uk2-components/uk2-bottom-sheet/uk2-bottom-sheet-directives';

describe('Uk2BottomSheetLinkDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        Uk2BottomSheetLinkDirective,
        Uk2DropdownDirective,
        Uk2BottomSheetComponent,
        Uk2BottomSheetOptionsComponent,
        Uk2BottomSheetHeaderComponent,
        Uk2BottomSheetStyleDirective,
        Uk2BottomSheetCalculatorDirective,
      ],
      imports: [
        MatFormFieldModule,
        MatBottomSheetModule,
        MatSelectModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);

    fixture.detectChanges();
  });

  beforeEach(() => {
    window.innerWidth = UK2_BOTTOM_SHEET_VIEWPORT - 1;
  });

  it('should be created', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should open bottom sheet clicking mat-select', fakeAsync(() => {
    let matSelect = fixture.debugElement.query(By.css('mat-select')).nativeElement as HTMLElement;
    matSelect.click();

    tick(2000);

    let bottomSheet = document.querySelector('#uk2-bottom-sheet');

    expect(bottomSheet).toBeDefined();
  }));

  it('should mark form control as untouched', (done: DoneFn) => {
    let matSelect = fixture.debugElement.query(By.css('mat-select')).nativeElement as HTMLElement;

    matSelect.blur();
    matSelect.click();

    fixture.detectChanges();

    setTimeout(() => {
      expect(fixture.componentInstance.group.controls['options'].untouched).toBe(true);
      done();
    }, 1000);
  });
});

@Component({
  selector: 'test-component',
  template: `
    <form [formGroup]="group">
      <mat-form-field appearance="outline" floatLabel="always" hintLabel="Please select an option">
        <mat-label>Options</mat-label>
        <mat-select
          placeholder="Lorem Ipsum"
          uk2Dropdown
          uk2BottomSheetLink
          formControlName="options"
          [uk2BottomSheetRef]="formIntegration"
          #select
        >
          <mat-option>None</mat-option>
          <mat-option value="option1">Option 1</mat-option>
          <mat-option value="option2">Option 2</mat-option>
          <mat-option value="option3">Option 3</mat-option>
          <mat-option value="option4">Option 4</mat-option>
        </mat-select>
        <mat-error>Field required</mat-error>
      </mat-form-field>
    </form>
    <ng-template #formIntegration>
      <uk2-bottom-sheet-options
        [title]="title"
        [description]="description"
        [options]="select.options"
      ></uk2-bottom-sheet-options>
    </ng-template>
  `,
})
export class TestComponent {
  title = 'Options';
  description = 'Select one';
  uk2IsLoading = false;
  group = this.fb.group({
    options: [''],
  });

  constructor(private fb: FormBuilder) {}
}
