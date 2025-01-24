import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  inject,
} from '@angular/core';

import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';

import { Subject, fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { Uk2SearchMenuItemDirective } from '../uk2-search-menu-item/uk2-search-menu-item.directive';
import { Uk2SearchMenuDirective } from '../uk2-search-menu.directive';

@Directive({
  selector: '[uk2SearchMenuOverlay]',
})
export class Uk2SearchMenuOverlayDirective implements OnInit, OnDestroy, AfterContentInit {
  @ContentChildren(Uk2SearchMenuItemDirective, { descendants: true }) items!: QueryList<Uk2SearchMenuItemDirective>;
  @Input('uk2SearchMenuOverlay') uk2SearchMenu!: Uk2SearchMenuDirective;
  @Input() uk2SearchMenuOptionsLimit: number = 5;
  @Input() uk2SearchMenuFilterDelay: number = 0;

  private elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private keyManager!: FocusKeyManager<Uk2SearchMenuItemDirective>;
  private destroy$ = new Subject<void>();
  private noResultsEl!: HTMLDivElement;

  @HostBinding('class.uk2-search-menu-overlay') get uk2SearchMenuOverlayClass() {
    return true;
  }

  @HostBinding('attr.role') get role() {
    return 'listbox';
  }

  @HostBinding('tabindex') get tabIndex() {
    return 0;
  }

  @HostListener('keydown.escape') handleEscapeKey() {
    if (this.uk2SearchMenu.nativeEl) {
      this.uk2SearchMenu.nativeEl.focus();
    }
  }

  @HostListener('focus') handleFocus() {
    this.keyManager?.setFirstItemActive();
  }

  @HostListener('keydown', ['$event']) handleKeydown(event: KeyboardEvent) {
    event.preventDefault();
    if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW) {
      this.keyManager?.onKeydown(event);
    }
    if (event.keyCode === TAB) {
      this.keyManager?.setNextItemActive();
    }
  }

  @HostListener('keyup.enter', ['$event']) handleEnterKey(event: Event) {
    event.preventDefault();
    this.close();
  }

  @HostListener('click') handleClick() {
    this.close();
  }

  ngOnInit(): void {
    this.configOverlayElements();

    if (this.uk2SearchMenu.nativeEl) {
      // listen input changes to process no results section
      fromEvent(this.uk2SearchMenu.nativeEl, 'input')
        .pipe(takeUntil(this.destroy$), debounceTime(this.uk2SearchMenuFilterDelay))
        .subscribe(() => {
          this.filterOptions();
          this.limitResults();
          this.handleNoResultsSection();
        });
    }
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager<Uk2SearchMenuItemDirective>(this.items).withWrap();

    setTimeout(() => {
      this.filterOptions();
      this.limitResults();
      this.handleNoResultsSection();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleNoResultsSection(): void {
    if (this.items.find(item => !item.disabled)) {
      this.noResultsEl.textContent = '';
    } else {
      this.noResultsEl.textContent = 'No results found';
    }
  }

  private configOverlayElements() {
    const dividerEl = this.renderer.createElement('div');
    const bottomSpacerEl = this.renderer.createElement('div');
    this.noResultsEl = this.renderer.createElement('div');
    this.renderer.addClass(dividerEl, 'uk2-search-menu-overlay-divider');
    this.renderer.addClass(bottomSpacerEl, 'uk2-search-menu-overlay-bottom-spacer');
    this.renderer.addClass(this.noResultsEl, 'uk2-search-menu-overlay-no-results');

    this.renderer.insertBefore(this.elementRef.nativeElement, dividerEl, this.elementRef.nativeElement.firstChild);
    this.renderer.appendChild(this.elementRef.nativeElement, this.noResultsEl);
    this.renderer.appendChild(this.elementRef.nativeElement, bottomSpacerEl);
  }

  private filterOptions() {
    const searchValue = this.uk2SearchMenu.nativeEl.value.toLowerCase() || '';
    this.items.forEach(item => {
      if (item.textContent.includes(searchValue)) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  private limitResults() {
    let index = 0;
    this.items.forEach(item => {
      if (index >= this.uk2SearchMenuOptionsLimit) {
        item.hide();
      }
      if (!item.disabled) {
        index++;
      }
    });
  }

  private close() {
    this.uk2SearchMenu.close();
  }
}
