import { Component, ElementRef, NO_ERRORS_SCHEMA, Renderer2, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FormGroupDirective,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2InputSizeEnum } from '@axos/uikit-v2-lib/src/lib/uk2-directives';

import { Uk2InputDirective } from './uk2-input.directive';

@Component({
  template: `
    <div>
      <div>
        <mat-label>Enter your email</mat-label>
        <input id="inputWithoutMatFormField" matInput uk2MatInput />
      </div>
      <div>
        <mat-label>Enter your email</mat-label>
        <input id="inputWithoutMatInput" uk2MatInput />
      </div>
      <form [formGroup]="form">
        <mat-form-field appearance="outline" floatLabel="always">
          <mat-label>NO LOADING INPUT</mat-label>
          <input matInput uk2Input />
        </mat-form-field>
        <mat-form-field appearance="outline" floatLabel="always">
          <mat-label>Enter phone</mat-label>
          <span matTextPrefix>+521 &nbsp;</span>
          <input
            #phoneInput
            id="phoneInput"
            matInput
            uk2Input
            [uk2IsLoading]="isLoadingPhone"
            [formControl]="phone"
            [mask]="inputMask"
            name="phone"
          />
        </mat-form-field>
        <mat-form-field appearance="outline" floatLabel="always">
          <mat-label>Name</mat-label>
          <input
            #nameInput
            id="nameInput"
            matInput
            [uk2IsLoading]="false"
            uk2Input
            [uk2InputSize]="uk2InputSize"
            [formControl]="name"
            type="text"
            required
            placeholder="input placeholder"
          />
        </mat-form-field>
        <mat-form-field appearance="outline" floatLabel="always">
          <mat-label>Skeleton input</mat-label>
          <input
            #skeletonInput
            id="skeletonInput"
            matInput
            uk2Input
            [uk2IsLoading]="isLoadingSkeleton"
            [formControl]="skeleton"
            name="skeleton"
          />
        </mat-form-field>
        <mat-form-field *ngIf="showErrorAppearanceInput" floatLabel="always">
          <mat-label>Error Outline style expected</mat-label>
          <input #errorAppearanceInput id="errorAppearanceInput" matInput uk2Input />
        </mat-form-field>
        <mat-form-field *ngIf="showErrorFloatLabelInput" appearance="outline">
          <mat-label>Error floatLabel style expected</mat-label>
          <input #errorFloatLabelInput id="errorFloatLabelInput" matInput uk2Input />
        </mat-form-field>
      </form>
    </div>
  `,
})
class InputTestComponent {
  @ViewChild(FormGroupDirective) formToReset!: FormGroupDirective;
  constructor(private fb: UntypedFormBuilder) {}
  isLoadingSkeleton = true;
  isLoadingPhone = false;
  showErrorAppearanceInput = false;
  showErrorFloatLabelInput = false;
  form: UntypedFormGroup = this.fb.group({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    name: new UntypedFormControl('', [Validators.required]),
    phone: new UntypedFormControl('3535353535353', []),
    skeleton: new UntypedFormControl('', []),
  });
  uk2InputSize: Uk2InputSizeEnum | undefined = Uk2InputSizeEnum.medium;
  inputMask = '000) 000 - 0000';

  get email(): any {
    return this.form.get('email');
  }

  get phone(): any {
    return this.form.get('phone');
  }

  get name(): any {
    return this.form.get('name');
  }

  get skeleton(): any {
    return this.form.get('skeleton');
  }
}

describe('Uk2InputDirective Unit Test', () => {
  let component: InputTestComponent;
  let fixture: ComponentFixture<InputTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTestComponent, Uk2InputDirective],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        NgxMaskDirective,
        NgxMaskPipe,
      ],
      providers: [provideNgxMask()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should Trown Error when MatFormFieldAppearance is not set to "outline"', () => {
    const input = fixture.debugElement.query(By.css('#errorAppearanceInput'));
    component.showErrorAppearanceInput = true;
    expect(() => fixture.detectChanges()).toThrowError(Error);
  });

  it('should Trown Error when MatFormFieldFloatLabel is not set to "always"', () => {
    const input = fixture.debugElement.query(By.css('#errorFloatLabelInput'));
    component.showErrorFloatLabelInput = true;
    expect(() => fixture.detectChanges()).toThrowError(Error);
  });

  it("should not be applied on elements that don't have matInput directive", () => {
    const input = fixture.debugElement.nativeElement.querySelector('#inputWithoutMatInput');
    expect(input.classList.contains('uk2-input')).toBeFalse();
  });

  it('should be applied on elements that have matInput directive', () => {
    const input = fixture.debugElement.query(By.css('#phoneInput'));
    expect(input.nativeElement.classList.contains('uk2-input')).toBeTrue();
  });

  it('should apply class uk2-input-form-field to mat form field element', () => {
    const formField = fixture.debugElement.nativeElement
      .querySelector('#phoneInput')
      .closest(`.${MATERIAL_CLASSES.formField}`);
    expect(formField.classList.contains('uk2-form-field')).toBeTrue();
  });

  it('should apply class uk2-input-filled to mat form field element when uk2Input is filled', () => {
    const input = fixture.debugElement.query(By.css('#nameInput'));
    const formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    input.nativeElement.value = 'test';
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new InputEvent('blur'));
    fixture.detectChanges();
    expect(formField.classList.contains('uk2-input-filled')).toBeTrue();
  });

  it('should NOT apply class uk2-input-filled to mat form field element when uk2Input is disabled and filled', () => {
    const input = fixture.debugElement.query(By.css('#nameInput'));
    const formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    input.nativeElement.value = 'test';
    input.nativeElement.disabled = true;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new InputEvent('blur'));
    fixture.detectChanges();
    expect(formField.classList.contains('uk2-input-filled')).toBeFalse();
  });

  it('should remove class uk2-input-filled to mat form field element when uk2Input is cleared', () => {
    const input = fixture.debugElement.query(By.css('#phoneInput'));
    const formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    input.nativeElement.value = '';
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new InputEvent('blur'));
    fixture.detectChanges();
    expect(formField.classList.contains('uk2-input-filled')).toBeFalse();
  });

  it('should be exist a element with class uk2-skeleton-input class && uk2-hidden when uk2isLoading = FALSE', () => {
    const input = fixture.debugElement.query(By.css('#phoneInput'));
    const formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    const skeletonDiv = formField.previousElementSibling;
    fixture.detectChanges();
    expect(skeletonDiv).toBeTruthy();
    expect(skeletonDiv.classList.contains('uk2-skeleton-input')).toBeTrue();
    expect(skeletonDiv.classList.contains('uk2-hidden')).toBeTrue();
  });

  it('should be exist a element with class uk2-skeleton-input class && without uk2-hidden when uk2isLoading = TRUE', () => {
    const input = fixture.debugElement.query(By.css('#skeletonInput'));
    const formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    const skeletonDiv = formField.previousElementSibling;
    fixture.detectChanges();
    expect(skeletonDiv).toBeTruthy();
    expect(skeletonDiv.classList.contains('uk2-skeleton-input')).toBeTrue();
    expect(skeletonDiv.classList.contains('uk2-hidden')).toBeFalse();
  });

  it('should remove class uk2-hidden to element with class uk2-skeleton-input, when uk2isLoading change to false', () => {
    const input = fixture.debugElement.query(By.css('#phoneInput'));
    const formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    const skeletonDiv = formField.previousElementSibling;
    expect(skeletonDiv.classList.contains('uk2-hidden')).toBeTrue();
    component.isLoadingPhone = true;
    fixture.detectChanges();
    expect(skeletonDiv).toBeTruthy();
    expect(skeletonDiv.classList.contains('uk2-hidden')).toBeFalse();
  });

  it('should add class uk2-hidden to element with class uk2-skeleton-input, when uk2isLoading change to true', () => {
    const input = fixture.debugElement.query(By.css('#skeletonInput'));
    const formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    const skeletonDiv = formField.previousElementSibling;
    expect(skeletonDiv.classList.contains('uk2-hidden')).toBeFalse();
    component.isLoadingSkeleton = false;
    fixture.detectChanges();
    expect(skeletonDiv).toBeTruthy();
    expect(skeletonDiv.classList.contains('uk2-hidden')).toBeTrue();
  });

  it('should have same width of container if input has a matTextPrefix', () => {
    const input = fixture.debugElement.query(By.css('#phoneInput'));
    const formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    const flex = formField.querySelector('.mat-mdc-form-field-flex');
    const prefix = formField.querySelector('.mat-mdc-form-field-text-prefix');
    const label = formField.querySelector('.mat-mdc-form-field-infix');
    fixture.detectChanges();
    expect(flex.clientWidth).toEqual(prefix.clientWidth + label.clientWidth);
  });

  it('Should remove uk2-input-filled when resetForm() is called', () => {
    const input = fixture.debugElement.query(By.css('#nameInput'));
    const formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    input.nativeElement.value = 'test';
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new InputEvent('blur'));
    fixture.detectChanges();
    expect(formField.classList.contains('uk2-input-filled')).toBeTrue();
    component.formToReset.resetForm();
    fixture.detectChanges();
    expect(formField.classList.contains('uk2-input-filled')).toBeFalse();
  });

  it('Should not remove uk2-input-filled when resetForm() is called and input focused', () => {
    const input = fixture.debugElement.query(By.css('#nameInput'));
    const formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    input.nativeElement.value = 'test';
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new InputEvent('blur'));
    fixture.detectChanges();
    expect(formField.classList.contains('uk2-input-filled')).toBeTrue();
    input.nativeElement.dispatchEvent(new InputEvent('focus'));
    component.formToReset.resetForm();
    fixture.detectChanges();
    expect(formField.classList.contains('uk2-input-filled')).toBeTrue();
  });

  it('Should remove uk2-input-filled when resetForm() is called and input not focused', () => {
    let input = fixture.debugElement.query(By.css('#nameInput'));
    let formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    input.nativeElement.value = 'test';
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new InputEvent('blur'));
    fixture.detectChanges();
    formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    expect(formField.classList.contains('uk2-input-filled')).toBeTrue();
    input.nativeElement.dispatchEvent(new Event('input'));
    const event = new KeyboardEvent('keyup', {
      keyCode: 13,
    });
    input.nativeElement.dispatchEvent(event);
    component.formToReset.resetForm();
    fixture.detectChanges();
    expect(formField.classList.contains('uk2-input-filled')).toBeFalse();
  });

  it('Should change variable ableToReset to false when input is focus', () => {
    let elementRefMock = jasmine.createSpyObj(ElementRef, ['']);
    elementRefMock.nativeElement = {
      closest: jasmine.createSpy(),
      getAttribute: jasmine.createSpy(),
      classList: jasmine.createSpy(),
    };
    let rendererMock = jasmine.createSpyObj(Renderer2, ['createElement']);
    let directive = new Uk2InputDirective(elementRefMock, rendererMock);
    directive.onFocus();
    expect(directive.ableToReset).toBeFalse();
  });

  describe('form-field size', () => {
    it('should not add class uk2-form-field-size-large if input is not provided', () => {
      let input = fixture.debugElement.query(By.css('#nameInput'));
      let formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`) as HTMLElement;

      setUndefinedSize();

      expect(formField.classList.contains('uk2-form-field-size-large')).toBeFalse();
      expect(formField.classList.contains('uk2-form-field-size-undefined')).toBeFalse();
    });

    it('should add class uk2-form-field-size-large if input is provided', () => {
      let input = fixture.debugElement.query(By.css('#nameInput'));
      let formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`) as HTMLElement;

      setLargeSize();

      expect(formField.classList.contains('uk2-form-field-size-large')).toBeTrue();
    });

    it('should remove  uk2-form-field-size class if size is undefined', () => {
      let input = fixture.debugElement.query(By.css('#nameInput'));
      let formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`) as HTMLElement;

      setLargeSize();
      setUndefinedSize();

      expect(formField.classList.contains('uk2-form-field-size-large')).toBeFalse();
      expect(formField.classList.contains('uk2-form-field-size-undefined')).toBeFalse();
    });

    it('should add  uk2-form-field-size class even if previous value is undefined', () => {
      let input = fixture.debugElement.query(By.css('#nameInput'));
      let formField = input.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`) as HTMLElement;

      setUndefinedSize();
      setLargeSize();

      expect(formField.classList.contains('uk2-form-field-size-large')).toBeTrue();
    });

    function setLargeSize() {
      component.uk2InputSize = Uk2InputSizeEnum.large;
      fixture.detectChanges();
    }

    function setUndefinedSize() {
      component.uk2InputSize = undefined;
      fixture.detectChanges();
    }
  });
});
