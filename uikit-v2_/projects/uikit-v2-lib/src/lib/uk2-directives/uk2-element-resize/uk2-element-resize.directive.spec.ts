import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Uk2ElementResizeDirective } from './uk2-element-resize.directive';

@Component({
  template: `
    <div
      uk2ElementResize
      [uk2IsElementResizable]="true"
      [uk2Height]="100"
      [uk2MinHeight]="150"
      [uk2MaxHeight]="1280"
      [isLoading]="false"
    >
      <div class="uk2-bottom-sheet-grabber"></div>
    </div>
  `,
})
class TestComponent {}

describe('Uk2ElementResizeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;
  let directiveInstance: Uk2ElementResizeDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Uk2ElementResizeDirective, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    directiveElement = fixture.debugElement.query(By.directive(Uk2ElementResizeDirective));
    directiveInstance = directiveElement.injector.get(Uk2ElementResizeDirective);

    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the directive', () => {
    expect(directiveInstance).toBeTruthy();
  });

  it('should make the grabber visible when resizing is enabled', () => {
    const grabber = directiveElement.nativeElement.querySelector('.uk2-bottom-sheet-grabber');
    expect(grabber.style.visibility).toBe('visible');
  });

  it('should set isGrabbing to true and initialize resize properties on touch start if element is resizable', (done: DoneFn) => {
    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [new Touch({ identifier: 0, target: directiveElement.nativeElement, clientY: 200 })],
    });
    const preventDefaultSpy = spyOn(touchStartEvent, 'preventDefault');
    directiveInstance.uk2IsElementResizable = true;
    directiveElement.triggerEventHandler('touchstart', touchStartEvent);

    setTimeout(() => {
      expect(directiveInstance['isGrabbing']).toBeTrue();
      expect(directiveInstance['isResizing']).toBeTrue();
      expect(directiveInstance['startY']).toBe(200);
      expect(directiveInstance['startHeight']).toBe(0);
      expect(preventDefaultSpy).toHaveBeenCalled();
      done();
    }, 250); // Slightly longer than the 200ms delay in the directive
  });

  it('should not set isGrabbing and initialize resize properties on touch start if element is not resizable', () => {
    const event = new TouchEvent('touchstart');
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    directiveInstance.uk2IsElementResizable = false;
    directiveElement.triggerEventHandler('touchstart', event);

    expect(directiveInstance['isGrabbing']).toBeFalse();
    expect(directiveInstance['startY']).toBe(0);
    expect(directiveInstance['startHeight']).toBe(0);
    expect(directiveInstance['isResizing']).toBeFalse();
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should resize the element on touch move if isGrabbing is true', () => {
    directiveInstance['isGrabbing'] = true;
    directiveInstance['startY'] = 200;
    directiveInstance['startHeight'] = 100;
    const event = new TouchEvent('touchmove', {
      touches: [new Touch({ identifier: 0, target: directiveElement.nativeElement, clientY: 100 })],
    });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const newHeightSpy = spyOn(directiveInstance, 'newHeight');
    directiveElement.triggerEventHandler('touchmove', event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(newHeightSpy).toHaveBeenCalledWith(200);
  });

  it('should not resize the element on touch move if isGrabbing is false', () => {
    directiveInstance['isGrabbing'] = false;
    const event = new TouchEvent('touchmove');
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const newHeightSpy = spyOn(directiveInstance, 'newHeight');
    directiveElement.triggerEventHandler('touchmove', event);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
    expect(newHeightSpy).not.toHaveBeenCalled();
  });

  it('should reset the grabber and resizing properties on touch end if isGrabbing is true', () => {
    directiveInstance['isGrabbing'] = true;
    const event = new TouchEvent('touchend');
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    directiveElement.triggerEventHandler('touchend', event);

    expect(directiveInstance['isGrabbing']).toBeFalse();
    expect(directiveInstance['isResizing']).toBeFalse();
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should not reset the grabber and resizing properties on touch end if isGrabbing is false', () => {
    directiveInstance['isGrabbing'] = false;
    const event = new TouchEvent('touchend');
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    directiveElement.triggerEventHandler('touchend', event);

    expect(directiveInstance['isGrabbing']).toBeFalse();
    expect(directiveInstance['isResizing']).toBeFalse();
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should not stopPropagation on click if isResizing is true', () => {
    directiveInstance['isResizing'] = true;
    const event = new MouseEvent('click');
    const stopPropagationSpy = spyOn(event, 'stopPropagation');
    directiveElement.triggerEventHandler('click', event);

    expect(stopPropagationSpy).not.toHaveBeenCalled();
  });

  it('should stopPropagation on click if isResizing is false', () => {
    directiveInstance['isResizing'] = false;
    const event = new MouseEvent('click');
    const stopPropagationSpy = spyOn(event, 'stopPropagation');
    directiveElement.triggerEventHandler('click', event);

    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});
