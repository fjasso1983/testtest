import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2ButtonSizeEnum } from '../enums';
import { Uk2PrimaryIconButtonDirective } from './uk2-primary-icon-button.directive';

@Component({
  template: `
    <!-- Small primary icon button -->
    <button
      id="small-primary-icon-button"
      uk2PrimaryIconButton
      disableRipple
      mat-icon-button
      [uk2ButtonSize]="smallButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- Medium primary icon button -->
    <button
      id="medium-primary-icon-button"
      uk2PrimaryIconButton
      disableRipple
      mat-icon-button
      [uk2ButtonSize]="mediumButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- Large primary icon button -->
    <button
      id="large-primary-icon-button"
      uk2PrimaryIconButton
      disableRipple
      mat-icon-button
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- No loading attribute -->
    <button
      id="large-primary-icon-button-no-loading-attr"
      uk2PrimaryIconButton
      disableRipple
      mat-icon-button
      [uk2ButtonSize]="largeButton"
    >
      Add
    </button>

    <!-- uk2PrimaryIconButton doesn't work with <a> </a> -->
    <a uk2PrimaryIconButton mat-icon-button [uk2ButtonSize]="largeButton" [uk2IsLoading]="isLoading" href="test">
      Not text button
    </a>

    <!-- uk2PrimaryIconButton doesn't work when no mat-icon-button attribute -->
    <button
      id="large-primary-icon-button-no-mat-button"
      uk2PrimaryIconButton
      disableRipple
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- uk2PrimaryIconButton doesn't work with color attribute -->
    <button
      id="large-primary-icon-button-color-attr"
      color="primary"
      uk2PrimaryIconButton
      disableRipple
      mat-icon-button
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

describe('Uk2PrimaryIconButtonDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2PrimaryIconButtonDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render a small primary icon button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#small-primary-icon-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-icon-button-small')).toBeTrue();
  });

  it('should render a medium primary icon button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#medium-primary-icon-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-icon-button-medium')).toBeTrue();
  });

  it('should render a large primary icon button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-primary-icon-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-icon-button-large')).toBeTrue();
  });

  it('should only work with button elements', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let anchorElement: HTMLAnchorElement = containerElement.querySelector('a') ?? new HTMLAnchorElement();

    // act
    fixture.detectChanges();

    // assert
    expect(anchorElement.classList.contains('uk2-primary-icon-button-large')).toBeFalse();
  });

  it('should render a large primary skeleton button with appropriated class name when isLoading = true', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-primary-icon-button') ?? new HTMLButtonElement();

    component.isLoading = true;

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-icon-button-skeleton')).toBeTrue();

    component.isLoading = false;

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-icon-button-skeleton')).toBeFalse();
  });

  it('should not render a large primary skeleton button when no uk2IsLoading attribute', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-primary-icon-button-no-loading-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-icon-button-skeleton')).toBeFalse();
  });

  it('should not render primary icon button if there is no mat-button', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-primary-icon-button-no-mat-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-icon-button-large')).toBeFalse();
  });

  it('should not apply uk2PrimaryIconButton directive to button with color attribute different than "primary" ', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-primary-icon-button-color-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-primary-icon-button-large')).toBeFalse();
  });
});
