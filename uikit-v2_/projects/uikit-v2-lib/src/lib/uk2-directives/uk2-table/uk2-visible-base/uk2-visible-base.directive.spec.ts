import { Component, Directive, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Uk2VisibilityStrategy } from './interfaces';
import { Uk2VisibleBaseDirective } from './uk2-visible-base.directive';

describe('Uk2VisibleBaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: Uk2VisibleBaseDirective;
  let htmlElement: ElementRef<HTMLElement>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2TestVisibleDirective],
      providers: [{ provide: ElementRef, useValue: new ElementRef(document.createElement('mat-row')) }],
    });

    fixture = TestBed.createComponent(TestComponent);
    htmlElement = fixture.debugElement.query(By.directive(Uk2TestVisibleDirective)).nativeElement;
    directive = fixture.debugElement.query(By.directive(Uk2TestVisibleDirective)).injector.get(Uk2TestVisibleDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should uk2IsHovered true when mouseenter event is triggered', () => {
    directive.onMouseEnter();
    expect(directive.uk2IsHovered).toBeTrue();
  });

  it('should uk2IsHovered true when mouseleave event is triggered', () => {
    directive.onMouseEnter();
    directive.onMouseLeave();
    expect(directive.uk2IsHovered).toBeFalse();
  });

  it('should processVisibilityOfTargetElement when mouseenter event is triggered', () => {
    spyOn(directive as any, 'processVisibilityOfTargetElement');
    directive.onMouseEnter();
    expect(directive['processVisibilityOfTargetElement']).toHaveBeenCalled();
  });

  it('should processVisibilityOfTargetElement when mouseleave event is triggered', () => {
    spyOn(directive as any, 'processVisibilityOfTargetElement');
    directive.onMouseLeave();
    expect(directive['processVisibilityOfTargetElement']).toHaveBeenCalled();
  });

  it('should processVisibilityOfTargetElement when ngAfterViewInit is called', () => {
    spyOn(directive as any, 'processVisibilityOfTargetElement');
    directive.ngAfterViewInit();
    expect(directive['processVisibilityOfTargetElement']).toHaveBeenCalled();
  });

  it('should processVisibilityOfTargetElement when checkbox change event is triggered', () => {
    spyOn(directive as any, 'processVisibilityOfTargetElement');
    directive.ngAfterViewInit();
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.dispatchEvent(new Event('change'));
    expect(directive['processVisibilityOfTargetElement']).toHaveBeenCalled();
  });
});

class Uk2TestVisibilityStrategy implements Uk2VisibilityStrategy<Uk2VisibleBaseDirective> {
  processVisibility(directive: Uk2VisibleBaseDirective): void {
    return;
  }
}

@Directive({
  selector: '[uk2TestVisibleDirective]',
})
class Uk2TestVisibleDirective extends Uk2VisibleBaseDirective {
  constructor() {
    super(new Uk2TestVisibilityStrategy());
  }
}

@Component({
  template: `
    <div uk2TestVisibleDirective>
      <input type="checkbox" />
    </div>
  `,
})
class TestComponent {}
