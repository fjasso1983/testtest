import { Uk2FileViewerPageControlDirective } from './uk2-file-viewer-page-control.directive';
import { Component, ElementRef, NO_ERRORS_SCHEMA, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div uk2FileViewerPageControl [uk2FileViewerPageSize]="pageSize">
      <input type="text" />
    </div>
  `,
})
class TestComponent {
  pageSize: number | undefined;
}

describe('Uk2FileViewerPageControlDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directive: Uk2FileViewerPageControlDirective;
  let inputElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2FileViewerPageControlDirective],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const directiveEl = debugElement.query(By.directive(Uk2FileViewerPageControlDirective));
    directive = directiveEl.injector.get(Uk2FileViewerPageControlDirective);
    inputElement = directiveEl.nativeElement.querySelector('input');
  });

  it('should add class "uk2-file-viewer-page-control"', () => {
    expect(directive['domElement'].classList.contains('uk2-file-viewer-page-control')).toBeTrue();
  });

  it('should set the correct width for the input depending on the page number digits', () => {
    component.pageSize = 64;
    fixture.detectChanges();

    expect(inputElement.style.width).toBe('26px'); // 10 + 2*8 = 26

    component.pageSize = 123;
    fixture.detectChanges();

    expect(inputElement.style.width).toBe('34px'); // 10 + 3*8 = 34
  });

  it('should set the minimum width when the page number is undefined', () => {
    component.pageSize = undefined;
    fixture.detectChanges();

    expect(inputElement.style.width).toBe('18px');
  });
});
