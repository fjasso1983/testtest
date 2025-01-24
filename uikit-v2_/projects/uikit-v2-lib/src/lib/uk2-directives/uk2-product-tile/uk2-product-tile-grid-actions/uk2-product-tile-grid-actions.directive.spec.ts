import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2ProductTileActionsDirective } from './uk2-product-tile-grid-actions.directive';

describe('Uk2ProductTileActionsDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2ProductTileActionsDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should add class to element', () => {
    const element = fixture.nativeElement.querySelector('div');
    expect(element.classList).toContain('uk2-product-tile-actions');
  });
});

@Component({
  template: `<div uk2ProductTileActions>Content</div> `,
})
class TestComponent {}
