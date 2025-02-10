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
import { MatColumnDef } from '@angular/material/table';
import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: 'mat-header-cell[uk2TableColumnResize]',
})
export class Uk2TableColumnResizeDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() uk2DisableResize = false;
  @Input() uk2ColumnWidth: string | undefined;
  @Input() uk2SetAutoScroll = false;

  @Output() uk2ColumnWasResized = new EventEmitter<string>();

  private startX: number | undefined; //Initial X position when dragging starts
  private startWidth: number | undefined; //Initial width

  private currentWidth: string | undefined;
  private grabberElement!: HTMLDivElement;
  private cells: NodeListOf<Element> | undefined;

  private mouseDownListener: (() => void | undefined) | undefined;
  private mouseUpListener: (() => void | undefined) | undefined;
  private mouseMoveListener: (() => void | undefined) | undefined;
  private dblClickListener: (() => void | undefined) | undefined;

  private get columnOffsetWidth() {
    return this.el.nativeElement.offsetWidth;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private columnDef: MatColumnDef,
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.createGrabberElement();
  }

  ngAfterViewInit(): void {
    this.getColumnCells();
    this.prepareColumnSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleWidthChange(changes.uk2ColumnWidth);
    this.handleDisableResizeChange(changes.uk2DisableResize);
    this.handleSetAutoScroll(changes.uk2SetAutoScroll);
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

  private handleDisableResizeChange(disableResize: SimpleChange | undefined) {
    if (disableResize && !disableResize.isFirstChange()) {
      this.disableGrabber(disableResize.currentValue);
    }
  }

  private handleSetAutoScroll(setAutoScroll: SimpleChange | undefined) {
    if (setAutoScroll) {
      this.enableTableScroll(setAutoScroll.currentValue);
    }
  }

  private enableTableScroll(enable: boolean) {
    const table = this.el.nativeElement.closest(`${MATERIAL_CLASSES.matTable}.uk2-table`);
    if (enable) {
      this.renderer.setStyle(table, 'overflow-x', 'auto');
    } else {
      this.renderer.removeStyle(table, 'overflow-x');
    }
  }

  private prepareColumnSize() {
    const columnWidth = this.uk2ColumnWidth ? this.uk2ColumnWidth : `${this.resizeColumnToFitContent()}px`;

    this.cells?.forEach(cell => {
      this.renderer.setStyle(cell, 'flex', '0 0 auto');
      this.renderer.setStyle(cell, 'box-sizing', 'border-box');
      this.applyWidthStyles(cell as HTMLElement, columnWidth);
    });
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

  private getColumnCells() {
    const columnCssClass = `${MATERIAL_CLASSES.matColumnPartial}-${this.columnDef.cssClassFriendlyName}`;
    const table = this.el.nativeElement.closest(MATERIAL_CLASSES.matTable);
    this.cells = table!.querySelectorAll(`.${columnCssClass}`);
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
    this.cells?.forEach(cell => {
      this.applyWidthStyles(cell as HTMLElement, width);
    });
    this.currentWidth = width;
  }

  private applyWidthStyles(element: HTMLElement, width: string): void {
    this.renderer.setStyle(element, 'width', width);
    this.renderer.setStyle(element, 'min-width', width);
  }

  private resizeColumnToFitContent() {
    let maxWidth = this.measureElementWidth(this.el.nativeElement);
    this.cells?.forEach(cell => {
      const contentWidth = this.measureElementWidth(cell as HTMLElement);
      if (contentWidth > maxWidth) {
        maxWidth = contentWidth;
      }
    });

    this.resizeColumn(`${maxWidth}px`);

    return maxWidth;
  }

  private measureElementWidth(element: HTMLElement) {
    const elementComputedStyles = getComputedStyle(element);
    const elementContent = element.innerHTML;

    // Create a temporary element to measure the content width
    const tempElement: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.setStyle(tempElement, 'padding', elementComputedStyles.padding);
    this.renderer.setStyle(tempElement, 'box-sizing', 'border-box');
    this.renderer.setStyle(tempElement, 'position', 'absolute');
    this.renderer.setStyle(tempElement, 'visibility', 'hidden');
    this.renderer.setStyle(tempElement, 'white-space', 'nowrap');
    this.renderer.setStyle(tempElement, 'flex-wrap', 'nowrap');
    this.renderer.setProperty(tempElement, 'innerHTML', elementContent);

    this.renderer.appendChild(this.document.body, tempElement); //Adds the temporary element
    const contentRect = tempElement.getBoundingClientRect();
    const contentWidth = Math.ceil(contentRect.width); //Measures the width of the resulting content rounded up
    this.renderer.removeChild(this.document.body, tempElement); //Removes & cleans the element

    return contentWidth;
  }
}
