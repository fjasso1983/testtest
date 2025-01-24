import { DOCUMENT } from '@angular/common';
import {
  AfterViewChecked,
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { IUk2IsLoading, UK2_BREAKPOINTS, Uk2DestroyService } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'mat-toolbar[uk2ContextualTopBar]',
  providers: [Uk2DestroyService],
})
export class Uk2ContextualTopBarDirective implements IUk2IsLoading, OnChanges, OnInit, AfterViewChecked, OnDestroy {
  @Input() uk2IsLoading = false;
  @Input() uk2IsSticky = false;
  @Input() uk2HasTopBar = false;
  @HostBinding('class.uk2-has-top-bar')
  get addTopBarClass() {
    return this.uk2HasTopBar;
  }
  contextualTopBarTabsElement: HTMLElement | null = null;
  contextualTopBarContextualSectionElement: HTMLElement | null = null;
  private stickyTimeout: ReturnType<typeof setTimeout> | undefined;
  private readonly resizeEvent$: Observable<Event> = fromEvent(window, 'resize');
  private readonly mediumBreakPoint = UK2_BREAKPOINTS.md;
  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private uk2Destroy$: Uk2DestroyService,
    private renderer: Renderer2
  ) {}

  ngOnChanges() {
    this.elementRef.nativeElement.classList.add('uk2-contextual-top-bar');
    this.contextualTopBarClass();
    this.handleContextualAreaPosition();
  }

  ngOnInit(): void {
    this.listenResizeEvent();
  }

  ngAfterViewChecked(): void {
    this.setTopWhenIsSticky();

    let imageEl = this.document.querySelector(
      '.uk2-brand-top-bar .uk2-brand-top-bar-logo-bar img.uk2-brand-top-bar-logo'
    ) as HTMLImageElement;

    if (imageEl) {
      imageEl.onload = () => {
        this.setTopWhenIsSticky();
      };
    }
  }

  ngOnDestroy(): void {
    this.stickyTimeout && clearTimeout(this.stickyTimeout);
  }

  contextualTopBarClass() {
    this.elementRef.nativeElement.classList.remove('uk2-contextual-top-bar-skeleton-color');
    this.elementRef.nativeElement.classList.remove('uk2-contextual-top-bar-fixed');
    this.elementRef.nativeElement.classList.remove('uk2-contextual-top-bar-fixed-with-top-bar');

    if (this.uk2IsLoading) {
      this.handleSkeleton();
    }

    this.handleStickyBehavior(window.innerWidth, this.uk2IsSticky, this.uk2HasTopBar);
  }

  setTopWhenIsSticky() {
    this.stickyTimeout = setTimeout(() => {
      let offsetHeight = 0;
      if (this.uk2HasTopBar) {
        let brandElementHtml = this.document.querySelector('.uk2-brand-top-bar') as HTMLElement;
        if (brandElementHtml !== undefined && brandElementHtml !== null && brandElementHtml.offsetHeight > 0) {
          offsetHeight = brandElementHtml.offsetHeight - 0.5;
        }
      } else {
        offsetHeight = 0;
      }
      this.elementRef.nativeElement.setAttribute('style', 'top:' + offsetHeight + 'px !important;');
    });
  }

  handleContextualAreaPosition() {
    this.contextualTopBarContextualSectionElement = document.querySelector(
      '.uk2-contextual-top-bar-contextual-section'
    );
    this.contextualTopBarTabsElement = document.querySelector('.uk2-contextual-top-tabs-section');
    if (this.contextualTopBarContextualSectionElement) {
      if (this.contextualTopBarTabsElement && this.uk2HasTopBar) {
        this.renderer.addClass(this.contextualTopBarContextualSectionElement, 'uk2-contextual-top-bar-with-tabs');
      } else {
        this.renderer.removeClass(this.contextualTopBarContextualSectionElement, 'uk2-contextual-top-bar-with-tabs');
      }
    }
  }

  /**
   * Listen to the resize event and add or remove the fixed class to the contextual top bar
   * depending on the window width
   */
  private listenResizeEvent(): void {
    this.resizeEvent$
      .pipe(startWith({ target: window } as unknown as Event), debounceTime(300), takeUntil(this.uk2Destroy$))
      .subscribe({
        next: ({ target }) => {
          const { innerWidth } = target as Window;
          this.handleStickyBehavior(innerWidth, this.uk2IsSticky, this.uk2HasTopBar);
        },
      });
  }

  private handleStickyBehavior(width: number, isSticky: boolean, hasTopBar: boolean): void {
    if (isSticky) {
      if (width <= this.mediumBreakPoint && hasTopBar) {
        this.elementRef.nativeElement.classList.remove('uk2-contextual-top-bar-fixed');
      } else {
        this.elementRef.nativeElement.classList.add('uk2-contextual-top-bar-fixed');
      }
    }
  }

  private handleSkeleton(): void {
    this.elementRef.nativeElement.classList.add('uk2-contextual-top-bar-skeleton-color');
    const skeletonLine1 = this.elementRef.nativeElement.querySelector(
      '.uk2-contextual-top-bar-skeleton-line-1'
    ) as HTMLElement;

    if (skeletonLine1) {
      return;
    }

    const template = this.elementRef.nativeElement.querySelector(
      '.uk2-contextual-top-bar-header-section-title-container'
    ) as HTMLElement;
    const newSkeletonLine1 = this.renderer.createElement('div');
    this.renderer.addClass(newSkeletonLine1, 'uk2-contextual-top-bar-skeleton-line-1');
    this.renderer.insertBefore(this.renderer.parentNode(template), newSkeletonLine1, template);
  }
}
