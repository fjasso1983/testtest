import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2AnchorDirective } from './uk2-anchor.directive';

@Component({
  template: `
    <a uk2Anchor href="test">My link</a>
    <p uk2Anchor>Not a Link</p>
  `,
})
class TestComponent {}

describe('Uk2AnchorDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2AnchorDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  //DOM Testing
  it('should render an anchor element with appropriated class name', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let anchorElement: HTMLAnchorElement = containerElement.querySelector('a') ?? new HTMLAnchorElement();

    // act
    fixture.detectChanges();

    // assert
    expect(anchorElement.classList.contains('uk2-link')).toBeTrue();
  });
  it('should only works on anchor elements', () => {
    // arrange
    let containerElement: HTMLElement = fixture.nativeElement;
    let paragraphElement: HTMLParagraphElement = containerElement.querySelector('p') ?? new HTMLParagraphElement();

    // act
    fixture.detectChanges();

    // assert
    expect(paragraphElement.classList.contains('uk2-link')).toBeFalse();
  });
});
