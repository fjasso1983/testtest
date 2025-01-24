import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Subject, fromEvent } from 'rxjs';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '#uk2-bottom-sheet[uk2BottomSheetCalculator]',
})
export class Uk2BottomSheetCalculatorDirective implements AfterViewInit, OnChanges, OnDestroy, IUk2IsLoading {
  @Input() uk2IsLoading!: boolean;

  private element: HTMLElement = this.el.nativeElement;
  private notifier = new Subject<void>();
  private bodyEl!: HTMLElement;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.uk2IsLoading && changes.uk2IsLoading.currentValue === false) {
      setTimeout(() => {
        this.bodyEl = this.getBodyElement();
        this.calculateHeight();
        this.calculateOverflow();
        this.addScrollEvent();
      });
    }
  }

  ngAfterViewInit(): void {
    this.calculateHeight();
    this.addScrollEvent();
    this.calculateOverflow();
    this.addOrientationListener();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  calculateHeight() {
    const bodyEl = this.getBodyElement();
    const barHeight = this.getAbsoluteHeight(this.element.querySelector('#uk2-bottom-sheet-bar') as HTMLElement) || 0;
    const titleHeight =
      this.getAbsoluteHeight(this.element.querySelector('#uk2-bottom-sheet-title-container') as HTMLElement) || 0;
    const footerHeight =
      this.getAbsoluteHeight(this.element.querySelector('#uk2-bottom-sheet-footer-container') as HTMLElement) || 0;

    if (!bodyEl) return;
    bodyEl.style.maxHeight = `calc(90vh - ${titleHeight + footerHeight + barHeight}px)`;
  }

  calculateOverflow() {
    const bodyEl = this.getBodyElement();
    const transparencyEl = this.getBodyTransparency();
    if (!bodyEl) return;

    const scroll = bodyEl.scrollTop / (bodyEl.scrollHeight - bodyEl.clientHeight);

    if (!Number.isNaN(scroll)) {
      transparencyEl.style.visibility = 'visible';

      return;
    }

    transparencyEl.style.visibility = 'hidden';
  }

  getBodyElement(): HTMLElement {
    return this.element.querySelector('#uk2-bottom-sheet-body') as HTMLElement;
  }

  getBodyTransparency(): HTMLElement {
    return this.element.querySelector('#uk2-bottom-sheet-body-transparency') as HTMLElement;
  }

  addScrollEvent(): void {
    this.bodyEl = this.getBodyElement();
    const transparencyEl = this.getBodyTransparency();
    if (!this.bodyEl && !transparencyEl) return;
    fromEvent(this.bodyEl, 'scroll')
      .pipe(
        takeUntil(this.notifier),
        map(() => this.bodyEl.scrollTop / (this.bodyEl.scrollHeight - this.bodyEl.clientHeight)),
        tap(() => {
          transparencyEl.style.opacity = '1';
        }),
        filter(scroll => scroll > 0.88),
        tap(() => {
          transparencyEl.style.opacity = '0';
        })
      )
      .subscribe(() => {});
  }

  addOrientationListener(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.notifier), debounceTime(50))
      .subscribe(() => {
        this.calculateHeight();
        this.calculateOverflow();
      });
  }

  getAbsoluteHeight(el: HTMLElement): number {
    if (!el) return 0;
    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

    return Math.ceil(el.clientHeight + margin);
  }
}
