import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2ButtonSizeEnum } from '../enums';
import { Uk2PrimaryButtonDirective } from './uk2-primary-button.directive';

@Component({
  template: `
    <!-- Small primary button -->
    <button
      id="small-primary-button"
      uk2PrimaryButton
      disableRipple
      mat-raised-button
      [uk2ButtonSize]="smallButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- Medium primary button -->
    <button
      id="medium-primary-button"
      uk2PrimaryButton
      disableRipple
      mat-raised-button
      [uk2ButtonSize]="mediumButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- Large primary button -->
    <button
      id="large-primary-button"
      uk2PrimaryButton
      disableRipple
      mat-raised-button
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- No loading attribute -->
    <button
      id="large-primary-button-no-loading-attr"
      uk2PrimaryButton
      disableRipple
      mat-raised-button
      [uk2ButtonSize]="largeButton"
    >
      Add
    </button>

    <!-- uk2PrimaryButton doesn't work with <a> </a> -->
    <a uk2PrimaryButton mat-raised-button [uk2ButtonSize]="largeButton" [uk2IsLoading]="isLoading" href="test">
      Not text button
    </a>

    <!-- uk2PrimaryButton doesn't work when no mat-button attribute -->
    <button
      id="large-primary-button-no-mat-button"
      uk2PrimaryButton
      disableRipple
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- uk2PrimaryButton doesn't work with color attribute -->
    <button
      id="large-primary-button-color-attr"
      color="primary"
      uk2PrimaryButton
      disableRipple
      mat-raised-button
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>
  `,
})
class TestComponent {
  smallButton = Uk2ButtonSizeEnum.small;
  mediumButton = Uk2ButtonSizeEnum.medium;
  largeButton = Uk2ButtonSizeEnum.large;
  isLoading = false;
}

describe('Uk2PrimaryButtonDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2PrimaryButtonDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render a small primary button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#small-primary-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-button-small')).toBeTrue();
  });

  it('should render a medium primary button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#medium-primary-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-button-medium')).toBeTrue();
  });

  it('should render a large primary button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-primary-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-button-large')).toBeTrue();
  });

  it('should only work with button elements', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let anchorElement: HTMLAnchorElement = containerElement.querySelector('a') ?? new HTMLAnchorElement();

    // act
    fixture.detectChanges();

    // assert
    expect(anchorElement.classList.contains('uk2-primary-button-large')).toBeFalse();
  });

  it('should render a large primary skeleton button with appropriated class name when isLoading = true', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-primary-button') ?? new HTMLButtonElement();

    component.isLoading = true;

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-button-skeleton')).toBeTrue();

    component.isLoading = false;

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-button-skeleton')).toBeFalse();
  });

  it('should not render a large primary skeleton button when no uk2IsLoading attribute', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-primary-button-no-loading-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-button-skeleton')).toBeFalse();
  });

  it('should not render primary button if there is no mat-button', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-primary-button-no-mat-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-button-large')).toBeFalse();
  });

  it('should not apply uk2PrimaryButton directive to button with color attribute different than "primary" ', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-primary-button-color-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-button-large')).toBeFalse();
  });
});
