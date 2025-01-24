import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

import { MatDatepicker } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';

import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import moment, { Moment } from 'moment';

import { CalendarRow } from './types';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'mat-datepicker[uk2DatePicker]:not([color])',
})
export class Uk2DatePickerDirective implements OnInit {
  private currentDate = moment();
  private previousMonthDate = 0;
  private _hasHint = false;
  private _hasErrorChildren = false;
  private destroy$!: Subject<void>;

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2,
    private host: MatDatepicker<any>,
    private formField: MatFormField
  ) {}

  ngOnInit(): void {
    this.configHostPanel();
    this.addClassFormField();
  }

  @HostListener('opened') onOpen() {
    this.destroy$ = new Subject<void>();
    this.onOverlayOpen();
  }

  @HostListener('closed') onClose() {
    this.removeActiveClass(this.el.nativeElement);
    this.triggerInputClasses(this.getInput());
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('monthSelected', ['$event']) onMonthSelected(selectedDate: Moment) {
    this.currentDate = selectedDate;
    setTimeout(() => {
      this.renderAdjacentDateCells();
    }, 1);
  }

  configHostPanel() {
    this.host.restoreFocus = false;
    this.host.panelClass = 'uk2-datepicker';
  }

  setPanelClass() {
    const host = this.getHost();
    const hintValue = this.getHint()?.textContent?.trim() || '';
    const errorValue = this.getMatError()?.textContent?.trim() || '';
    host.querySelector(`.${MATERIAL_CLASSES.matDatePickerPopUp}`)?.classList.add('uk2-datepicker-popup');

    this._hasErrorChildren = errorValue !== '' && this.formField._control.errorState;
    this._hasHint = hintValue !== '';

    if (this._hasErrorChildren || this._hasHint) {
      host.querySelector(`.${MATERIAL_CLASSES.matDatePickerPopUp}`)?.classList.remove('no-extra-text');

      return;
    }
    host.querySelector(`.${MATERIAL_CLASSES.matDatePickerPopUp}`)?.classList.add('no-extra-text');
  }

  getHint() {
    return this.getFormField()?.querySelector(`.${MATERIAL_CLASSES.matHint}`);
  }

  getMatError() {
    return this.getFormField()?.querySelector(`.${MATERIAL_CLASSES.matError}`);
  }

  getFormField(): HTMLElement {
    return this.el.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`) as HTMLElement;
  }

  addMaskIcon() {
    const host = this.getHost();
    this.setMask(
      host.querySelector(
        `.${MATERIAL_CLASSES.matDatePickerPreviousButton} span.${MATERIAL_CLASSES.matDatePickerRippleContainer}`
      ),
      "url('/uk2/assets/svg/icons/uk2-chevron-left.svg')"
    );
    this.setMask(
      host.querySelector(
        `.${MATERIAL_CLASSES.matDatePickerNextButton} span.${MATERIAL_CLASSES.matDatePickerRippleContainer}`
      ),
      "url('/uk2/assets/svg/icons/uk2-chevron-right.svg')"
    );
  }

  setMask(element: HTMLElement | null, maskURL: string) {
    this.renderer.setStyle(element, 'mask-image', maskURL);
    this.renderer.setStyle(element, '-webkit-mask-image', maskURL);
  }

  addClickEvents(): void {
    this.addNavigationClick(
      `.${MATERIAL_CLASSES.matDatePickerPreviousButton}`,
      this.subtractDateAndProcessCells.bind(this)
    );
    this.addNavigationClick(`.${MATERIAL_CLASSES.matDatePickerNextButton}`, this.addDateAndProcessCells.bind(this));
  }

  addNavigationClick(selector: string, fn: Function) {
    const host = this.getHost();
    const element = host.querySelector(selector);
    if (element) {
      this.renderer.listen(element, 'click', () => fn(host));
    }
  }

  subtractDateAndProcessCells() {
    this.currentDate = moment(this.currentDate).subtract(1, 'month');
    this.renderAdjacentDateCells();
  }

  addDateAndProcessCells() {
    this.currentDate = moment(this.currentDate).add(1, 'month');
    this.renderAdjacentDateCells();
  }

  onOverlayOpen() {
    fromEvent(this.getHost(), 'keydown')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const calendarSelected = this.host['_componentRef'].instance._calendar.activeDate;
        const calendarCurrent = this.currentDate;
        setTimeout(() => {
          if (calendarCurrent.month() !== calendarSelected.month()) {
            this.renderAdjacentDateCells();
            this.currentDate = calendarSelected;
          }
        });
      });
    this.setActiveClass(this.el.nativeElement);
    this.setPanelSpaceForHint();
    this.setPanelClass();
    setTimeout(() => {
      this.currentDate = this.host['_componentRef'].instance._calendar.activeDate;

      this.addClickEvents();
      this.renderAdjacentDateCells();
      this.addMaskIcon();
    }, 1);
  }

  setActiveClass(el: HTMLElement) {
    const formField = el.closest(`.${MATERIAL_CLASSES.formField}`);
    formField?.classList.add('mat-focused');
  }

  removeActiveClass(el: HTMLElement) {
    const formField = el.closest(`.${MATERIAL_CLASSES.formField}`);
    formField?.classList.remove('mat-focused');
  }

  triggerInputClasses(input: HTMLInputElement | null | undefined) {
    if (!input) throw new Error('uk2-datepicker directive input in mat-form-field not found');
    input.focus();
    input.blur();
  }

  addPlaceholderDates() {
    let row = this.getLastRow();
    if (!row) return;
    const missingDates = this.getMissingDates(row);
    if (missingDates <= 0) return;
    let initialDate = 1;

    for (let i = 0; i < missingDates; i++) {
      const cell = this.createCell(String(initialDate), 'uk2-mat-calendar-body-cell-label-disabled');
      row.appendChild(cell);
      initialDate++;
    }
  }

  getLastRow() {
    return this.getHost().querySelector('mat-month-view tbody tr:last-of-type') as HTMLElement;
  }

  getMissingDates(row: HTMLElement) {
    const DAYS_IN_WEEK = 7;

    return Math.abs(row.querySelectorAll('td').length - DAYS_IN_WEEK);
  }

  addPreviousPlaceholderDates() {
    this.currentDate = this.host['_componentRef'].instance._calendar.activeDate;
    const style = this.getCellStyles();
    let rows = this.calculateRowsToBeFilled();

    rows = rows.map(row => {
      if (row.completeRow) this.clearRow(row.row);

      return {
        ...row,
        styleText: style,
      };
    });
    const totalDays = rows.reduce((total, row) => total + row.cells, 0);
    this.previousMonthDate = parseInt(
      moment(this.currentDate)
        .subtract(1, 'months')
        .endOf('month')
        .subtract(totalDays - 1, 'days')
        .format('DD'),
      10
    );
    rows.forEach(row => this.addCells(row));
  }

  clearRow(row: HTMLElement) {
    row.innerHTML = '';
  }

  calculateRowsToBeFilled(): CalendarRow[] {
    return Array.from(this.getHost().querySelectorAll<HTMLTableCellElement>('td.mat-calendar-body-label')).map(
      (tdElement: HTMLTableCellElement): CalendarRow => ({
        completeRow: tdElement.colSpan == 7,
        cells: tdElement.colSpan,
        element: tdElement,
        row: (tdElement.parentElement as HTMLTableRowElement) ?? document.createElement('tr'),
        styleText: '',
      })
    );
  }

  addCells(row: CalendarRow) {
    for (let i = 0; i < row.cells; i++) {
      const cell = this.createCell(
        String(this.previousMonthDate),
        'uk2-mat-calendar-body-cell-disabled',
        row.styleText
      );

      if (row.completeRow) {
        row.row.append(cell);
      } else {
        this.renderer.insertBefore(row.row, cell, row.element);
      }

      this.previousMonthDate++;
    }
  }

  createCell(content: string, className: string, styleText = ''): HTMLElement {
    const cell = document.createElement('td');
    cell.innerText = String(content);
    cell.classList.add('mat-calendar-body-cell-container');
    cell.classList.add(className);
    cell.style.cssText = styleText;

    return cell;
  }

  getCellStyles() {
    const cell = this.getHost().querySelector('.mat-calendar-body-cell-container') as HTMLElement;

    return cell ? cell.style.cssText : '';
  }

  getHintHeight(): number {
    const DEFAULT_SPACE = 25;
    const formFieldEl = this.el.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    if (!formFieldEl) return DEFAULT_SPACE;

    const hintEl = formFieldEl.querySelector('.mat-mdc-form-field-hint');
    if (!hintEl) return DEFAULT_SPACE;

    return hintEl.clientHeight;
  }

  getHost(): HTMLElement {
    return this.host['_overlayRef']['_host'] as HTMLElement;
  }

  getInput(): HTMLInputElement | null | undefined {
    return this.el.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`)?.querySelector('input');
  }

  setPanelSpaceForHint(): void {
    const popUpEl = this.getHost().querySelector(`.${MATERIAL_CLASSES.matDatePickerPopUp}`) as HTMLElement;
    if (!popUpEl) return;
    popUpEl.style.paddingTop = `${this.getHintHeight()}px`;
  }

  clearPlaceholderCells(): void {
    const cells = this.getHost().querySelectorAll('.uk2-mat-calendar-body-cell-disabled');
    cells.forEach(cell => cell.remove());
  }

  private addClassFormField(): void {
    this.el.nativeElement.classList.add('uk2-datepicker');
    const formFieldEl = this.el.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
    if (formFieldEl) {
      formFieldEl.classList.add('uk2-form-field-datepicker');
    }
  }

  private renderAdjacentDateCells(): void {
    this.clearPlaceholderCells();
    this.addPreviousPlaceholderDates();
    this.addPlaceholderDates();
  }
}
