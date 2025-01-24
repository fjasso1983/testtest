import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Uk2BottomSheetCalculatorDirective } from './uk2-bottom-sheet-calculator.directive';

describe('Uk2BottomSheetCalculatorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let bodyEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2BottomSheetCalculatorDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  beforeEach(() => {
    const content = fixture.debugElement.query(By.css('#uk2-bottom-sheet-body-content')).nativeElement as HTMLElement;
    content.style.height = '10px';
    bodyEl = fixture.debugElement.query(By.css('#uk2-bottom-sheet-body')).nativeElement as HTMLElement;
  });

  it('should calculate body max height', () => {
    fixture.detectChanges();
    const body = fixture.debugElement.query(By.css('#uk2-bottom-sheet-body')).nativeElement as HTMLElement;

    expect(body.style.maxHeight).toBe(`calc(-${50 + 80 + 100}px + 90vh)`);
  });

  it("should not show body's bottom transparency when body is not overflowing", () => {
    fixture.detectChanges();
    const transparency = fixture.debugElement.query(By.css('#uk2-bottom-sheet-body-transparency'))
      .nativeElement as HTMLElement;

    expect(transparency.style.visibility).toBe('hidden');
  });

  it('should trigger onChanges', async () => {
    bodyEl.style.height = '200px';
    const content = fixture.debugElement.query(By.css('#uk2-bottom-sheet-body-content')).nativeElement as HTMLElement;
    content.style.height = '1800px';

    const transparency = fixture.debugElement.query(By.css('#uk2-bottom-sheet-body-transparency'))
      .nativeElement as HTMLElement;

    scrollBody(10);

    fixture.detectChanges();

    scrollBody(100);

    expect(transparency.style.opacity).toBe('1');

    scrollBody(1800);

    expect(transparency.style.opacity).toBe('0');
  });

  it('should recalculate height and scroll when orientation changes after next tick', fakeAsync(() => {
    fixture.detectChanges();
    const body = fixture.debugElement.query(By.css('#uk2-bottom-sheet-body')).nativeElement as HTMLElement;

    body.style.maxHeight = '';

    expect(body.style.maxHeight).toBe('');

    triggerOrientation();

    tick();

    expect(body.style.maxHeight).toBe(`calc(-${50 + 80 + 100}px + 90vh)`);
  }));

  it('should recalculate height and scroll when screen change size', fakeAsync(() => {
    fixture.detectChanges();
    const body = fixture.debugElement.query(By.css('#uk2-bottom-sheet-body')).nativeElement as HTMLElement;

    body.style.maxHeight = '';

    expect(body.style.maxHeight).toBe('');

    triggerResize();

    tick(100);

    expect(body.style.maxHeight).toBe(`calc(-${50 + 80 + 100}px + 90vh)`);
  }));

  function scrollBody(y: number) {
    const scrollEvent = new Event('scroll');
    bodyEl.scrollTo(0, y);
    bodyEl.dispatchEvent(scrollEvent);
  }

  function triggerOrientation() {
    const orientationChangeEvent = new Event('orientationchange');
    window.dispatchEvent(orientationChangeEvent);
  }

  function triggerResize() {
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
  }
});

describe('Uk2BottomSheetCalculatorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponentWithOutContent, Uk2BottomSheetCalculatorDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponentWithOutContent);
  });

  it('should not calculate body max height', () => {
    fixture.detectChanges();
    const body = fixture.debugElement.query(By.css('#uk2-bottom-sheet-body')).nativeElement as HTMLElement;

    expect(body.style.maxHeight).toBe('calc(0px + 90vh)');
  });
});

describe('Uk2BottomSheetCalculatorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponentWithBody, Uk2BottomSheetCalculatorDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponentWithBody);
  });

  it('should not calculate nothing because body is not in view', () => {
    fixture.detectChanges();

    const body = fixture.debugElement.query(By.css('#uk2-bottom-sheet-body'));

    expect(body).toBeNull();
  });
});

@Component({
  template: `
    <div id="uk2-bottom-sheet" uk2BottomSheetCalculator [uk2IsLoading]="isLoading">
      <div id="uk2-bottom-sheet-bar" style="height: 50px"></div>
      <div id="uk2-bottom-sheet-title-container" style="height: 80px"></div>
      <div id="uk2-bottom-sheet-body" style="overflow-y: scroll">
        <p id="uk2-bottom-sheet-body-content">lorem ipsum</p>
      </div>
      <div id="uk2-bottom-sheet-body-transparency"></div>
      <div id="uk2-bottom-sheet-footer-container" style="height: 100px"></div>
    </div>
  `,
})
export class TestComponent {
  isLoading = false;
}

@Component({
  template: `
    <div id="uk2-bottom-sheet" uk2BottomSheetCalculator [uk2IsLoading]="isLoading">
      <div id="uk2-bottom-sheet-body" style="overflow-y: scroll">
        <p id="uk2-bottom-sheet-body-content">lorem ipsum</p>
      </div>
      <div id="uk2-bottom-sheet-body-transparency"></div>
    </div>
  `,
})
export class TestComponentWithOutContent {
  isLoading = false;
}

@Component({
  template: `
    <div id="uk2-bottom-sheet" uk2BottomSheetCalculator [uk2IsLoading]="isLoading">
      <div id="uk2-bottom-sheet-bar" style="height: 50px"></div>
      <div id="uk2-bottom-sheet-title-container" style="height: 80px"></div>
      <div id="uk2-bottom-sheet-footer-container" style="height: 100px"></div>
    </div>
  `,
})
export class TestComponentWithBody {
  isLoading = false;
}
