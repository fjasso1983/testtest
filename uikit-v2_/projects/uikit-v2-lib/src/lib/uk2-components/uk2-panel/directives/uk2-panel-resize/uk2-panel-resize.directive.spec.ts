import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Uk2PanelResizeDirective } from './uk2-panel-resize.directive';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { uk2PanelPosition } from '../../enums';

// Test component to apply the directive
@Component({
  template: `
    <div
      [uk2IsPanelResizable]="true"
      [uk2MinWidth]="100"
      [uk2MaxWidth]="500"
      [uk2Position]="'left'"
      uk2PanelResize
    >
      <div class="uk2-panel-grabber"></div>
    </div>
  `,
})
class TestComponent {}

describe('Uk2PanelResizeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;
  let directiveInstance: Uk2PanelResizeDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Uk2PanelResizeDirective, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    directiveElement = fixture.debugElement.query(By.directive(Uk2PanelResizeDirective));
    directiveInstance = directiveElement.injector.get(Uk2PanelResizeDirective);

    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the directive', () => {
    expect(directiveInstance).toBeTruthy();
  });

  it('should make the grabber visible when resizing is enabled', () => {
    const grabber = directiveElement.nativeElement.querySelector('.uk2-panel-grabber');
    expect(grabber.style.visibility).toBe('visible');
  });

  it('should add appropriate class for the left position', () => {
    const grabber = directiveElement.nativeElement.querySelector('.uk2-panel-grabber');
    expect(grabber.classList.contains('uk2-grabber-resize-right')).toBeTrue();
  });

  it('should add appropriate class for the right position', () => {
    const grabber = directiveElement.nativeElement.querySelector('.uk2-panel-grabber');
    expect(grabber.classList.contains('uk2-grabber-resize-left')).toBeFalse();
  });

  it('should set isGrabbing to true when mousedown occurs in drag area and panel is resizable', () => {
    const event = new MouseEvent('mousedown', {
      clientX: directiveElement.nativeElement.offsetLeft + 10,
    });
    spyOn(directiveInstance as any, 'inDragArea').and.returnValue(true);
    directiveInstance.uk2IsPanelResizable = true;

    directiveElement.triggerEventHandler('mousedown', event);

    expect(directiveInstance.isGrabbing).toBeTrue();
  });

  it('should not set isGrabbing to true when panel is not resizable', () => {
    const event = new MouseEvent('mousedown', {
      clientX: directiveElement.nativeElement.offsetLeft + 10,
    });
    spyOn(directiveInstance as any, 'inDragArea').and.returnValue(true);
    directiveInstance.uk2IsPanelResizable = false;

    directiveElement.triggerEventHandler('mousedown', event);

    expect(directiveInstance.isGrabbing).toBeFalse();
  });

  it('should return true when event is within drag area for right position', () => {
    directiveInstance.uk2Position = uk2PanelPosition.Right;
    const event = new MouseEvent('mousemove', {
      clientX: directiveElement.nativeElement.offsetLeft + 5,
    });

    const result = (directiveInstance as any).inDragArea(event);

    expect(result).toBeTrue();
  });

  it('should return true when event is within drag area for left position', () => {
    directiveInstance.uk2Position = uk2PanelPosition.Left;
    const event = new MouseEvent('mousemove', {
      clientX: directiveElement.nativeElement.clientWidth - 5,
    });

    const result = (directiveInstance as any).inDragArea(event);

    expect(result).toBeTrue();
  });

  it('should set the new width within min and max bounds', () => {
    directiveInstance.uk2MinWidth = 100;
    directiveInstance.uk2MaxWidth = 500;
    directiveElement.nativeElement.style.width = '200px';

    directiveInstance.newWidth(50);

    expect(directiveElement.nativeElement.style.width).toBe('250px');
  });

  it('should not set the new width if it exceeds max width', () => {
    directiveInstance.uk2MinWidth = 100;
    directiveInstance.uk2MaxWidth = 500;
    directiveElement.nativeElement.style.width = '450px';

    directiveInstance.newWidth(100);

    expect(directiveElement.nativeElement.style.width).toBe('450px');
  });

  it('should not set the new width if it is below min width', () => {
    directiveInstance.uk2MinWidth = 100;
    directiveInstance.uk2MaxWidth = 500;
    directiveElement.nativeElement.style.width = '150px';

    directiveInstance.newWidth(-100);

    expect(directiveElement.nativeElement.style.width).toBe('150px');
  });

  it('should emit panelClosed event if new width is significantly below min width', () => {
    directiveInstance.uk2MinWidth = 200;
    directiveInstance.uk2MaxWidth = 500;
    directiveElement.nativeElement.style.width = '250px';
    spyOn(directiveInstance.panelClosed, 'emit');

    directiveInstance.newWidth(-200);

    expect(directiveInstance.panelClosed.emit).toHaveBeenCalled();
  });

  it('should call newWidth with correct value when isGrabbing is true and position is right', () => {
    directiveInstance.isGrabbing = true;
    directiveInstance.uk2Position = uk2PanelPosition.Right;
    const event = new MouseEvent('mousemove', {
      clientX: directiveElement.nativeElement.offsetLeft - 10,
    });
    spyOn(directiveInstance, 'newWidth');

    directiveInstance.onMouseMove(event);

    expect(directiveInstance.newWidth).toHaveBeenCalledWith(directiveElement.nativeElement.offsetLeft - event.clientX);
  });

  it('should call newWidth with correct value when isGrabbing is true and position is left', () => {
    directiveInstance.isGrabbing = true;
    directiveInstance.uk2Position = uk2PanelPosition.Left;
    const event = new MouseEvent('mousemove', {
      clientX: directiveElement.nativeElement.clientWidth + 10,
    });
    spyOn(directiveInstance, 'newWidth');

    directiveInstance.onMouseMove(event);

    expect(directiveInstance.newWidth).toHaveBeenCalledWith(event.clientX - directiveElement.nativeElement.clientWidth);
  });

  it('should stop propagation of mouseup event when isGrabbing is true', () => {
    directiveInstance.isGrabbing = true;
    const event = new MouseEvent('mouseup');
    spyOn(event, 'stopPropagation');

    directiveInstance.onMouseUp(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should not stop propagation of mouseup event when isGrabbing is false', () => {
    directiveInstance.isGrabbing = false;
    const event = new MouseEvent('mouseup');
    spyOn(event, 'stopPropagation');

    directiveInstance.onMouseUp(event);

    expect(event.stopPropagation).not.toHaveBeenCalled();
  });
});
