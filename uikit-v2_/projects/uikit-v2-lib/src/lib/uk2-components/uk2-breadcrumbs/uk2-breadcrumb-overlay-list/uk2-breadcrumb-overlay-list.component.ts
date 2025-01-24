import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { Uk2BreadcrumbsCssProperty, Uk2BreadcrumbsItem } from '../types';

@Component({
  selector: 'uk2-breadcrumb-overlay-list',
  templateUrl: './uk2-breadcrumb-overlay-list.component.html',
})
export class Uk2BreadcrumbOverlayListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() set items(items: Uk2BreadcrumbsItem[]) {
    this._items = items.slice(1, -1);
  }
  @Input() uk2BreadcrumbsCssProperties: Uk2BreadcrumbsCssProperty[] = [];
  @Output() itemSelected = new EventEmitter<Uk2BreadcrumbsItem>();

  _items!: Uk2BreadcrumbsItem[];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.addCssStyles();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { uk2BreadcrumbsCssProperties } = changes;

    if (uk2BreadcrumbsCssProperties && !uk2BreadcrumbsCssProperties.firstChange) {
      this.addCssStyles();
    }
  }

  ngAfterViewInit() {
    this.focusFirstLink();
  }

  onItemSelected(item: Uk2BreadcrumbsItem) {
    this.itemSelected.emit(item);
  }

  addCssStyles() {
    this.uk2BreadcrumbsCssProperties.forEach(({ name, value }) => {
      this.el.nativeElement.style.setProperty(name, value);
    });
  }

  getRelativePosition(index: number): string | null {
    return `item ${index + 1} of ${this._items.length + 2}`;
  }

  private focusFirstLink() {
    const link = this.el.nativeElement.querySelector('a');
    if (link) {
      link.focus();
    }
  }
}
