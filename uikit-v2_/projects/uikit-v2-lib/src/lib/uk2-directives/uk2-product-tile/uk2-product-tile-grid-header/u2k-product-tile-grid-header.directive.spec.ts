import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2ProductTileHeaderDirective } from './u2k-product-tile-grid-header.directive';

describe('Uk2ProductTileHeaderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2ProductTileHeaderDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should add class to element', () => {
    const element = fixture.nativeElement.querySelector('div');
    expect(element.classList).toContain('uk2-product-tile-header');
  });
});

@Component({
  template: `<div uk2ProductTileHeader>Content</div> `,
})
class TestComponent {}
