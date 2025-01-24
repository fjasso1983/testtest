import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2ProductTileComponentDirective } from './uk2-product-tile-grid-component.directive';

describe('Uk2ProductTileComponentDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2ProductTileComponentDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should add class to element', () => {
    const element = fixture.nativeElement.querySelector('div');
    expect(element.classList).toContain('uk2-product-tile-component');
  });
});

@Component({
  template: `<div uk2ProductTileComponent>Content</div> `,
})
class TestComponent {}
