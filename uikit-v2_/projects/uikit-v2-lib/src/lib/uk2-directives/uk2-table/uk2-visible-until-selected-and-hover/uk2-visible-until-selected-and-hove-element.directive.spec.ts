import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { UK2_TABLE_ELEMENT_VISIBLE_SELECTED_AND_HOVER_CSS_CLASS } from '../constants';
import { Uk2VisibleUntilSelectedAndHoverElementDirective } from './uk2-visible-until-selected-and-hover-element.directive';

describe('Uk2VisibleUntilSelectedAndHoverElementDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2VisibleUntilSelectedAndHoverElementDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add uk2-class', () => {
    const directive = fixture.nativeElement.querySelector('div');

    expect(directive).toBeTruthy();
    expect(directive.classList.contains(UK2_TABLE_ELEMENT_VISIBLE_SELECTED_AND_HOVER_CSS_CLASS)).toBeTrue();
  });
});

@Component({
  template: ` <div uk2VisibleUntilSelectedAndHoverElement></div> `,
})
class TestComponent {}
