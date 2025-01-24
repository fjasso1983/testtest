import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Uk2BreadcrumbsItem } from '../types';

@Directive({
  // eslint-disable-next-line
  selector: 'uk2-breadcrumbs[items]',
})
export class Uk2BreadcrumbsContainerDirective implements OnInit, AfterViewInit, OnChanges {
  @Input() items!: Uk2BreadcrumbsItem[];
  @Output() overflow = new EventEmitter<boolean>();
  private readonly BREADCRUMB_ITEM_CLASS = 'uk2-breadcrumb-item-size';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.calculateWidth();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { items } = changes;
    if (items && !items.firstChange) {
      setTimeout(() => {
        this.calculateWidth();
      });
    }
  }

  ngAfterViewInit() {
    this.calculateWidth();
  }
  private calculateWidth() {
    const elements = [...this.el.nativeElement.querySelectorAll(`.${this.BREADCRUMB_ITEM_CLASS}`)] as HTMLElement[];
    if (this.items.length !== elements.length) return;
    let paddingLeft = 0;
    let paddingRight = 0;
    if (getComputedStyle) {
      const computedStyles = getComputedStyle(this.el.nativeElement.parentElement);
      paddingLeft = parseFloat(computedStyles.paddingLeft);
      paddingRight = parseFloat(computedStyles.paddingRight);
    }
    const breadcrumbWidthList = elements.map((element: HTMLElement) => element.offsetWidth);
    const sumOfItems = breadcrumbWidthList.reduce((prev: number, next: number) => prev + next, 0);

    const containerWidth = this.el.nativeElement.parentElement.clientWidth - paddingRight - paddingLeft;
    this.overflow.emit(sumOfItems > containerWidth);
  }
}
