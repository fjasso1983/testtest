import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';

import { fromEvent } from 'rxjs';

import { IUk2IsLoading, MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: 'mat-card[uk2ProductTile]',
})
export class Uk2ProductTileDirective implements IUk2IsLoading, OnInit, AfterViewInit, OnDestroy {
  @Input() uk2IsLoading = false;
  @Input() uk2IsSquareTile = false;
  @Input() uk2IsTileFullWidth = false;
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly zone = inject(NgZone);
  private element: HTMLElement = this.elementRef.nativeElement;
  private tileContentEl!: Element | null;
  private readonly tileContentScrollThreshold = 10;
  private resizeObserver!: ResizeObserver;
  private mutationObserver!: MutationObserver;

  constructor() {
    this.createSkeletonTemplate();
  }

  ngOnInit() {
    this.element.classList.add('uk2-product-tile');

    this.element.querySelector(MATERIAL_CLASSES.matCardHeader)?.classList.add('uk2-product-tile__header');

    this.tileContentEl = this.element.querySelector(MATERIAL_CLASSES.matCardContent);

    // Recalculate height to add scroll gradient when dimension change
    this.resizeObserver = new ResizeObserver(() => {
      this.zone.run(() => {
        if (this.tileContentEl) {
          this.calculateHeight(this.tileContentEl);
        }
      });
    });

    this.resizeObserver.observe(this.element);

    // Recalculate height to add scroll gradient when content change this is for dynamic content when using mat-tab
    const targetEl = this.element.querySelector(MATERIAL_CLASSES.matCardContent);
    if (targetEl) {
      this.mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach(() => {
          this.calculateHeight(targetEl);
        });
      });

      // Configuration of the observer to trigger just when childList changes
      this.mutationObserver.observe(targetEl, {
        attributes: false,
        childList: true,
        characterData: false,
      });
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.unobserve(this.element);
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }

  ngAfterViewInit() {
    this.addClassTileContent();
  }

  @HostBinding('class.uk2-square-tile') get isSquareTile() {
    return this.uk2IsSquareTile;
  }

  @HostBinding('class.uk2-product-tile-full') get isTileTypeFull() {
    return this.uk2IsTileFullWidth;
  }

  @HostBinding('class.uk2-product-tile-loading') get isTileLoading() {
    return this.uk2IsLoading;
  }

  private createSkeletonTemplate(): void {
    const headerTemplate: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(headerTemplate, 'uk2-skeleton-product-tile-header');
    this.renderer.appendChild(headerTemplate, this.createHeaderSkeletonTemplate());
    this.renderer.appendChild(this.element, headerTemplate);

    const footerTemplate: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(footerTemplate, 'uk2-skeleton-product-tile-footer');
    this.renderer.appendChild(this.element, footerTemplate);
  }

  private createHeaderSkeletonTemplate(): HTMLElement {
    const header: HTMLElement = this.renderer.createElement('div');
    const headerTitle: HTMLElement = this.renderer.createElement('div');
    const headerSubtitle: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(header, 'uk2-skeleton-product-tile__header');
    this.renderer.addClass(headerTitle, 'uk2-skeleton-product-tile__header-title');
    this.renderer.addClass(headerSubtitle, 'uk2-skeleton-product-tile__header-subtitle');

    this.renderer.appendChild(header, headerTitle);
    this.renderer.appendChild(header, headerSubtitle);

    return header;
  }

  private addClassTileContent() {
    let tileContentEl: Element;
    if (this.tileContentEl === null) return;

    tileContentEl = this.tileContentEl;

    if (this.elementOverflows(tileContentEl)) {
      tileContentEl.classList.add('uk2-content-overflow');
    }

    fromEvent(tileContentEl, 'scroll').subscribe(() => {
      this.calculateHeight(tileContentEl);
    });
  }

  private scrollReachedBottom(element: Element): boolean {
    return element.scrollHeight - element.clientHeight - this.tileContentScrollThreshold <= element.scrollTop;
  }

  private elementOverflows(element: Element): boolean {
    return element.scrollHeight > element.clientHeight;
  }

  private calculateHeight(element: Element): void {
    if (this.scrollReachedBottom(element)) {
      element?.classList.remove('uk2-content-overflow');
    } else {
      element?.classList.add('uk2-content-overflow');
    }
  }
}
