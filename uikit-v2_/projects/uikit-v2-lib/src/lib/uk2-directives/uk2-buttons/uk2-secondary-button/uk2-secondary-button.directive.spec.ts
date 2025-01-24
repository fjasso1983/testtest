import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2ButtonSizeEnum } from '../enums';
import { Uk2SecondaryButtonDirective } from './uk2-secondary-button.directive';

@Component({
  template: `
    <!-- Small secondary button -->
    <button
      id="small-secondary-button"
      uk2SecondaryButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="smallButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- Medium secondary button -->
    <button
      id="medium-secondary-button"
      uk2SecondaryButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="mediumButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- Large secondary button -->
    <button
      id="large-secondary-button"
      uk2SecondaryButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- No loading attribute -->
    <button
      id="large-secondary-button-no-loading-attr"
      uk2SecondaryButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="largeButton"
    >
      Add
    </button>

    <!-- Uk2SecondaryButtonDirective doesn't work with <a> </a> -->
    <a
      uk2SecondaryButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
      href="test"
    >
      Not text button
    </a>

    <!-- Uk2SecondaryButtonDirective doesn't work when no mat-button attribute -->
    <button
      id="large-secondary-button-no-mat-button"
      uk2SecondaryButton
      disableRipple
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- Uk2SecondaryButtonDirective doesn't work with color attribute -->
    <button
      id="large-secondary-button-color-attr"
      color="primary"
      uk2SecondaryButton
      disableRipple
      mat-stroked-button
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

describe('Uk2SecondaryButtonDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2SecondaryButtonDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render a small secondary button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#small-secondary-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-button-small')).toBeTrue();
  });

  it('should render a medium secondary button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#medium-secondary-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-button-medium')).toBeTrue();
  });

  it('should render a large secondary button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-secondary-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-button-large')).toBeTrue();
  });

  it('should only work with button elements', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let anchorElement: HTMLAnchorElement = containerElement.querySelector('a') ?? new HTMLAnchorElement();

    // act
    fixture.detectChanges();

    // assert
    expect(anchorElement.classList.contains('uk2-secondary-button-large')).toBeFalse();
  });

  it('should render a large secondary skeleton button with appropriated class name when isLoading = true', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-secondary-button') ?? new HTMLButtonElement();

    component.isLoading = true;

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-button-skeleton')).toBeTrue();
  });

  it('should not render a large secondary skeleton button when no uk2IsLoading attribute', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-secondary-button-no-loading-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-button-skeleton')).toBeFalse();
  });

  it('should not render secondary button if there is no mat-button', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-secondary-button-no-mat-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-button-large')).toBeFalse();
  });

  it('should not apply uk2SecondaryButton directive to button with color attribute different than "primary" ', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-secondary-button-color-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-button-large')).toBeFalse();
  });
});
