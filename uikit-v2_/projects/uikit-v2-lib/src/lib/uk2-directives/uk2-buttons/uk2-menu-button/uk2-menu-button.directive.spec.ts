import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2ButtonSizeEnum } from '../enums';
import { Uk2MenuButtonDirective } from './uk2-menu-button.directive';

@Component({
  template: `
    <!-- Small menu button -->
    <button
      id="small-menu-button"
      uk2MenuButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="smallButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- Medium menu button -->
    <button
      id="medium-menu-button"
      uk2MenuButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="mediumButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- Large menu button -->
    <button
      id="large-menu-button"
      uk2MenuButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- No loading attribute -->
    <button
      id="large-menu-button-no-loading-attr"
      uk2MenuButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="largeButton"
    >
      Add
    </button>

    <!-- Uk2MenuButtonDirective doesn't work with <a> </a> -->
    <a
      uk2MenuButton
      disableRipple
      mat-stroked-button
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
      href="test"
    >
      Not text button
    </a>

    <!-- Uk2MenuButtonDirective doesn't work when no mat-button attribute -->
    <button
      id="large-menu-button-no-mat-button"
      uk2MenuButton
      disableRipple
      [uk2ButtonSize]="largeButton"
      [uk2IsLoading]="isLoading"
    >
      Add
    </button>

    <!-- Uk2MenuButtonDirective doesn't work with color attribute -->
    <button
      id="large-menu-button-color-attr"
      color="primary"
      uk2MenuButton
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

describe('Uk2MenuButtonDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2MenuButtonDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should render a small menu button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#small-menu-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-menu-button-small')).toBeTrue();
  });

  it('should render a medium menu button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#medium-menu-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-menu-button-medium')).toBeTrue();
  });

  it('should render a large menu button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-menu-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-menu-button-large')).toBeTrue();
  });

  it('should only work with button elements', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let anchorElement: HTMLAnchorElement = containerElement.querySelector('a') ?? new HTMLAnchorElement();

    // act
    fixture.detectChanges();

    // assert
    expect(anchorElement.classList.contains('uk2-menu-button-large')).toBeFalse();
  });

  it('should render a large menu skeleton button with appropriated class name when isLoading = true', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-menu-button') ?? new HTMLButtonElement();

    component.isLoading = true;

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-menu-button-skeleton')).toBeTrue();
  });

  it('should not render a large menu skeleton button when no uk2IsLoading attribute', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-menu-button-no-loading-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-menu-button-skeleton')).toBeFalse();
  });

  it('should not render menu button if there is no mat-button', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-menu-button-no-mat-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-menu-button-large')).toBeFalse();
  });

  it('should not apply Uk2MenuButtonDirective directive to button with any color attribute', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#large-menu-button-color-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-menu-button-large')).toBeFalse();
  });
});
