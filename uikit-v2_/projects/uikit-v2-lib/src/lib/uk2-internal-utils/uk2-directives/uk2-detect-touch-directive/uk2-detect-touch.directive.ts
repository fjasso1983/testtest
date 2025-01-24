import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { Subject, fromEvent } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[uk2DetectTouch]',
})
export class Uk2DetectTouchDirective implements OnInit, OnDestroy {
  @Output() touched = new EventEmitter<void>();
  private el!: HTMLDivElement;
  private _touched = false;
  private notifier = new Subject<void>();

  constructor(elementRef: ElementRef) {
    this.el = elementRef.nativeElement;
  }

  ngOnInit(): void {
    fromEvent<TouchEvent>(this.el, 'touchstart')
      .pipe(takeUntil(this.notifier), tap(this.handleTouchStart), filter(this.hasTargetTouches))
      .subscribe(() => {
        this._touched = true;
      });
    fromEvent<TouchEvent>(this.el, 'touchend')
      .pipe(
        takeUntil(this.notifier),
        filter(() => this._touched)
      )
      .subscribe(() => {
        this.touched.emit();
      });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  hasTargetTouches(event: TouchEvent) {
    return event.targetTouches.item(0) !== null;
  }

  handleTouchStart(event: TouchEvent) {
    event.preventDefault();
    this._touched = false;
  }
}
