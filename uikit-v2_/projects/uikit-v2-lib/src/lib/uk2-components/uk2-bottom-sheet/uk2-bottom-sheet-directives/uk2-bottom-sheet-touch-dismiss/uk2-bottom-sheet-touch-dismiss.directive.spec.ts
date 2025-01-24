import { ElementRef } from '@angular/core';

import { Uk2BottomSheetTouchDismissDirective } from './uk2-bottom-sheet-touch-dismiss.directive';

describe('Uk2BottomSheetTouchDismissDirective', () => {
  let directive: Uk2BottomSheetTouchDismissDirective;
  let elementRef: ElementRef;
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    const barElement = document.createElement('div');
    barElement.id = 'uk2-bottom-sheet-grabber';
    element.appendChild(barElement);
    document.body.appendChild(element);
    elementRef = { nativeElement: element };
    directive = new Uk2BottomSheetTouchDismissDirective(elementRef);
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });

  it('should listen to touch events', () => {
    const handleTouchStartSpy = spyOn(directive, 'handleTouchStart');
    const handleTouchMoveSpy = spyOn(directive, 'handleTouchMove');
    const handleTouchEndSpy = spyOn(directive, 'handleTouchEnd');

    directive.ngAfterViewInit();

    const touchStartEvent = new Event('touchstart');
    const touchMoveEvent = new Event('touchmove');
    const touchEndEvent = new Event('touchend');
    const touchCancelEvent = new Event('touchcancel');

    element.dispatchEvent(touchStartEvent);
    element.dispatchEvent(touchMoveEvent);
    element.dispatchEvent(touchEndEvent);
    element.dispatchEvent(touchCancelEvent);

    expect(handleTouchStartSpy).toHaveBeenCalled();
    expect(handleTouchMoveSpy).toHaveBeenCalled();
    expect(handleTouchEndSpy).toHaveBeenCalledTimes(2);
  });

  describe('handleTouchMove()', () => {
    const fakeTouchMove = {
      touches: [
        {
          clientY: 200,
        },
      ],
    } as unknown as TouchEvent;
    it('should do nothing if startPosition is undefined', () => {
      directive.handleTouchMove(fakeTouchMove);

      expect(directive['swipedDown']).toBeFalse();
    });

    it('should set swipedDown to true if the difference between clientY of touch start and touch move is greater than 100', () => {
      directive['initialPosition'] = 10;
      directive.handleTouchMove(fakeTouchMove);

      expect(directive['swipedDown']).toBeTrue();
    });
  });

  describe('handleTouchEnd()', () => {
    beforeEach(() => {
      directive.ngAfterViewInit();
    });
    it('should emit swipeDown event if swipedDown is true', () => {
      directive['swipedDown'] = true;
      const emitSpy = spyOn(directive.swipeDown, 'emit');

      directive.handleTouchEnd();

      expect(emitSpy).toHaveBeenCalled();
    });
  });

  it('should complete notified subject on destroy', () => {
    const nextSpy = spyOn(directive['notifier'], 'next');
    const completeSpy = spyOn(directive['notifier'], 'complete');

    directive.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
