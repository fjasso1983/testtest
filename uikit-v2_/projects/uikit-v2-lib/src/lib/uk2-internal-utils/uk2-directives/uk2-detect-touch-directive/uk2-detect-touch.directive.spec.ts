import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { By } from "@angular/platform-browser";

import { Uk2DetectTouchDirective } from "./uk2-detect-touch.directive"

describe('Uk2DetectTouchDirective', () => {
  let component: MockToastComponent;
  let directive: Uk2DetectTouchDirective;
  let fixture: ComponentFixture<MockToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockToastComponent, Uk2DetectTouchDirective],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(MockToastComponent);
    component = fixture.componentInstance;
    const directiveEl = fixture.debugElement.query(By.directive(Uk2DetectTouchDirective));
    directive = directiveEl.injector.get(Uk2DetectTouchDirective);
  })

  it('should call onTouched method', () => {
    spyOn(directive, 'hasTargetTouches').and.returnValue(true as any);
    fixture.detectChanges();
    const onTouchedSpy = spyOn(component, 'onTouched');
    let divEl = (fixture.elementRef.nativeElement as HTMLElement).querySelector('div') as HTMLDivElement;
    let touchStartEvent = new TouchEvent('touchstart');
    let touchEndEvent = new TouchEvent('touchend');

    divEl.dispatchEvent(touchStartEvent);
    divEl.dispatchEvent(touchEndEvent);

    expect(onTouchedSpy).toHaveBeenCalledTimes(1);
  })

  describe('hasTargetTouches', () => {
    it('should return false if targetTouches is empty', () => {
      const event = {targetTouches: {item() { return null}}};
      expect(directive.hasTargetTouches(event as any)).toBeFalse();
    })

    it('should return true if targetTouches has one element', () => {
      const event = {targetTouches: {item() { return {}}}};
      expect(directive.hasTargetTouches(event as any)).toBeTrue();
    })
  })

  describe('onDestroy', () => {
    it('should emit to unsubscribe event observables', () => {
      const notifier = directive['notifier'];
      const nextSpy = spyOn(notifier, 'next');
      const completeSpy = spyOn(notifier, 'complete');

      directive.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    })
  })
})

@Component({
  template: `<div [uk2DetectTouch] (touched)="onTouched()">Toast</div>`
})
class MockToastComponent {
  onTouched() {}
}
