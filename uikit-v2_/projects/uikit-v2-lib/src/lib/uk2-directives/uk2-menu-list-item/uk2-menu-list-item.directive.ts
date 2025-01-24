import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: 'div[uk2MenuListItem]',
})
export class Uk2MenuListItemDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2IsDisabled = false;
  @Input() uk2IsLoading = false;
  @Input() uk2IsActive = false;
  @Input() uk2ShowDividerLine = false;

  private dividerElement: HTMLDivElement | undefined;

  constructor(private el: ElementRef<HTMLDivElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.el.nativeElement.classList.add('uk2-menu-list-item');
    this.setParentClass();
    this.createSkeleton();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleDisabledClass(changes.uk2IsDisabled);
    this.handleActiveClass(changes.uk2IsActive);
    this.handleDividerChange(changes.uk2ShowDividerLine);
    this.handleLoadingChange(changes.uk2IsLoading);
  }

  private setParentClass() {
    const parent = this.el.nativeElement.parentNode as HTMLElement;
    if (parent && !parent.classList.contains('uk2-menu-list-container')) {
      this.renderer.addClass(parent, 'uk2-menu-list-container');
    }
  }

  private handleDisabledClass(isDisabled: SimpleChange | undefined) {
    this.renderer.removeClass(this.el.nativeElement, 'uk2-menu-list-disabled');
    if (isDisabled && isDisabled.currentValue) {
      this.renderer.addClass(this.el.nativeElement, 'uk2-menu-list-disabled');
    }
  }

  private handleActiveClass(isActive: SimpleChange | undefined) {
    if (isActive) {
      this.renderer.removeClass(this.el.nativeElement, 'uk2-menu-list-active');
      if (isActive.currentValue && !this.uk2IsDisabled) {
        this.renderer.addClass(this.el.nativeElement, 'uk2-menu-list-active');
      }
    }
  }

  private handleLoadingChange(isLoading: SimpleChange | undefined) {
    if (isLoading) {
      if (isLoading.currentValue) {
        this.renderer.addClass(this.el.nativeElement, 'uk2-menu-list-loading');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'uk2-menu-list-loading');
      }
    }
  }

  private handleDividerChange(showDividerLine: SimpleChange | undefined) {
    if (showDividerLine) {
      if (showDividerLine.currentValue && !this.dividerElement) {
        this.createDivider();
      } else if (this.dividerElement) {
        this.renderer.removeChild(this.el.nativeElement, this.dividerElement);
        this.dividerElement = undefined;
      }
    }
  }

  private createDivider() {
    const dividerElement = this.renderer.createElement('div');
    this.renderer.addClass(dividerElement, 'uk2-menu-list-divider');
    this.renderer.appendChild(this.el.nativeElement, dividerElement);
    this.dividerElement = dividerElement;
  }

  private createSkeleton() {
    const skeletonContainer: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(skeletonContainer, 'uk2-menu-list-skeleton');

    const skeletonIcon: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(skeletonIcon, 'uk2-menu-list-skeleton-icon');
    this.renderer.appendChild(skeletonContainer, skeletonIcon);

    const skeletonUpperParagraph: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(skeletonUpperParagraph, 'uk2-menu-list-skeleton-paragraph');
    this.renderer.appendChild(skeletonContainer, skeletonUpperParagraph);

    const skeletonLowerParagraph: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(skeletonLowerParagraph, 'uk2-menu-list-skeleton-lower-paragraph');
    this.renderer.appendChild(skeletonContainer, skeletonLowerParagraph);

    this.renderer.appendChild(this.el.nativeElement, skeletonContainer);
  }
}
