import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { Uk2BottomSheetOptionHelperDirective } from './uk2-bottom-sheet-option-helper.directive';

describe('Uk2BottomSheetOptionHelperDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2BottomSheetOptionHelperDirective],
      imports: [CommonModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should render htmlElement', () => {
    const contentEl = fixture.debugElement.query(By.css('#dynamic-element')).nativeElement;

    expect(contentEl.innerText).toEqual('It worked!');
  });
});

@Component({
  template: `
    <div [uk2BottomSheetOptionHelper]="testElement"></div>
  `,
})
class TestComponent implements OnInit {
  testElement!: HTMLElement;

  ngOnInit() {
    this.testElement = document.createElement('div');
    this.testElement.id = 'dynamic-element';
    this.testElement.innerText = 'It worked!';
  }
}
