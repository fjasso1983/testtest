import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Uk2ServicesModule } from '@axos/uikit-v2-lib/src/public-api';
import { AppMaterialModule } from 'projects/uikit-v2-docs/src/app/app-material.module';
import { Uk2CheckboxDirective } from './uk2-checkbox.directive';

@Component({
  template: `
    <div>
      <mat-checkbox uk2Checkbox disableRipple></mat-checkbox>
      <mat-checkbox
        uk2Checkbox
        disableRipple
        class="checkbox-test-skeleton"
        [uk2IsLoading]="isLoadingSkeleton"
      ></mat-checkbox>
      <mat-checkbox class="checkbox-test-2"></mat-checkbox>
      <mat-checkbox class="checkbox-color-attr" color="primary"></mat-checkbox>
    </div>
  `,
})
class TestComponent {
  isLoadingSkeleton = true;
}

describe('Uk2CheckboxDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2CheckboxDirective],
      imports: [AppMaterialModule, BrowserAnimationsModule, Uk2ServicesModule],
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
    let containerElement: HTMLElement = fixture.nativeElement;
    let matCheckboxElement: HTMLElement = containerElement.querySelector('mat-checkbox') ?? new HTMLElement();

    // act
    fixture.detectChanges();

    // assert
    expect(matCheckboxElement.classList.contains('uk2-checkbox')).toBeTrue();
  });

  it('should only work on mat-checkbox without color attribute', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let matCheckboxElement: HTMLElement = containerElement.querySelector('.checkbox-color-attr') ?? new HTMLElement();

    // act
    fixture.detectChanges();

    // assert
    expect(matCheckboxElement.classList.contains('uk2-checkbox')).toBeFalse();
  });

  it('should has skeleton state', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let matCheckboxElement: HTMLElement =
      containerElement.querySelector('.checkbox-test-skeleton') ?? new HTMLElement();

    // act
    component.isLoadingSkeleton = true;
    fixture.detectChanges();

    // assert
    expect(matCheckboxElement.classList.contains('uk2-hidden')).toBeTrue();

    // act
    component.isLoadingSkeleton = false;
    fixture.detectChanges();

    // assert
    expect(matCheckboxElement.classList.contains('uk2-hidden')).toBeFalse();
  });
});
