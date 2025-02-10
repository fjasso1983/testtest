import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UK2_TABLE_ELEMENT_VISIBLE_HOVER_CSS_CLASS } from '../constants';
import { Uk2VisibleUntilHoverElementDirective } from './uk2-visible-until-hover-element.directive';

@Component({
  template: ` <div uk2VisibleUntilHoverElement></div> `,
})
class TestComponent {}

describe('Uk2VisibleUntilHoverElementDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2VisibleUntilHoverElementDirective],
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
    expect(directive.classList.contains(UK2_TABLE_ELEMENT_VISIBLE_HOVER_CSS_CLASS)).toBeTrue();
  });
});
