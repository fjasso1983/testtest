import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2LoadingSpinnerDirective } from './uk2-loading-spinner.directive';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <mat-spinner id="validSpinner" uk2LoadingSpinner [uk2Diameter]="diameter" [uk2StrokeWidth]="stroke"></mat-spinner>
    <mat-spinner id="spinnerColor" uk2LoadingSpinner color="primary"></mat-spinner>
    <div id="invalidElement" uk2LoadingSpinner></div>
  `,
})
class TestComponent {
  diameter = 32;
  stroke = 4;
}

describe('Uk2LoadingSpinnerDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2LoadingSpinnerDirective],
      imports: [MatProgressSpinnerModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should add uk2-loading-spinner class to a valid mat-spinner element', () => {
    const spinnerElement = fixture.debugElement.query(By.css('#validSpinner')).nativeElement as HTMLElement;
    fixture.detectChanges();

    expect(spinnerElement.classList.contains('uk2-loading-spinner')).toBeTruthy();
  });

  it('should not work on mat-spinner element with a color attribute', () => {
    const spinnerElement = fixture.debugElement.query(By.css('#spinnerColor')).nativeElement as HTMLElement;
    fixture.detectChanges();

    expect(spinnerElement.classList.contains('uk2-loading-spinner')).not.toBeTruthy();
  });

  it('should not work on a non mat-spinner element', () => {
    const invalidElement = fixture.debugElement.query(By.css('#invalidElement')).nativeElement as HTMLElement;
    fixture.detectChanges();

    expect(invalidElement.classList.contains('uk2-loading-spinner')).not.toBeTruthy();
  });

  it('should change mat-spinner diameter value', () => {
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('#validSpinner'));
    const matSpinnerInstance = spinnerElement.injector.get(MatProgressSpinner);
    component.diameter = 64;
    fixture.detectChanges();

    expect(matSpinnerInstance.diameter).toEqual(64);
  });

  it('should change mat-spinner stroke width value', () => {
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('#validSpinner'));
    const matSpinnerInstance = spinnerElement.injector.get(MatProgressSpinner);
    component.stroke = 2;
    fixture.detectChanges();

    expect(matSpinnerInstance.strokeWidth).toEqual(2);
  });
});
