import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2JustifyContentCenterDirective } from './uk2-justify-content-center.directive';

describe('Uk2JustifyContentCenter', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2JustifyContentCenterDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should add class to element', () => {
    const element = fixture.nativeElement.querySelector('div');
    expect(element.classList).toContain('uk2-justify-content-center');
  });
});

@Component({
  template: `<div uk2JustifyContentCenter>Content</div>`,
})
class TestComponent {}
