import { Component, ElementRef, SimpleChange } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Uk2FileViewerContainerDirective } from './uk2-file-viewer-container.directive';
import { Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div uk2FileViewerContainer></div>`,
})
class TestComponent {}

describe('Uk2FileViewerContainerDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let elementRef: ElementRef;
  let renderer: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    const rendererSpy = jasmine.createSpyObj('Renderer2', ['setStyle', 'addClass', 'removeClass']);

    TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2FileViewerContainerDirective],
      providers: [
        { provide: Renderer2, useValue: rendererSpy },
        { provide: ElementRef, useValue: { nativeElement: document.createElement('div') } },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    elementRef = TestBed.inject(ElementRef);
    renderer = TestBed.inject(Renderer2) as jasmine.SpyObj<Renderer2>;
  });

  it('should initialize directive', () => {
    const directive = new Uk2FileViewerContainerDirective(elementRef, renderer);
    expect(directive.uk2FileViewerHeight).toBe('760px');
    expect(directive.uk2FileViewerWidth).toBe('1152px');
    expect(directive.uk2FileViewerNoBorder).toBe(false);
  });

  it("should apply 'uk2-file-viewer-container-extended' class when initialized", () => {
    const directive = new Uk2FileViewerContainerDirective(elementRef, renderer);

    directive.ngOnInit();

    expect(elementRef.nativeElement.classList.contains('uk2-file-viewer-container-extended')).toBeTrue();
  });

  it('should set the correct classes when uk2FileViewerNoBorder is set to false', () => {
    const directive = new Uk2FileViewerContainerDirective(elementRef, renderer);
    directive.uk2FileViewerNoBorder = false;

    directive.ngAfterViewInit();

    expect(elementRef.nativeElement.classList.contains('uk2-file-viewer-border')).toBeTrue();
  });

  it('should set the correct classes when uk2FileViewerNoBorder is set to false', () => {
    const directive = new Uk2FileViewerContainerDirective(elementRef, renderer);
    directive.uk2FileViewerNoBorder = true;

    directive.ngAfterViewInit();

    expect(elementRef.nativeElement.classList.contains('uk2-file-viewer-border')).toBeFalse();
  });
});
