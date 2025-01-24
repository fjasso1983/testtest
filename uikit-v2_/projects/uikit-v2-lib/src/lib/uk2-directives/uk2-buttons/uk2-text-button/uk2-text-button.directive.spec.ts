import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2ButtonSizeEnum, Uk2TextButtonVariant } from '../enums';
import { Uk2TextButtonDirective } from './uk2-text-button.directive';

@Component({
  template: `
    <!-- Small text button -->
    <button
      id="small-text-button"
      uk2TextButton
      disableRipple
      [uk2ButtonSize]="smallButton"
      [uk2IsLoading]="isLoading"
      mat-button
    >
      Add
    </button>

    <!-- Medium text button -->
    <button
      id="medium-text-button"
      uk2TextButton
      disableRipple
      [uk2ButtonSize]="mediumButton"
      [uk2IsLoading]="isLoading"
      [uk2TextButtonVariant]="buttonVariant"
      mat-button
    >
      Add
    </button>

    <!-- Large text button -->
    <button
      id="large-text-button"
      uk2TextButton
      disableRipple
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
      mat-button
    >
      Add
    </button>

    <!-- No loading attribute -->
    <button id="large-text-button-no-loading-attr" uk2TextButton disableRipple [uk2ButtonSize]="largeButton" mat-button>
      Add
    </button>

    <!-- uk2TextButton doesn't work with <a> </a> -->
    <a uk2TextButton disableRipple [uk2ButtonSize]="largeButton" [uk2IsLoading]="isLoading" mat-button href="test">
      Not text button
    </a>

    <!-- uk2TextButton doesn't work when no mat-button attribute -->
    <button
      id="large-text-button-no-mat-button"
      uk2TextButton
      disableRipple
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- uk2TextButton doesn't work with color attribute -->
    <button
      id="large-text-button-color-attr"
      color="primary"
      uk2TextButton
      disableRipple
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
      mat-button
    >
      Add
    </button>
  `,
})
class TestComponent {
  smallButton = Uk2ButtonSizeEnum.small;
  mediumButton = Uk2ButtonSizeEnum.medium;
  largeButton = Uk2ButtonSizeEnum.large;
  buttonVariant = Uk2TextButtonVariant.button;
  isLoading = false;
}

describe('Uk2TextButtonDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2TextButtonDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render a small text button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#small-text-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-text-button-small')).toBeTrue();
  });

  it('should render a medium text button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#medium-text-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-text-button-medium')).toBeTrue();
  });

  it('should render a large text button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-text-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-text-button-large')).toBeTrue();
  });

  it('should only work with button elements', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let anchorElement: HTMLAnchorElement = containerElement.querySelector('a') ?? new HTMLAnchorElement();

    // act
    fixture.detectChanges();

    // assert
    expect(anchorElement.classList.contains('uk2-text-button-large')).toBeFalse();
  });

  it('should render a large text skeleton button with appropriated class name when isLoading = true', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-text-button') ?? new HTMLButtonElement();

    component.isLoading = true;

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-text-button-skeleton')).toBeTrue();
  });

  it('should not render a large text skeleton button when no uk2IsLoading attribute', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-text-button-no-loading-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-text-button-skeleton')).toBeFalse();
  });

  it('should not render text button if there is no mat-button', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-text-button-no-mat-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-text-button-large')).toBeFalse();
  });

  it('should not render text button with color attribute', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-text-button-color-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-text-button-large')).toBeFalse();
  });

  it('should add class "uk2-text-variant" when variant input is text', () => {
    component.buttonVariant = Uk2TextButtonVariant.text;

    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector('#medium-text-button');
    expect(buttonEl.classList.contains('uk2-text-variant')).toBeTrue;
  });

  it('should remove class "uk2-text-variant" when variant input is button', () => {
    component.buttonVariant = Uk2TextButtonVariant.text;
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('#medium-text-button');
    expect(buttonEl.classList.contains('uk2-text-variant')).toBeTrue;

    component.buttonVariant = Uk2TextButtonVariant.button;
    fixture.detectChanges();

    expect(buttonEl.classList.contains('uk2-text-variant')).toBeFalse;
  });
});
