import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Subject } from 'rxjs/internal/Subject';
import { first, takeUntil } from 'rxjs/operators';
import { Uk2TableSortingDirective } from '../uk2-table-sorting.directive';
import { Uk2SortDirectionEnum } from './enums';
import { Uk2TableSortingArrowEnum } from './enums/uk2-table-sorting-arrow.enum';
import { Uk2SortChangeEvent } from './interfaces';

@Directive({
  selector: 'mat-header-cell[uk2TableHeaderSorting]',
})
export class Uk2TableHeaderSortingDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input() uk2TableHeaderSorting: string = '';
  @Input() uk2DisableSorting: boolean = false;
  @Output() uk2SortChange = new EventEmitter<Uk2SortChangeEvent>();

  private sortingButton: HTMLElement | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private uk2TableSort: Uk2TableSortingDirective
  ) {
    this.subscribeHandleDisableTableSortingChange();
    this.uk2TableSort.active;
  }

  ngAfterViewInit(): void {
    this.subscribeHandleInitSortFirstColumn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.uk2DisableSorting?.currentValue) {
      this.removeUk2SortingButton();
    } else if (!changes?.uk2DisableSorting?.currentValue) {
      this.createUk2SortingButton();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }

  private createUk2SortingButton() {
    if (this.uk2DisableSorting || this.sortingButton) return;

    const container = this.elementRef.nativeElement;
    const sortButton = this.createSortButton();

    this.renderer.appendChild(container, sortButton);
    this.sortingButton = sortButton;

    if (this.uk2TableSort.active === this.uk2TableHeaderSorting) {
      this.updateSortButtonStyles(sortButton);
    }
  }

  private createSortButton(): HTMLElement {
    const sortButton = this.renderer.createElement('button');
    this.renderer.addClass(sortButton, 'uk2-sort-table-header-button');
    this.renderer.listen(sortButton, 'click', () => this.emitSortOption(sortButton));

    const ascSvgContainer = this.createSvgContainer(
      Uk2TableSortingArrowEnum.arrowUpward,
      'uk2-sort-table-header-button__arrow-svg--asc'
    );
    const descSvgContainer = this.createSvgContainer(
      Uk2TableSortingArrowEnum.arrowDownward,
      'uk2-sort-table-header-button__arrow-svg--desc'
    );

    this.renderer.appendChild(sortButton, ascSvgContainer);
    this.renderer.appendChild(sortButton, descSvgContainer);

    return sortButton;
  }

  private createSvgContainer(svgContent: string, additionalClass: string): HTMLElement {
    const svgContainer = this.renderer.createElement('span');
    this.renderer.addClass(svgContainer, 'uk2-sort-table-header-button__arrow-svg');
    this.renderer.addClass(svgContainer, additionalClass);
    this.renderer.setProperty(svgContainer, 'innerHTML', svgContent);
    return svgContainer;
  }

  private removeUk2SortingButton(): void {
    if (this.sortingButton) {
      this.renderer.removeChild(this.elementRef.nativeElement, this.sortingButton);
      this.sortingButton = null;
    }
  }

  private sortFirstSortableColumn() {
    if (this.uk2DisableSorting) return;

    this.setSortableColumn();
    if (!this.uk2TableSort.active) {
      this.activateSort();
    }
  }

  private setSortableColumn() {
    this.uk2TableSort.sortables.set(this.uk2TableHeaderSorting, {
      id: this.uk2TableHeaderSorting,
      start: Uk2SortDirectionEnum.ascending,
      disableClear: true,
    });
  }

  private activateSort() {
    this.uk2TableSort.active = this.uk2TableHeaderSorting;
    this.updateSortButtonStyles(this.elementRef.nativeElement.querySelector('.uk2-sort-table-header-button'));
    this.emitSortChange();
  }

  private emitSortOption(button: HTMLElement) {
    this.updateSortDirection();
    this.uk2TableSort.active = this.uk2TableHeaderSorting;
    this.updateSortButtonStyles(button);
    this.emitSortChange();
  }

  private updateSortDirection() {
    if (this.uk2TableHeaderSorting != this.uk2TableSort.active) {
      this.uk2TableSort.direction = Uk2SortDirectionEnum.ascending;
    } else if (this.uk2TableHeaderSorting == this.uk2TableSort.active) {
      this.uk2TableSort.direction =
        this.uk2TableSort.direction == Uk2SortDirectionEnum.ascending
          ? Uk2SortDirectionEnum.descending
          : Uk2SortDirectionEnum.ascending;
    } else {
      this.uk2TableSort.direction = Uk2SortDirectionEnum.descending;
    }
  }

  private emitSortChange() {
    this.uk2SortChange.emit({
      column: this.uk2TableSort.active,
      direction: this.uk2TableSort.direction as Uk2SortDirectionEnum,
    });
  }

  private updateSortButtonStyles(activeButton: HTMLElement) {
    const allButtons = this.elementRef?.nativeElement
      .closest(MATERIAL_CLASSES.matTable)
      .querySelectorAll('.uk2-sort-table-header-button');

    allButtons.forEach((button: HTMLElement) => this.cleanSortClasses(button));
    if (allButtons.length) this.renderer.addClass(activeButton, `uk2-sort-active-${this.uk2TableSort.direction}`);
  }

  private cleanSortClasses(button: HTMLElement) {
    this.renderer.removeClass(button, 'uk2-sort-active');
    this.renderer.removeClass(button, 'uk2-sort-active-asc');
    this.renderer.removeClass(button, 'uk2-sort-active-desc');
  }

  private subscribeHandleDisableTableSortingChange() {
    this.uk2TableSort.uk2DisableTableSortingChange.pipe(takeUntil(this.destroy$)).subscribe((disable: boolean) => {
      disable ? this.removeUk2SortingButton() : this.createUk2SortingButton();
    });
  }

  private subscribeHandleInitSortFirstColumn() {
    this.uk2TableSort.uk2InitSortFirstColumnEmit.pipe(first()).subscribe((initSort: boolean) => {
      if (initSort) this.sortFirstSortableColumn();
    });
  }
}
