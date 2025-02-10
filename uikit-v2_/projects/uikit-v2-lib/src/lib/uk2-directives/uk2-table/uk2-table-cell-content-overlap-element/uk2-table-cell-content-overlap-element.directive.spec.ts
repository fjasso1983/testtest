import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Uk2TableCellContentOverlapElementDirective } from './uk2-table-cell-content-overlap-element.directive';
import { UK2_BUTTON_OVERLAP_ON_CELL_CONTENT_CLASS } from '../constants';

@Component({
  template: `<div uk2TableCellContentOverlapElement></div>`,
})
class TestComponent {}

describe('Uk2TableCellContentOverlapElementDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Uk2TableCellContentOverlapElementDirective, TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should add the class to the host element', () => {
    const divElement: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(divElement.classList).toContain(UK2_BUTTON_OVERLAP_ON_CELL_CONTENT_CLASS);
  });

  it('should not remove the class unless explicitly set to false', () => {
    const directiveInstance = fixture.debugElement.children[0].injector.get(Uk2TableCellContentOverlapElementDirective);

    expect(directiveInstance.uk2OverlapCellContent).toBeTrue();

    directiveInstance.uk2OverlapCellContent = false;
    fixture.detectChanges();

    const divElement: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(divElement.classList).not.toContain(UK2_BUTTON_OVERLAP_ON_CELL_CONTENT_CLASS);
  });
});
