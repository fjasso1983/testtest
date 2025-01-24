import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'mat-progress-bar[uk2DeterminateProgressBar][mode=determinate]:not([color]',
})
export class Uk2DeterminateProgressBarDirective implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() value: any = 0;
  private destroy$ = new Subject<void>();

  constructor(private el: ElementRef<HTMLButtonElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setEventOnResizeWindow();
    this.el.nativeElement.classList.add('uk2-determinate-progress-bar');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.getProgressBarElementAndRenderItsValue(changes.value.currentValue);
    }
  }

  ngAfterViewInit(): void {
    const containerBar = this.el.nativeElement.querySelector(`.${MATERIAL_CLASSES.matProgressBufferBar}`);
    const progressBar = this.renderer.createElement('div');

    this.renderer.addClass(progressBar, 'uk2-inner-progress-bar');
    this.renderer.appendChild(containerBar, progressBar);

    this.adjustBarProgress(progressBar, this.value);
  }

  private setEventOnResizeWindow(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$), debounceTime(200))
      .subscribe(() => {
        this.getProgressBarElementAndRenderItsValue(this.value);
      });
  }

  private getProgressBarElementAndRenderItsValue(value: any): void {
    const progressBarElement = this.el.nativeElement.querySelector('.uk2-inner-progress-bar');

    if (progressBarElement) {
      this.adjustBarProgress(progressBarElement, value);
    }
  }

  private adjustBarProgress(progressBar: Element, value: number) {
    const containerBar = this.el.nativeElement.querySelector(`.${MATERIAL_CLASSES.matProgressBufferBar}`);
    let newWidth = (containerBar!.getBoundingClientRect().width * value) / 100;
    if (newWidth > containerBar!.getBoundingClientRect().width) {
      newWidth = containerBar!.getBoundingClientRect().width;
    }
    this.renderer.setStyle(progressBar, 'width', `${newWidth}px`);
  }
}
