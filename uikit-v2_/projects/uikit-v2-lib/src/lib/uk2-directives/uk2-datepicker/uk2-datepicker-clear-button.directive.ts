import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy } from '@angular/core';

import { MatDatepicker } from '@angular/material/datepicker';

import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: 'mat-datepicker[uk2DatePicker]:not([color])',
})
export class Uk2DatepickerClearButtonDirective implements AfterViewInit, OnDestroy {
  onDestroy$ = new Subject<void>();
  inputEl!: HTMLInputElement;

  constructor(private el: ElementRef, private host: MatDatepicker<any>) {}

  @HostListener('opened') onOpen() {
    const host = this.getHost();
    this.onOverlayOpen(host);
  }

  ngAfterViewInit() {
    this.inputEl = this.getInputEl();
    this.addListeners();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  addListeners() {
    fromEvent<FocusEvent>(this.inputEl, 'blur')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(event => {
        const clearButton = this.getClearButtonEl();
        if (!clearButton) return;
        if (event.target && event.relatedTarget) {
          clearButton.classList.add('uk2-datepicker-clear-button-show');
        } else {
          clearButton.classList.remove('uk2-datepicker-clear-button-show');
        }
      });
  }

  getFormField(): HTMLElement {
    return this.el.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`) as HTMLElement;
  }

  getHost(): HTMLElement {
    return this.host['_overlayRef']['_host'] as HTMLElement;
  }

  onOverlayOpen(calendar: HTMLElement) {
    const clearButton = this.getClearButtonEl();
    if (!this.inputEl?.value || !clearButton) return;

    const overlayClearButton = document.createElement('div');
    const info = clearButton.getBoundingClientRect();

    overlayClearButton.style.width = `${info.width}px`;
    overlayClearButton.style.height = `${info.height}px`;
    overlayClearButton.style.left = `${info.left}px`;
    overlayClearButton.style.top = `${info.top}px`;

    overlayClearButton.classList.add('uk2-input-clear-button-overlay');

    calendar.appendChild(overlayClearButton);

    fromEvent(overlayClearButton, 'click')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        clearButton.dispatchEvent(new MouseEvent('mousedown'));
        this.host.close();
      });
  }

  private getClearButtonEl(): HTMLElement | null {
    const formFieldEl = this.getFormField();
    return formFieldEl.querySelector<HTMLElement>('.uk2-input-clear-button');
  }

  private getInputEl(): HTMLInputElement {
    const formFieldEl = this.getFormField();
    return formFieldEl.querySelector('input[uk2Input]') as HTMLInputElement;
  }
}
