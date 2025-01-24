import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Uk2BottomSheetStyleDirective } from './uk2-bottom-sheet-styles.directive';

describe('Uk2BottomSheetStyleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2BottomSheetStyleDirective],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add uk2 class to mat-bottom-sheet-container', () => {
    const containerEl = fixture.debugElement.query(By.css('#bottom-sheet-container')).nativeElement as HTMLElement;

    expect(containerEl.classList.contains('uk2-bottom-sheet-container')).toBeTrue();
  });

  it('should remove skeleton class to mat-bottom-sheet-container', () => {
    componentNotLoading();
    const containerEl = fixture.debugElement.query(By.css('#bottom-sheet-container')).nativeElement as HTMLElement;

    expect(containerEl.classList.contains('uk2-bottom-sheet-container-skeleton')).toBeFalse();
  });
  it('should add skeleton class to mat-bottom-sheet-container', () => {
    componentLoading();
    const containerEl = fixture.debugElement.query(By.css('#bottom-sheet-container')).nativeElement as HTMLElement;

    expect(containerEl.classList.contains('uk2-bottom-sheet-container-skeleton')).toBeTrue();
  });

  function componentLoading() {
    component.isLoading = true;
    fixture.detectChanges();
  }

  function componentNotLoading() {
    component.isLoading = false;
    fixture.detectChanges();
  }
});

@Component({
  template: `
    <mat-bottom-sheet-container id="bottom-sheet-container">
      <div id="uk2-bottom-sheet" uk2BottomSheetStyle [uk2IsLoading]="isLoading"></div>
    </mat-bottom-sheet-container>
  `,
})
export class TestComponent {
  isLoading = false;
}

describe('Uk2BottomSheetStyleDirective', () => {
  let fixture: ComponentFixture<TestComponentWithoutMatBottomSheet>;
  let component: TestComponentWithoutMatBottomSheet;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponentWithoutMatBottomSheet, Uk2BottomSheetStyleDirective],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(TestComponentWithoutMatBottomSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not add uk2 classes to mat-bottom-sheet-container', () => {
    const containerEl = fixture.debugElement.query(By.css('#bottom-sheet-container'));

    expect(containerEl).toBeNull();
  });
});
@Component({
  template: `
    <div id="uk2-bottom-sheet" uk2BottomSheetStyle [uk2IsLoading]="isLoading"></div>
  `,
})
export class TestComponentWithoutMatBottomSheet {
  isLoading = false;
}
