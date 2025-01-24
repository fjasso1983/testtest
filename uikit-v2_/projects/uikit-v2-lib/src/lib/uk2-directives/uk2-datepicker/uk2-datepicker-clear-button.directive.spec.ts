import { AfterViewInit, Component, ElementRef, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { Uk2DatepickerClearButtonDirective } from './uk2-datepicker-clear-button.directive';

describe('Uk2DatepickerClearButtonDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2DatepickerClearButtonDirective],
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeDefined();
  });

  it('should add uk2-datepicker-clear-button-show class to clear button when input emit blur event to datepicker button', () => {
    component.triggerBlurDatePicker();

    const clearButtonEl = fixture.nativeElement.querySelector('.uk2-datepicker-clear-button-show');

    expect(clearButtonEl).toBeDefined();
  });

  it('should not add uk2-datepicker-clear-button-show class to clear button if normal blur event is triggered', () => {
    component.triggerNormalBlur();

    const clearButtonEl = fixture.nativeElement.querySelector('.uk2-datepicker-clear-button-show');

    expect(clearButtonEl).toBeNull();
  });

  it("should not add/remove css class if clear button doesn't exist", () => {
    component.hideClearButton();
    fixture.detectChanges();
    component.triggerNormalBlur();

    const clearButtonEl = fixture.nativeElement.querySelector('.uk2-datepicker-clear-button-show');

    expect(clearButtonEl).toBeNull();
  });

  it('should add button in calendar overlay', async () => {
    const matDatePickerHarness = await loader.getHarness(MatDatepickerInputHarness);

    await matDatePickerHarness.setValue('01/01/2023');
    await matDatePickerHarness.openCalendar();

    const clearButton = document.querySelector('.uk2-input-clear-button-overlay') as HTMLButtonElement;
    expect(clearButton).not.toBeNull();

    clearButton.dispatchEvent(new MouseEvent('click'));

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.value).not.toBe('');
  });

  it('should not add button in calendar overlay if input is empty', async () => {
    const matDatePickerHarness = await loader.getHarness(MatDatepickerInputHarness);

    await matDatePickerHarness.setValue('');
    await matDatePickerHarness.openCalendar();

    const clearButton = document.querySelector('.uk2-input-clear-button-overlay') as HTMLButtonElement;
    expect(clearButton).toBeNull();
  });
});

@Component({
  template: `
    <form>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Date</mat-label>
        <input matInput [matDatepicker]="picker" uk2Input #input />
        <button
          class="uk2-input-clear-button uk2-datepicker-clear-button"
          matSuffix
          mat-icon-button
          aria-label="Clear"
          tabindex="-1"
          *ngIf="showClearButton"
        >
          <mat-icon></mat-icon>
        </button>
        <mat-datepicker-toggle matSuffix [for]="picker" #matDatepickerToggle>
          <mat-icon matDatepickerToggleIcon></mat-icon>
        </mat-datepicker-toggle>
        <mat-datepicker uk2DatePicker #picker></mat-datepicker>
        <mat-hint> required </mat-hint>
        <mat-error>
          <mat-icon></mat-icon>
        </mat-error>
      </mat-form-field>
    </form>
  `,
})
export class TestComponent implements AfterViewInit {
  @ViewChild('matDatepickerToggle', { read: ElementRef }) matDatepickerToggle!: ElementRef;
  @ViewChild('input') input!: ElementRef;
  showClearButton = true;

  ngAfterViewInit() {}

  triggerBlurDatePicker() {
    const blurEvent = new FocusEvent('blur', { relatedTarget: this.matDatepickerToggle.nativeElement });
    this.input.nativeElement.dispatchEvent(blurEvent);
  }

  triggerNormalBlur() {
    this.input.nativeElement.dispatchEvent(new FocusEvent('blur'));
  }

  hideClearButton() {
    this.showClearButton = false;
  }
}
