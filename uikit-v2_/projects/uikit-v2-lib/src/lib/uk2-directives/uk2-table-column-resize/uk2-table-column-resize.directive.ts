import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: 'mat-header-cell[uk2TableColumnResize]',
})
export class Uk2TableColumnResizeDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() uk2DisableResize = false;
  @Input() uk2ColumnWidth: string | undefined;

  @Output() uk2ColumnWasResized = new EventEmitter<string>();

  private startX: number | undefined; //Initial X position when dragging starts
  private startWidth: number | undefined; //Initial width

  private currentWidth: string | undefined;
  private columnIndex = 0;
  private isLastColumn = false;

  private grabberElement!: HTMLDivElement;
  private rows: NodeListOf<Element> | undefined;

  private mouseDownListener: (() => void | undefined) | undefined;
  private mouseUpListener: (() => void | undefined) | undefined;
  private mouseMoveListener: (() => void | undefined) | undefined;
  private dblClickListener: (() => void | undefined) | undefined;

  private get columnOffsetWidth() {
    return this.el.nativeElement.offsetWidth;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.createGrabberElement();
  }

  ngAfterViewInit(): void {
    this.getRowReferences();
    this.getColumnIndex();
    this.prepareColumnSize();
    this.enableTableScroll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleWidthChange(changes.uk2ColumnWidth);
    this.handleDisableResizeChange(changes.uk2DisableResize);
  }

  ngOnDestroy(): void {
    this.destroyGrabberListeners();
    this.destroyResizeListeners();
  }

  private handleWidthChange(columnWidth: SimpleChange) {
    if (!columnWidth || columnWidth.isFirstChange()) {
      return;
    }

    let value: string | undefined = columnWidth.currentValue;
    if (!value) {
      value = `${this.columnOffsetWidth}px`;
    }

    this.resizeColumn(value);
  }

  private handleDisableResizeChange(disableResize: SimpleChange) {
    if (disableResize && !disableResize.isFirstChange()) {
      this.disableGrabber(disableResize.currentValue);
    }
  }

  private enableTableScroll() {
    const table = this.el.nativeElement.closest(`${MATERIAL_CLASSES.matTable}.uk2-table`);
    if (table) {
      this.renderer.setStyle(table, 'overflow-x', 'auto');
    }
  }

  private prepareColumnSize() {
    if (!this.startWidth) this.startWidth = this.columnOffsetWidth;

    this.applyWidthStyles(this.el.nativeElement, `${this.startWidth}px`);
    if (!this.isLastColumn) {
      this.renderer.setStyle(this.el.nativeElement, 'flex', '0 0 auto');
    }

    if (this.rows) {
      this.rows.forEach(row => {
        const cell = row.children[this.columnIndex] as HTMLElement;
        this.applyWidthStyles(cell, `${this.startWidth}px`);
        if (!this.isLastColumn) {
          this.renderer.setStyle(cell, 'flex', '0 0 auto');
        }
      });
    }
  }

  private createGrabberElement() {
    const grabberElement: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(grabberElement, 'uk2-table-header-grabber');
    this.renderer.appendChild(this.el.nativeElement, grabberElement);
    this.grabberElement = grabberElement;

    this.createGrabberListeners();
    this.disableGrabber(this.uk2DisableResize);
  }

  private disableGrabber(disable: boolean) {
    this.renderer.setStyle(this.grabberElement!, 'display', disable ? 'none' : 'block');
  }

  private getRowReferences() {
    const table = this.el.nativeElement.closest(MATERIAL_CLASSES.matTable);
    const rows = table!.querySelectorAll(MATERIAL_CLASSES.matRow);
    this.rows = rows;
  }

  private getColumnIndex() {
    const columnArray = Array.from(this.el.nativeElement.parentElement!.children);
    this.columnIndex = columnArray.indexOf(this.el.nativeElement);
    this.isLastColumn = this.columnIndex == columnArray.length - 1;
  }

  //Listener methods
  private createGrabberListeners() {
    this.mouseDownListener = this.renderer.listen(this.grabberElement, 'mousedown', this.mouseDownEvent.bind(this));
    this.dblClickListener = this.renderer.listen(this.grabberElement, 'dblclick', this.doubleClickEvent.bind(this));
  }

  private destroyGrabberListeners() {
    if (this.mouseDownListener) this.mouseDownListener();
    if (this.dblClickListener) this.dblClickListener();
  }

  private createResizeListeners() {
    this.mouseUpListener = this.renderer.listen(this.document, 'mousemove', this.mouseMoveEvent.bind(this));
    this.mouseMoveListener = this.renderer.listen(this.document, 'mouseup', this.mouseUpEvent.bind(this));
  }

  private destroyResizeListeners() {
    if (this.mouseUpListener) this.mouseUpListener();
    if (this.mouseMoveListener) this.mouseMoveListener();
  }

  //Mouse events methods
  private mouseDownEvent(event: MouseEvent) {
    event.preventDefault();
    this.startX = event.clientX;
    this.startWidth = this.el.nativeElement.offsetWidth;

    this.renderer.setStyle(this.document.body, 'cursor', 'col-resize');
    this.renderer.setStyle(this.document.body, 'user-select', 'none');

    this.createResizeListeners();
  }

  private doubleClickEvent(event: MouseEvent) {
    event.preventDefault();

    this.resizeColumnToFitContent();
  }

  private mouseMoveEvent(event: MouseEvent) {
    event.preventDefault();
    if (this.startX !== undefined) {
      const width = this.startWidth! + (event.clientX - this.startX);
      this.resizeColumn(`${width}px`);
    }
  }

  private mouseUpEvent() {
    this.startX = undefined;
    this.startWidth = undefined;
    this.renderer.removeStyle(document.body, 'user-select');
    this.renderer.removeStyle(document.body, 'cursor');

    this.destroyResizeListeners();
    this.uk2ColumnWasResized.emit(this.currentWidth);
  }

  //Resize methods
  private resizeColumn(width: string) {
    this.applyWidthStyles(this.el.nativeElement, width);
    if (this.rows) {
      this.rows.forEach(row => {
        const cell = row.children[this.columnIndex] as HTMLElement;
        this.applyWidthStyles(cell, width);
      });
    }
    this.currentWidth = width;
  }

  private applyWidthStyles(element: HTMLElement, width: string): void {
    this.renderer.setStyle(element, 'width', width);
    this.renderer.setStyle(element, 'min-width', width);
  }

  private resizeColumnToFitContent() {
    let maxWidth = this.measureElementWidth(this.el.nativeElement);
    if (this.rows) {
      this.rows.forEach(row => {
        const cell = row.children[this.columnIndex] as HTMLElement;
        const contentWidth = this.measureElementWidth(cell);

        if (contentWidth > maxWidth) {
          maxWidth = contentWidth;
        }
      });
    }

    this.resizeColumn(`${maxWidth}px`);
  }

  private measureElementWidth(element: HTMLElement) {
    const elementComputedStyles = getComputedStyle(element);
    const elementContent = element.innerHTML;

    // Create a temporary element to measure the content width
    const tempElement = this.renderer.createElement('div');
    this.renderer.setStyle(tempElement, 'padding', elementComputedStyles.padding);
    this.renderer.setStyle(tempElement, 'position', 'absolute');
    this.renderer.setStyle(tempElement, 'visibility', 'hidden');
    this.renderer.setStyle(tempElement, 'white-space', 'nowrap');
    this.renderer.setStyle(tempElement, 'flex-wrap', 'nowrap');
    this.renderer.setProperty(tempElement, 'innerHTML', elementContent);

    this.renderer.appendChild(this.document.body, tempElement); //Adds the temporary element
    const contentWidth = tempElement.offsetWidth; //Measures the width of the resulting content
    this.renderer.removeChild(this.document.body, tempElement); //Removes & cleans the element

    return contentWidth;
  }
}
