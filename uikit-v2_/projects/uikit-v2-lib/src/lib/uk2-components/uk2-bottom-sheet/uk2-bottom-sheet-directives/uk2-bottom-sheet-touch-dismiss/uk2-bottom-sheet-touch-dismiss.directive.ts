import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '#uk2-bottom-sheet-bar[uk2BottomSheetTouchDismiss]',
})
export class Uk2BottomSheetTouchDismissDirective implements AfterViewInit, OnDestroy {
  @Output() swipeDown = new EventEmitter<void>();

  private element!: HTMLElement;
  private initialPosition: number | null = null;
  private swipedDown = false;
  private notifier = new Subject<void>();

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.element = this.elementRef.nativeElement;

    fromEvent<TouchEvent>(this.element, 'touchstart')
      .pipe(takeUntil(this.notifier))
      .subscribe((event: TouchEvent) => this.handleTouchStart(event));
    fromEvent<TouchEvent>(this.element, 'touchmove')
      .pipe(takeUntil(this.notifier))
      .subscribe((event: TouchEvent) => this.handleTouchMove(event));
    fromEvent<TouchEvent>(this.element, 'touchend')
      .pipe(takeUntil(this.notifier))
      .subscribe(() => this.handleTouchEnd());
    fromEvent<TouchEvent>(this.element, 'touchcancel')
      .pipe(takeUntil(this.notifier))
      .subscribe(() => this.handleTouchEnd());
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  handleTouchStart(event: TouchEvent) {
    this.initialPosition = event.touches[0].clientY;
  }

  handleTouchEnd() {
    if (this.swipedDown) {
      this.swipeDown.emit();
    }
    this.initialPosition = null;
  }

  handleTouchMove(event: TouchEvent) {
    const clientY = event.touches[0].clientY;
    if (!this.initialPosition) return;

    this.swipedDown = clientY - this.initialPosition >= 100;
  }
}
