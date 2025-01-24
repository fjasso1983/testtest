import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2FlyoutMenuFooterDirective } from './uk2-flyout-footer.directive';

describe('Uk2FlyoutFooterDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2FlyoutMenuFooterDirective],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have class uk2-flyout-menu-footer', () => {
    const div = fixture.nativeElement.querySelector('div');
    expect(div.classList).toContain('uk2-flyout-menu-footer');
  });
});

@Component({
  template: ` <div uk2FlyoutMenuFooter></div> `,
})
class TestComponent {}
