import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2JustifyContentSpaceBetweenDirective } from './uk2-justify-content-space-between.directive';

describe('Uk2JustifyContentSpaceBetweenDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2JustifyContentSpaceBetweenDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should add class to element', () => {
    const element = fixture.nativeElement.querySelector('div');
    expect(element.classList).toContain('uk2-justify-content-space-between');
  });
});

@Component({
  template: ` <div uk2JustifyContentSpaceBetween>Content</div> `,
})
class TestComponent {}
