import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2ButtonSizeEnum } from '../enums';
import { Uk2SecondaryIconButtonDirective } from './uk2-secondary-icon-button.directive';

@Component({
  template: `
    <!-- Small secondary icon button -->
    <button
      id="small-secondary-icon-button"
      uk2SecondaryIconButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="smallButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- Medium secondary icon button -->
    <button
      id="medium-secondary-icon-button"
      uk2SecondaryIconButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="mediumButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- Large secondary icon button -->
    <button
      id="large-secondary-icon-button"
      uk2SecondaryIconButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- No loading attribute -->
    <button
      id="large-secondary-icon-button-no-loading-attr"
      uk2SecondaryIconButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="largeButton"
    >
      Add
    </button>

    <!-- uk2SecondaryIconButton doesn't work with <a> </a> -->
    <a uk2SecondaryIconButton mat-stroked-button [uk2ButtonSize]="largeButton" [uk2IsLoading]="isLoading" href="test">
      Not text button
    </a>

    <!-- uk2SecondaryIconButton doesn't work when no mat-stroked-button attribute -->
    <button
      id="large-secondary-icon-button-no-mat-button"
      uk2SecondaryIconButton
      disableRipple
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- uk2SecondaryIconButton doesn't work with color attribute -->
    <button
      id="large-secondary-icon-button-color-attr"
      color="secondary"
      uk2SecondaryIconButton
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

describe('uk2SecondaryIconButtonDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2SecondaryIconButtonDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render a small secondary icon button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#small-secondary-icon-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-icon-button-small')).toBeTrue();
  });

  it('should render a medium secondary icon button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#medium-secondary-icon-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-icon-button-medium')).toBeTrue();
  });

  it('should render a large secondary icon button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-secondary-icon-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-icon-button-large')).toBeTrue();
  });

  it('should only work with button elements', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let anchorElement: HTMLAnchorElement = containerElement.querySelector('a') ?? new HTMLAnchorElement();

    // act
    fixture.detectChanges();

    // assert
    expect(anchorElement.classList.contains('uk2-secondary-icon-button-large')).toBeFalse();
  });

  it('should render a large secondary skeleton button with appropriated class name when isLoading = true', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-secondary-icon-button') ?? new HTMLButtonElement();

    component.isLoading = true;

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-icon-button-skeleton')).toBeTrue();

    component.isLoading = false;

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-icon-button-skeleton')).toBeFalse();
  });

  it('should not render a large secondary skeleton button when no uk2IsLoading attribute', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-secondary-icon-button-no-loading-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-icon-button-skeleton')).toBeFalse();
  });

  it('should not render secondary icon button if there is no mat-button', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-secondary-icon-button-no-mat-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-icon-button-large')).toBeFalse();
  });

  it('should not apply uk2SecondaryIconButton directive to button with color attribute different than "secondary" ', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-secondary-icon-button-color-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-secondary-icon-button-large')).toBeFalse();
  });
});
