import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2DeterminateProgressBarDirective } from './uk2-determinate-progress-bar.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  template: `
    <div uk2DeterminateProgressBar id="wrongElement" mode="determinate"></div>
    <mat-progress-bar uk2DeterminateProgressBar id="validBar" mode="determinate"></mat-progress-bar>
    <mat-progress-bar uk2DeterminateProgressBar id="colorBar" mode="determinate" color="'accent'"></mat-progress-bar>
    <mat-progress-bar uk2DeterminateProgressBar id="nonDeterminateBar" mode="indeterminate"></mat-progress-bar>
  `,
})
class TestComponent {}

describe('Uk2DeterminateProgressBarDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2DeterminateProgressBarDirective],
      imports: [MatProgressBarModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should work on mat-progress-bar with determinate mode and no color attribute', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let matProgressBarElement: HTMLElement = containerElement.querySelector('#validBar') ?? new HTMLElement();

    // act
    fixture.detectChanges();

    // assert
    expect(matProgressBarElement.getAttribute('uk2DeterminateProgressBar')).not.toBeNull();
    expect(matProgressBarElement.getAttribute('color')).toBeNull();
    expect(matProgressBarElement.getAttribute('mode')).toBe('determinate');
    expect(matProgressBarElement.classList.contains('uk2-determinate-progress-bar')).toBeTrue();
  });

  it('should not work with a color attribute on mat-progress-bar', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let matProgressBarElement: HTMLElement = containerElement.querySelector('#colorBar') ?? new HTMLElement();

    // act
    fixture.detectChanges();

    // assert
    expect(matProgressBarElement.getAttribute('uk2DeterminateProgressBar')).not.toBeNull();
    expect(matProgressBarElement.getAttribute('color')).not.toBeNull();
    expect(matProgressBarElement.classList.contains('uk2-determinate-progress-bar')).toBeFalse();
  });

  it('should not work with a non determinate mode on mat-progress-bar', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let matProgressBarElement: HTMLElement = containerElement.querySelector('#nonDeterminateBar') ?? new HTMLElement();

    // act
    fixture.detectChanges();

    // assert
    expect(matProgressBarElement.getAttribute('uk2DeterminateProgressBar')).not.toBeNull();
    expect(matProgressBarElement.getAttribute('mode')).not.toBeNull();
    expect(matProgressBarElement.getAttribute('mode')).not.toBe('determinate');
    expect(matProgressBarElement.classList.contains('uk2-determinate-progress-bar')).toBeFalse();
  });

  it('should only work on mat-progress-bar', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let wrongBarElement: HTMLElement = containerElement.querySelector('#wrongElement') ?? new HTMLElement();

    // act
    fixture.detectChanges();

    // assert
    expect(wrongBarElement.getAttribute('uk2DeterminateProgressBar')).not.toBeNull();
    expect(wrongBarElement.classList.contains('uk2-determinate-progress-bar')).toBeFalse();
  });

  it('should add an inner bar element', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let matProgressBarElement: HTMLElement = containerElement.querySelector('#validBar') ?? new HTMLElement();

    // act
    fixture.detectChanges();
    let innerProgressBar = matProgressBarElement.querySelector('.uk2-inner-progress-bar') ?? new HTMLElement();

    // assert
    expect(innerProgressBar).not.toBeNull();
  });
});
