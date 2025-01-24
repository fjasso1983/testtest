import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2ProductTileGridDirective } from './uk2-product-tile-grid.directive';
import { Uk2ProductTileComponentPositionEnum } from './enums';

describe('Uk2ProductTileGridDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2ProductTileGridDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add class to element', () => {
    const element = fixture.nativeElement.querySelector('div');
    expect(element.classList).toContain('uk2-product-tile-grid');
  });

  it('should add class uk2-product-tile-grid--bottom when input "uk2ComponentPosition" change to botton', () => {
    component.changePositionBottom();
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('div');
    expect(element.classList).toContain('uk2-product-tile-grid--bottom');
  });

  it('should add class uk2-product-tile-grid--top when input "uk2ComponentPosition" change to top', () => {
    component.changePositionTop();
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('div');
    expect(element.classList).toContain('uk2-product-tile-grid--top');
  });
});

@Component({
  template: `<div uk2ProductTileGrid [uk2ComponentPosition]="position">Content</div> `,
})
class TestComponent {
  position: Uk2ProductTileComponentPositionEnum = Uk2ProductTileComponentPositionEnum.bottom;

  changePositionBottom() {
    this.position = Uk2ProductTileComponentPositionEnum.bottom;
  }

  changePositionTop() {
    this.position = Uk2ProductTileComponentPositionEnum.top;
  }
}
