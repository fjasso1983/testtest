import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2FlyoutMenuHeaderDirective } from './uk2-flyout-header.directive';

describe('Uk2FlyoutHeaderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2FlyoutMenuHeaderDirective],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have class uk2-flyout-menu-header', () => {
    const div = fixture.nativeElement.querySelector('div');
    expect(div.classList).toContain('uk2-flyout-menu-header');
  });
});

@Component({
  template: ` <div uk2FlyoutMenuHeader></div> `,
})
class TestComponent {}
