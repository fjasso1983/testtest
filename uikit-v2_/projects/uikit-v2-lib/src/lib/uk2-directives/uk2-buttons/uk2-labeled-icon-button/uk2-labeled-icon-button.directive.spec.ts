import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatIconModule } from '@angular/material/icon';

import { Uk2ButtonSizeEnum } from '../enums';
import { Uk2LabeledIconButtonDirective } from './uk2-labeled-icon-button.directive';
import { Uk2IconRegistryService } from '../../../uk2-services/uk2-icon-registry/uk2-icon-registry.service';
import { Uk2Tier1FilesEnum, Uk2Tier3Enum } from '../../../uk2-services/uk2-icon-registry/enums';
import { Uk2ServicesModule } from '../../../uk2-services';
import { uk2LabeledIconButtonErrorConstants } from './constants/constants';
import { Uk2LabeledIconPositionEnum } from './enums';

@Component({
  template: `
    <!-- Small labeled icon button -->
    <button
      id="small-labeled-icon-button"
      uk2LabeledIconButton
      disableRipple
      mat-button
      [uk2ButtonSize]="smallButton"
      [uk2IsLoading]="isLoading"
      [uk2LabeledIconPosition]="uk2LabeledIconPositionRight"
    >
      edit
      <mat-icon [svgIcon]="icon"></mat-icon>
    </button>

    <!-- Medium labeled icon button -->
    <button
      id="medium-labeled-icon-button"
      uk2LabeledIconButton
      disableRipple
      mat-button
      [uk2ButtonSize]="mediumButton"
      [uk2IsLoading]="isLoading"
      [uk2LabeledIconPosition]="uk2LabeledIconPositionLeft"
    >
      edit
      <mat-icon [svgIcon]="icon"></mat-icon>
    </button>

    <!-- No loading attribute -->
    <button
      id="medium-labeled-icon-button-no-loading-attr"
      uk2LabeledIconButton
      disableRipple
      mat-button
      [uk2ButtonSize]="mediumButton"
    >
      edit
      <mat-icon [svgIcon]="icon"></mat-icon>
    </button>

    <!-- Uk2LabeledIconButtonDirective doesn't work with <a> </a> -->
    <a uk2LabeledIconButton mat-button [uk2ButtonSize]="mediumButton" [uk2IsLoading]="isLoading" href="test">
      Not labeled button
    </a>

    <!-- Uk2LabeledIconButtonDirective doesn't work when no mat-button attribute -->
    <button
      id="medium-labeled-icon-button-no-mat-button"
      uk2LabeledIconButton
      disableRipple
      [uk2ButtonSize]="mediumButton"
      [uk2IsLoading]="isLoading"
    >
      edit
      <mat-icon [svgIcon]="icon"></mat-icon>
    </button>

    <!-- Uk2LabeledIconButtonDirective doesn't work with color attribute -->
    <button
      id="medium-labeled-icon-button-color-attr"
      color="primary"
      uk2LabeledIconButton
      disableRipple
      mat-button
      [uk2ButtonSize]="mediumButton"
      [uk2IsLoading]="isLoading"
    >
      edit
      <mat-icon [svgIcon]="icon"></mat-icon>
    </button>

    <!-- Uk2LabeledIconButtonDirective doesn't work with large size attribute -->
    <button
      id="large-labeled-icon-button"
      uk2LabeledIconButton
      disableRipple
      mat-button
      [uk2ButtonSize]="switchLarge"
      [uk2IsLoading]="isLoading"
    >
      edit
      <mat-icon [svgIcon]="icon"></mat-icon>
    </button>
  `,
})
class TestComponent {
  smallButton = Uk2ButtonSizeEnum.small;
  mediumButton = Uk2ButtonSizeEnum.medium;
  isLoading = false;
  switchLarge = Uk2ButtonSizeEnum.medium;
  icon = Uk2Tier1FilesEnum.pencil;
  text: string = 'Text will be delete';
  uk2LabeledIconPositionLeft = Uk2LabeledIconPositionEnum.left;
  uk2LabeledIconPositionRight = Uk2LabeledIconPositionEnum.right;
}

describe('Uk2LabeledIconButtonDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let serviceRegistryIcon: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2LabeledIconButtonDirective],
      imports: [Uk2ServicesModule, MatButtonModule, MatIconModule, MatIconTestingModule, HttpClientModule],
      providers: [Uk2IconRegistryService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    serviceRegistryIcon = TestBed.inject(Uk2IconRegistryService);
    serviceRegistryIcon.registerAllCategories();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render a small labeled icon button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#small-labeled-icon-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-labeled-icon-button-small')).toBeTrue();
  });

  it('should apply uk2-labeled-icon-right when uk2LabeledIconPosition == right', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#small-labeled-icon-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-labeled-icon-right')).toBeTrue();
  });

  it('should NOT apply uk2-labeled-icon-right when uk2LabeledIconPosition == left', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#medium-labeled-icon-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-labeled-icon-right')).toBeFalse();
  });

  it('should render a medium labeled icon button with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#medium-labeled-icon-button') ?? new HTMLButtonElement();
    // act
    fixture.detectChanges();
    // assert
    expect(buttonElement.classList.contains('uk2-labeled-icon-button-medium')).toBeTrue();
  });

  it('should thrown error when size == large', () => {
    component.switchLarge = Uk2ButtonSizeEnum.large;
    // assert
    expect(() => fixture.detectChanges()).toThrowError(uk2LabeledIconButtonErrorConstants.errorLarge);
  });

  it('should thrown error when icon is not Tier1 ', () => {
    component.switchLarge = Uk2ButtonSizeEnum.large;
    // assert
    expect(() => fixture.detectChanges()).toThrowError(uk2LabeledIconButtonErrorConstants.errorLarge);
  });

  it('should only work with button elements', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let anchorElement: HTMLAnchorElement = containerElement.querySelector('a') ?? new HTMLAnchorElement();

    // act
    fixture.detectChanges();

    // assert
    expect(anchorElement.classList.contains('uk2-labeled-icon-button-medium')).toBeFalse();
  });

  it('should render a medium labeled skeleton button with appropriated class name when isLoading = true', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#medium-labeled-icon-button') ?? new HTMLButtonElement();

    component.isLoading = true;

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-labeled-icon-button-skeleton')).toBeTrue();

    component.isLoading = false;

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-labeled-icon-button-skeleton')).toBeFalse();
  });

  it('should not render a medium labeled skeleton button when no uk2IsLoading attribute', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#medium-labeled-icon-button-no-loading-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-labeled-icon-button-skeleton')).toBeFalse();
  });

  it('should not render labeled icon button if there is no mat-button', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#medium-labeled-icon-button-no-mat-button') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-labeled-icon-button-medium')).toBeFalse();
  });

  it('should not apply uk2LabeledIconButton directive to button with color attribute ', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let buttonElement: HTMLButtonElement =
      containerElement.querySelector('#medium-labeled-icon-button-color-attr') ?? new HTMLButtonElement();

    // act
    fixture.detectChanges();

    // assert
    expect(buttonElement.classList.contains('uk2-labeled-icon-button-medium')).toBeFalse();
  });
});

@Component({
  template: `
    <!-- Uk2LabeledIconButtonDirective doesn't work without text -->
    <button
      id="text-labeled-icon-button"
      uk2LabeledIconButton
      disableRipple
      mat-button
      [uk2ButtonSize]="mediumButton"
      [uk2IsLoading]="isLoading"
    >
      <mat-icon [svgIcon]="icon"></mat-icon>
    </button>
  `,
})
class TestWithEmptyTextComponent {
  mediumButton = Uk2ButtonSizeEnum.medium;
  isLoading = false;
  icon = Uk2Tier1FilesEnum.pencil;
  text: string = 'Text will be delete';
}

describe('Uk2LabeledIconButtonDirective empty text', () => {
  let component: TestWithEmptyTextComponent;
  let fixture: ComponentFixture<TestWithEmptyTextComponent>;
  let serviceRegistryIcon: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestWithEmptyTextComponent, Uk2LabeledIconButtonDirective],
      imports: [Uk2ServicesModule, MatButtonModule, MatIconModule, MatIconTestingModule, HttpClientModule],
      providers: [Uk2IconRegistryService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    serviceRegistryIcon = TestBed.inject(Uk2IconRegistryService);
    serviceRegistryIcon.registerAllCategories();
    fixture = TestBed.createComponent(TestWithEmptyTextComponent);
    component = fixture.componentInstance;
  });

  it('should thrown error when text is empty', () => {
    expect(() => fixture.detectChanges()).toThrowError(uk2LabeledIconButtonErrorConstants.errorEmptyText);
  });
});

@Component({
  template: `
    <button
      id="icon3-labeled-icon-button"
      uk2LabeledIconButton
      disableRipple
      mat-button
      [uk2ButtonSize]="mediumButton"
      [uk2IsLoading]="isLoading"
    >
      hello
      <mat-icon [svgIcon]="icon"></mat-icon>
    </button>
  `,
})
class TestIcon3Component {
  mediumButton = Uk2ButtonSizeEnum.medium;
  isLoading = false;
  icon = Uk2Tier3Enum.bagHand;
  text: string = 'Text will be delete';
}

describe('Uk2LabeledIconButtonDirective with icon tier 3', () => {
  let component: TestIcon3Component;
  let fixture: ComponentFixture<TestIcon3Component>;
  let serviceRegistryIcon: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestIcon3Component, Uk2LabeledIconButtonDirective],
      imports: [Uk2ServicesModule, MatButtonModule, MatIconModule, MatIconTestingModule, HttpClientModule],
      providers: [Uk2IconRegistryService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(async () => {
    serviceRegistryIcon = TestBed.inject(Uk2IconRegistryService);
    serviceRegistryIcon.registerAllCategories();
    fixture = TestBed.createComponent(TestIcon3Component);
    component = fixture.componentInstance;
  });

  it('should thrown error when icon is not Tiers 1', async () => {
    await fixture.whenStable();
    expect(() => fixture.detectChanges()).toThrowError(uk2LabeledIconButtonErrorConstants.errorTierIcon);
  });
});
