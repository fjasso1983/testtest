import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  Input,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { MatColumnDef } from '@angular/material/table';

@Directive({
  selector: 'mat-table[uk2TableScroll]',
})
export class Uk2TableScrollDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() uk2TableViewport: HTMLElement | undefined;
  @Input() uk2MarginBelowViewport = 4;

  @ContentChildren(MatColumnDef, { descendants: true }) columnDefs!: QueryList<MatColumnDef>;

  //Table size & positions
  private tablePositionY = 0;
  private tableAdjustedTopMargin = 0;
  private tableHeight = 0;

  //Cached values
  private cachedViewportHeight: number | null = null;

  //Vieport positions
  private viewportVisibleHeight = 0;
  private viewportYPosition = 0;

  //Horizontal scroller positions
  private scrollerHeight = 0;

  //Sticky shadow
  private stickyWidth = 0;

  //Elements
  private stickyShadowElement!: HTMLDivElement;
  private scrollContainerElement!: HTMLDivElement;
  private scrollerElement!: HTMLDivElement;
  private viewportElement!: HTMLElement;
  private headerRow: HTMLElement | undefined;

  private stickyColumnsClass: string[] = [];

  private eventDestroy$ = new Subject<void>();
  private updateSizeDebouncer$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  private intersectionObserver!: IntersectionObserver;
  private resizeObserver!: ResizeObserver;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private zone: NgZone,
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.createHorizontalScroller();
    this.createStickyShadowElement();
    this.setTableClasses();
    this.createSizeCalculationsDebouncer();
  }

  ngOnDestroy(): void {
    this.intersectionObserver.disconnect();
    this.resizeObserver.disconnect();

    this.eventDestroy$.next();
    this.eventDestroy$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.determineViewport();
    this.setHeaderRowStyles();
    this.getTableColumns();
    this.updateTableAndViewportSizes();

    //Running ourside of the angular zone avoids triggering Angular change detector for every scroll event triggered
    this.zone.runOutsideAngular(() => {
      this.createIntersectionObserver();
      this.createResizeListener();
    });
  }

  updateTableAndViewportSizes() {
    const newViewportHeight = this.viewportElement.clientHeight;
    const scrollYPosition = this.viewportElement.scrollTop;
    const tableRect = this.el.nativeElement.getBoundingClientRect();
    const viewportRect = this.viewportElement.getBoundingClientRect();
    const newTableHeight = this.getContentHeight();
    const newScrollerHeight = this.scrollContainerElement.offsetHeight;

    if (this.cachedViewportHeight !== newViewportHeight) {
      this.viewportVisibleHeight = newViewportHeight;
      this.cachedViewportHeight = newViewportHeight;
    }

    this.tableHeight = newTableHeight;
    this.scrollerHeight = newScrollerHeight;
    this.viewportVisibleHeight = newViewportHeight;
    this.viewportYPosition = viewportRect.top + this.document.documentElement.scrollTop;
    this.tablePositionY = tableRect.top + scrollYPosition - this.tableAdjustedTopMargin; // Y position of the header row relative to the viewport

    this.adjustHorizontalScrollerPosition();
    this.adjustHeaderFixedPosition(scrollYPosition);
    if (this.el.nativeElement.scrollLeft > 0) {
      this.validateHorizontalScroll();
    }
  }

  //Since the recalculation can be triggered multiple times, it's handled by a debouncer to avoid performance issues
  private createSizeCalculationsDebouncer() {
    this.updateSizeDebouncer$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(50),
        tap(() => {
          this.updateTableAndViewportSizes();
        })
      )
      .subscribe();
  }

  //scrollHeight property is affected by the table scrolling, so this is needed to get an accurate content height
  private getContentHeight() {
    const headerRow = this.headerRow!;
    const rows = this.el.nativeElement.querySelectorAll(MATERIAL_CLASSES.matRow) as NodeListOf<HTMLElement>;

    const headerHeight = headerRow.offsetHeight;
    const rowsHeight = Array.from(rows).reduce((totalHeight, row) => totalHeight + row.offsetHeight, 0);

    return headerHeight + rowsHeight;
  }

  private setTableClasses() {
    this.renderer.addClass(this.el.nativeElement, 'uk2-table-scroll');
  }

  private createHorizontalScroller() {
    this.scrollContainerElement = this.renderer.createElement('div');
    this.renderer.addClass(this.scrollContainerElement, 'uk2-table-horizontal-scroller');
    this.renderer.addClass(this.scrollContainerElement, 'uk2-scrollbar--large');

    this.scrollerElement = this.renderer.createElement('div');
    this.renderer.addClass(this.scrollerElement, 'uk2-size-scroller');
    this.renderer.appendChild(this.scrollContainerElement, this.scrollerElement);
    this.renderer.appendChild(this.el.nativeElement, this.scrollContainerElement);

    this.scrollerHeight = this.scrollContainerElement.offsetHeight;
  }

  private createStickyShadowElement() {
    this.stickyShadowElement = this.renderer.createElement('div');
    this.renderer.addClass(this.stickyShadowElement, 'uk2-sticky-shadow-container');
    this.renderer.appendChild(this.el.nativeElement, this.stickyShadowElement);
  }

  private createResizeListener() {
    const viewportResizeObserver = new ResizeObserver(() => {
      this.updateSizeDebouncer$.next();
      this.adjustScrollerWidth();
      this.adjustStickyWidth();
    });

    //Listens for all visible header cells
    const headerRowCells = this.el.nativeElement.querySelectorAll(`${MATERIAL_CLASSES.matHeaderCell}`);
    headerRowCells.forEach(cell => {
      viewportResizeObserver.observe(cell);
    });
    viewportResizeObserver.observe(this.viewportElement);
    this.resizeObserver = viewportResizeObserver;
  }

  private getTableColumns() {
    const stickyColumnsClassList: string[] = [];

    this.columnDefs.forEach(columnDef => {
      const columnCssClass = `${MATERIAL_CLASSES.matColumnPartial}-${columnDef.cssClassFriendlyName}`;

      if (columnDef.sticky) {
        stickyColumnsClassList.push(`.${columnCssClass}`);
      }
    });

    this.stickyColumnsClass = stickyColumnsClassList;
  }

  private adjustStickyWidth() {
    this.stickyWidth = 0;
    const stickyHeaderCells = Array.from(
      this.headerRow!.querySelectorAll(this.stickyColumnsClass.join())
    ) as HTMLElement[];
    const headerCellWidths = stickyHeaderCells.map(headerCell => headerCell.offsetWidth);

    stickyHeaderCells.forEach((_headerCell, index) => {
      const columnCells = Array.from(
        this.el.nativeElement.querySelectorAll(`${this.stickyColumnsClass[index]}`)
      ) as HTMLElement[];

      columnCells.forEach(cell => {
        this.renderer.setStyle(cell, 'left', `${this.stickyWidth}px`);
      });

      this.stickyWidth += headerCellWidths[index];
    });

    this.renderer.setStyle(this.stickyShadowElement, 'width', `${this.stickyWidth}px`);
    if (this.el.nativeElement.scrollLeft == 0) {
      this.renderer.setStyle(this.stickyShadowElement, 'display', 'none');
    }
  }

  private determineViewport() {
    this.viewportElement = this.uk2TableViewport
      ? this.uk2TableViewport
      : this.getScrollabelViewport(this.el.nativeElement);
  }

  private getScrollabelViewport(element: HTMLElement) {
    let currentElement: HTMLElement | null = element;
    while (currentElement) {
      const computedStyles = getComputedStyle(currentElement);
      if (computedStyles.overflowY === 'auto' || computedStyles.overflowY === 'scroll') {
        return currentElement;
      }
      currentElement = currentElement.parentElement;
    }

    return this.document.documentElement;
  }

  private setHeaderRowStyles() {
    const headerRow = this.el.nativeElement.querySelector(`${MATERIAL_CLASSES.matTableHeaderRow}[uk2-sticky-row]`);
    this.renderer.addClass(headerRow, 'uk2-table-sticky-row');
    this.headerRow = headerRow as HTMLElement;

    this.renderer.setStyle(this.el.nativeElement, 'padding-top', `${this.headerRow.offsetHeight}px`);
  }

  private adjustScrollerWidth() {
    const contentWidth = this.el.nativeElement.scrollWidth;
    this.renderer.setStyle(this.scrollerElement, 'width', `${contentWidth}px`);
  }

  private createIntersectionObserver() {
    //Intersection observer helps only listen to the scrolling events when the table is visible on the browser
    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        //The observer is triggered when the table is visible, so it creates the listeners
        if (entry.isIntersecting) {
          this.createHorizontalScrollEvent();
          this.createVerticalScrollEvent();
        } else {
          //If the table goes out of view all observers are destroyed
          this.eventDestroy$.next();
        }
      });
    });

    this.intersectionObserver.observe(this.el.nativeElement);
  }

  private createVerticalScrollEvent() {
    const scrollElement: HTMLElement | Document =
      this.viewportElement == this.document.documentElement ? this.document : this.viewportElement;

    fromEvent(scrollElement, 'scroll')
      .pipe(
        takeUntil(this.eventDestroy$),
        tap(() => {
          requestAnimationFrame(() => {
            const scrollYPosition = this.viewportElement.scrollTop;

            this.adjustTableDimensions(scrollYPosition);
            this.adjustHeaderFixedPosition(scrollYPosition);
            this.adjustHorizontalScrollerPosition();

            if (this.stickyWidth > 0) {
              this.adjustStickyShadowDimensions();
            }
          });
        })
      )
      .subscribe();
  }

  private createHorizontalScrollEvent() {
    fromEvent(this.scrollContainerElement, 'scroll')
      .pipe(
        takeUntil(this.eventDestroy$),
        tap(() => this.syncHorizontalScroll())
      )
      .subscribe();
  }

  private syncHorizontalScroll() {
    const scrollLeft = this.scrollContainerElement.scrollLeft;
    this.el.nativeElement.scrollLeft = scrollLeft;

    this.renderer.setStyle(this.scrollContainerElement, 'left', `${scrollLeft}px`);
    this.renderer.setStyle(this.stickyShadowElement, 'left', `${scrollLeft}px`);
    this.renderer.setStyle(this.stickyShadowElement, 'display', scrollLeft == 0 ? 'none' : 'block');
  }

  //Validates that scroll doesn't exceeds the table width positions
  private validateHorizontalScroll() {
    const headerRowWidth = this.headerRow!.offsetWidth;
    const scrollDiff = this.el.nativeElement.scrollWidth - headerRowWidth;

    if (scrollDiff > 0) {
      const newScrollPosition = this.el.nativeElement.scrollLeft - scrollDiff;
      this.scrollContainerElement.scrollLeft = newScrollPosition > 0 ? newScrollPosition : 0;
      this.syncHorizontalScroll();
    }
  }

  private adjustHorizontalScrollerPosition() {
    const tableRect = this.el.nativeElement.getBoundingClientRect();
    const tableScrollTop = this.el.nativeElement.scrollTop;

    let scrollerPosition = this.viewportVisibleHeight + this.viewportYPosition + tableScrollTop - tableRect.y;
    if (scrollerPosition > this.tableHeight) {
      scrollerPosition = this.tableHeight;
    }
    scrollerPosition -= this.scrollerHeight;
    this.renderer.setStyle(this.scrollContainerElement, 'top', `${scrollerPosition}px`);
  }

  private adjustHeaderFixedPosition(positionY: number) {
    let headerPosition = 0;
    if (positionY > this.tablePositionY) {
      headerPosition = this.el.nativeElement.scrollTop;
    }
    this.renderer.setStyle(this.headerRow, 'top', `${headerPosition}px`);
  }

  private adjustTableDimensions(positionY: number) {
    let newHeight =
      this.tableHeight - (positionY + this.viewportYPosition - this.tablePositionY + this.uk2MarginBelowViewport);
    if (newHeight > this.tableHeight) {
      newHeight = this.tableHeight;
    } else if (newHeight < 0) {
      newHeight = 0;
    }

    this.tableAdjustedTopMargin = this.tableHeight - newHeight;
    this.renderer.setStyle(this.el.nativeElement, 'height', `${newHeight}px`);
    this.renderer.setStyle(this.el.nativeElement, 'margin-top', `${this.tableAdjustedTopMargin}px`);

    this.el.nativeElement.scrollTop = positionY + this.viewportYPosition;
  }

  private adjustStickyShadowDimensions() {
    const headerRowTop = getComputedStyle(this.headerRow!).top;
    const shadowHeight = this.scrollContainerElement.offsetTop - this.headerRow!.offsetTop + this.scrollerHeight;
    this.renderer.setStyle(this.stickyShadowElement, 'top', headerRowTop);
    this.renderer.setStyle(this.stickyShadowElement, 'height', `${shadowHeight}px`);
  }
}
