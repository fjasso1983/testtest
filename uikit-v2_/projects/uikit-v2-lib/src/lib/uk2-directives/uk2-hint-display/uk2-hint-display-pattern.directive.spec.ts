import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2HintDisplayPatternDirective } from './uk2-hint-display-pattern.directive';
import { Uk2FormFieldHintDisplayPatternEnum } from './enums';
import { Uk2InputValidationsService } from '../../uk2-internal-utils';

@Component({
  template: `
    <div>
      <div>
        <mat-label>Enter your email</mat-label>
        <input id="inputWithoutMatInput" uk2HintDisplayPattern [formControl]="email" name="email" />
        <mat-error *ngIf="email.invalid">{{ getErrorMessage() }}</mat-error>
      </div>

      <mat-form-field appearance="fill">
        <mat-label>Enter your second email</mat-label>
        <input
          id="inputWithMatInput"
          matInput
          uk2Input
          [uk2HintDisplayPattern]="alwaysVisible"
          [formControl]="email2"
          name="email2"
        />
        <mat-hint>This is a hint</mat-hint>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Enter your name</mat-label>
        <input
          #nameInputEl
          id="inputName"
          matInput
          uk2Input
          [uk2HintDisplayPattern]="hideInDefaultState"
          [formControl]="name"
          name="name"
        />
        <mat-hint>This is a hint</mat-hint>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Enter your city</mat-label>
        <input
          #cityInputEl
          id="inputCity"
          matInput
          uk2Input
          [uk2HintDisplayPattern]="hideInDefaultState"
          [formControl]="city"
          name="city"
        />
        <mat-hint>This is a hint</mat-hint>
      </mat-form-field>
    </div>
  `,
})
class TestComponent {
  hideInDefaultState = Uk2FormFieldHintDisplayPatternEnum.hideInDefaultState;
  alwaysVisible = Uk2FormFieldHintDisplayPatternEnum.alwaysVisible;
  @ViewChild('nameInputEl') nameInputEl: any;
  @ViewChild('cityInputEl') cityInputEl: any;
  email = new UntypedFormControl('');
  email2 = new UntypedFormControl('');
  name = new UntypedFormControl('');
  city = new UntypedFormControl('New york');

  focusNameInput() {
    this.nameInputEl.nativeElement.focus();
  }

  blurNameInput() {
    this.nameInputEl.nativeElement.blur();
  }

  focusCityInput() {
    this.cityInputEl.nativeElement.focus();
  }

  blurCityInput() {
    this.cityInputEl.nativeElement.blur();
  }
}

describe('Uk2HintDisplayPatternDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2HintDisplayPatternDirective],
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should not be applied on elements that don't have matInput directive", () => {
    const input = fixture.elementRef.nativeElement.querySelector('#inputWithoutMatInput');

    expect(input.classList.contains('uk2HintDisplayPattern')).toBeFalse();
  });

  it('should be applied on elements that have matInput directive', () => {
    const input = fixture.elementRef.nativeElement.querySelector('#inputWithMatInput');
    const formField = input.closest(`.${MATERIAL_CLASSES.formField}`);

    expect(input.classList.contains('uk2HintDisplayPattern')).toBeTrue();
    expect(formField.classList.contains('uk2-form-field-hint-hidden')).toBeFalse();
  });

  it('should add class "uk2-form-field-hint-hidden" if directive is set with hideInDefaultState', () => {
    const input = fixture.elementRef.nativeElement.querySelector('#inputName');
    const formField = input.closest(`.${MATERIAL_CLASSES.formField}`);

    expect(formField.classList.contains('uk2-form-field-hint-hidden')).toBeTrue();
  });

  it('should remove uk2-form-field-hint-hidden css class when input is filled', async () => {
    const input = fixture.elementRef.nativeElement.querySelector('#inputCity');
    const formField = input.closest(`.${MATERIAL_CLASSES.formField}`);

    await fixture.whenStable();
    component.focusCityInput();
    component.blurCityInput();
    fixture.detectChanges();

    expect(formField.classList.contains('uk2-form-field-hint-hidden')).toBeFalse();
  });

  it('should remove uk2-form-field-hint-hidden css class when input is focus', async () => {
    const input = fixture.elementRef.nativeElement.querySelector('#inputName');

    let formField = input.closest(`.${MATERIAL_CLASSES.formField}`);
    expect(formField.classList.contains('uk2-form-field-hint-hidden')).toBeTrue();

    await fixture.whenStable();
    component.focusNameInput();
    fixture.detectChanges();

    formField = fixture.elementRef.nativeElement.querySelector(`.${MATERIAL_CLASSES.formField}`);
    expect(formField.classList.contains('uk2-form-field-hint-hidden')).toBeFalse();
  });
});

describe('Uk2HintDisplayPatternDirectiveDirective Class', () => {
  let directive: Uk2HintDisplayPatternDirective;
  let service: Uk2InputValidationsService;
  const elementMock: any = {
    nativeElement: {
      closest() {},
      hasAttribute() {},
    },
  };
  const mockService: any = {
    setStrategy: jasmine.createSpy(),
    isInputFilled: jasmine.createSpy(),
    isInputDisabled: jasmine.createSpy(),
  };

  beforeEach(() => {
    service = new Uk2InputValidationsService();
    directive = new Uk2HintDisplayPatternDirective(elementMock, service);
  });

  it('should call toggleHintVisibility when onFocus is invoked', () => {
    spyOn(directive, 'toggleHintVisibility');

    directive.onFocus();
    expect(directive.toggleHintVisibility).toHaveBeenCalledOnceWith(true);
  });

  it("shouldn't call toggleHintVisibility when onFocus is invoked and input is disabled", () => {
    const directive = new Uk2HintDisplayPatternDirective(elementMock, mockService);
    spyOn(directive, 'toggleHintVisibility');
    mockService.isInputDisabled.and.returnValue(true);

    directive.onFocus();
    expect(directive.toggleHintVisibility).not.toHaveBeenCalledWith();
  });

  it('should call toggleHintVisibility when onBlur is invoked', () => {
    spyOn(directive, 'toggleHintVisibility');

    directive.onBlur();
    expect(directive.toggleHintVisibility).toHaveBeenCalledOnceWith(true);
  });

  it("should throw Error if element isn't in a mat-form-field", () => {
    expect(() => {
      directive.toggleHintVisibility();
    }).toThrowError();
  });
});
