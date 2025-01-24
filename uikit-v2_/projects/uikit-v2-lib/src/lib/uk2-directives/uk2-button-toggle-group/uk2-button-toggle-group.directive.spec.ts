import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from 'projects/uikit-v2-docs/src/app/app-material.module';
import { Uk2ButtonToggleGroupDirective } from './uk2-button-toggle-group.directive';
import { UK2_BUTTON_TOGGLE_GROUP_CLASSES } from './constants/constants';
import { Uk2ButtonToggleGroupSizeEnum } from './enums';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  template: `
    <mat-button-toggle-group uk2ButtonToggleGroup [uk2IsLoading]="isLoading" [size]="size">
      <mat-button-toggle value="bold">
        <label>Bold</label>
        <label data-counter>2</label>
      </mat-button-toggle>
      <mat-button-toggle value="italic">
        <label>Italic</label>
        <label data-counter>3</label>
      </mat-button-toggle>
      <mat-button-toggle value="underline">
        <label>Underline</label>
        <label data-counter>45</label>
      </mat-button-toggle>
    </mat-button-toggle-group>

    <mat-button-toggle-group
      uk2ButtonToggleGroup
      appearance="legacy"
      id="not-directive-render-appearance"
      [uk2IsLoading]="isLoading"
      [size]="size"
    >
      <mat-button-toggle value="bold">
        <label>Bold</label>
        <label data-counter>2</label>
      </mat-button-toggle>
      <mat-button-toggle value="italic">
        <label>Italic</label>
        <label data-counter>3</label>
      </mat-button-toggle>
      <mat-button-toggle value="underline">
        <label>Underline</label>
        <label data-counter>45</label>
      </mat-button-toggle>
    </mat-button-toggle-group>

    <mat-button-toggle-group
      uk2ButtonToggleGroup
      multiple
      id="not-directive-render-multiple"
      [uk2IsLoading]="isLoading"
      [size]="size"
    >
      <mat-button-toggle value="bold">
        <label>Bold</label>
        <label data-counter>2</label>
      </mat-button-toggle>
      <mat-button-toggle value="italic">
        <label>Italic</label>
        <label data-counter>3</label>
      </mat-button-toggle>
      <mat-button-toggle value="underline">
        <label>Underline</label>
        <label data-counter>45</label>
      </mat-button-toggle>
    </mat-button-toggle-group>

    <mat-button-toggle-group
      vertical
      uk2ButtonToggleGroup
      multiple
      id="not-directive-render-vertical"
      [uk2IsLoading]="isLoading"
      [size]="size"
    >
      <mat-button-toggle value="bold">
        <label>Bold</label>
        <label data-counter>2</label>
      </mat-button-toggle>
      <mat-button-toggle value="italic">
        <label>Italic</label>
        <label data-counter>3</label>
      </mat-button-toggle>
      <mat-button-toggle value="underline">
        <label>Underline</label>
        <label data-counter>45</label>
      </mat-button-toggle>
    </mat-button-toggle-group>
  `,
})
class TestComponent {
  isLoading = true;
  size = Uk2ButtonToggleGroupSizeEnum.small;
}

describe('Uk2ButtonToggleGroupDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2ButtonToggleGroupDirective],
      imports: [AppMaterialModule, BrowserAnimationsModule, MatButtonToggleModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  //DOM Testing
  it('should render an mat-checkbox with appropriated class name', () => {
    // arrange
    let groupElement: HTMLElement = fixture.nativeElement.querySelector('mat-button-toggle-group');
    let itemsElement = groupElement.querySelectorAll('mat-button-toggle');

    // act
    fixture.detectChanges();

    // assert
    expect(groupElement.classList.contains(UK2_BUTTON_TOGGLE_GROUP_CLASSES.group)).toBeTrue();
    itemsElement.forEach(element => {
      expect(element.classList.contains(UK2_BUTTON_TOGGLE_GROUP_CLASSES.item)).toBeTrue();
      expect(
        element.querySelector('label:not([data-counter])')?.classList.contains(UK2_BUTTON_TOGGLE_GROUP_CLASSES.label)
      ).toBeTrue();
      expect(
        element.querySelector('label[data-counter]')?.classList.contains(UK2_BUTTON_TOGGLE_GROUP_CLASSES.counter)
      ).toBeTrue();
    });
  });

  it('should has skeleton state', () => {
    // arrange
    let groupElement: HTMLElement = fixture.nativeElement.querySelector('mat-button-toggle-group');

    // act
    component.isLoading = true;
    fixture.detectChanges();

    // assert
    expect(groupElement.classList.contains(UK2_BUTTON_TOGGLE_GROUP_CLASSES.skeleton)).toBeTrue();

    // act
    component.isLoading = false;
    fixture.detectChanges();

    // assert
    expect(!groupElement.classList.contains(UK2_BUTTON_TOGGLE_GROUP_CLASSES.skeleton)).toBeTrue();
  });

  it('should has render large buttons', () => {
    // arrange
    let groupElement: HTMLElement = fixture.nativeElement.querySelector('mat-button-toggle-group');

    // act
    component.size = Uk2ButtonToggleGroupSizeEnum.medium;
    fixture.detectChanges();

    // assert
    expect(groupElement.classList.contains(UK2_BUTTON_TOGGLE_GROUP_CLASSES.medium)).toBeTrue();
  });

  it('should has render small buttons', () => {
    // arrange
    let groupElement: HTMLElement = fixture.nativeElement.querySelector('mat-button-toggle-group');

    // act
    component.size = Uk2ButtonToggleGroupSizeEnum.small;
    fixture.detectChanges();

    // assert
    expect(groupElement.classList.contains(UK2_BUTTON_TOGGLE_GROUP_CLASSES.small)).toBeTrue();
  });

  it('directive should not be applied in elements with attribute appearance', () => {
    // arrange
    let groupElement: HTMLElement = fixture.nativeElement.querySelector('#not-directive-render-appearance');

    // act
    fixture.detectChanges();

    // assert
    expect(groupElement.classList.contains(UK2_BUTTON_TOGGLE_GROUP_CLASSES.group)).toBeFalse();
  });

  it('directive should not be applied in elements with attribute multiple', () => {
    // arrange
    let groupElement: HTMLElement = fixture.nativeElement.querySelector('#not-directive-render-multiple');

    // act
    fixture.detectChanges();

    // assert
    expect(groupElement.classList.contains(UK2_BUTTON_TOGGLE_GROUP_CLASSES.group)).toBeFalse();
  });

  it('directive should not be applied in elements with attribute vertical', () => {
    // arrange
    let groupElement: HTMLElement = fixture.nativeElement.querySelector('#not-directive-render-vertical');

    // act
    fixture.detectChanges();

    // assert
    expect(groupElement.classList.contains(UK2_BUTTON_TOGGLE_GROUP_CLASSES.group)).toBeFalse();
  });
});
