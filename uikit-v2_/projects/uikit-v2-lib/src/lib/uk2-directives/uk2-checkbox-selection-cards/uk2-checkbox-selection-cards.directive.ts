import { HostListener, OnDestroy, Renderer2 } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AfterViewInit, Directive, Input, OnChanges, OnInit, SimpleChanges, ElementRef } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { IUk2IsLoading, MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: 'mat-selection-list[uk2CheckboxSelectionCards][disableRipple]',
})
export class Uk2CheckboxSelectionCardsDirective implements OnInit, OnChanges, OnDestroy, AfterViewInit, IUk2IsLoading {
  @Input() uk2IsLoading = false;
  @Input() uk2IsRadio = false;

  uk2CheckboxSelectionCardsSkeletonTemplate: HTMLElement = this.renderer.createElement('div');
  uk2SingleOptionIconTemplate: HTMLElement = this.renderer.createElement('div');
  matSelectionList: HTMLElement = this.elementRef.nativeElement.closest(`.${MATERIAL_CLASSES.matSelectionList}`);

  private observer!: MutationObserver;
  private isContentLoaded = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private host: MatSelectionList
  ) {}

  ngOnInit(): void {
    this.addUk2Classes();
  }

  ngOnChanges(changes: SimpleChanges) {
    /* istanbul ignore else */
    if (!this.uk2CheckboxSelectionCardsSkeletonTemplate.classList.contains('uk2-checkbox-selection-cards-skeleton')) {
      this.matSelectionList = this.elementRef.nativeElement.closest(`.${MATERIAL_CLASSES.matSelectionList}`);
      this.uk2CheckboxSelectionCardsSkeletonTemplate = this.createSkeletonTemplate(this.matSelectionList);
    }

    /* istanbul ignore else */
    if (changes.uk2IsLoading) {
      this.toggleIsLoading(
        changes.uk2IsLoading.currentValue,
        this.matSelectionList,
        this.uk2CheckboxSelectionCardsSkeletonTemplate
      );
    }

    if (changes.uk2IsRadio && !changes.uk2IsRadio.firstChange) {
      this.addUk2Classes();
    }
  }

  ngAfterViewInit(): void {
    // Create a new MutationObserver instance to watch for changes in the DOM
    this.observer = new MutationObserver(mutations => {
      // Iterate over each mutation that was observed
      mutations.forEach(mutation => {
        // Check if there are added nodes in the mutation
        if (mutation.addedNodes.length > 0) {
          // If the selection is not multi-selection, add chevron icons to list items
          this.addChevronIcon();
        }
      });
    });

    // Start observing the element for child list changes and subtree changes
    this.observer.observe(this.elementRef.nativeElement, {
      childList: true, // Observe direct children of the target
      subtree: true, // Observe all descendants of the target
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('click') onClick() {
    const options = this.elementRef.nativeElement.querySelectorAll(`.${MATERIAL_CLASSES.matSelectionListOption}`);
    for (const option of options) {
      if (option.getAttribute('aria-selected') == 'true') {
        option.classList.add('mat-list-single-selected-option');
      } else {
        option.classList.remove('mat-list-single-selected-option');
      }
    }
  }

  private addUk2Classes() {
    this.elementRef.nativeElement.classList.add('uk2-checkbox-selection-cards');
    if (this.isMultiSelection()) return;
    if (this.uk2IsRadio) {
      this.elementRef.nativeElement.classList.remove('uk2-hide-radio-section');
    } else {
      this.elementRef.nativeElement.classList.add('uk2-hide-radio-section');
    }
  }

  private toggleIsLoading(uk2IsLoading: Boolean, target: HTMLElement, template: HTMLElement) {
    if (uk2IsLoading) {
      this.renderer.addClass(target, 'uk2-hidden');
      this.renderer.removeClass(template, 'uk2-hidden');
    } else {
      this.renderer.removeClass(target, 'uk2-hidden');
      this.renderer.addClass(template, 'uk2-hidden');
    }
  }

  private createSingleOptionIconTemplate(target: HTMLElement) {
    const template = this.renderer.createElement('div');
    this.renderer.addClass(template, 'uk2-checkbox-selection-cards-single-option-icon');
    const icon = this.renderer.createElement('div');
    this.renderer.addClass(icon, 'uk2-checkbox-selection-cards-icon');
    this.renderer.appendChild(template, icon);
    this.renderer.setStyle(
      template.querySelector('.uk2-checkbox-selection-cards-icon'),
      '-webkit-mask-image',
      "url('/uk2/assets/svg/icons/uk2-checkbox-selection-cards-chevron-icon.svg')"
    );

    this.renderer.setStyle(
      template.querySelector('.uk2-checkbox-selection-cards-icon'),
      'mask-image',
      "url('/uk2/assets/svg/icons/uk2-checkbox-selection-cards-chevron-icon.svg')"
    );
    this.renderer.appendChild(this.renderer.parentNode(target), template);

    return template;
  }

  private createSkeletonTemplate(target: HTMLElement) {
    const template = this.renderer.createElement('div'),
      iconSkeleton = this.renderer.createElement('div'),
      textSkeletonContainer = this.renderer.createElement('div'),
      textSkeleton = this.renderer.createElement('div'),
      textSkeleton2 = this.renderer.createElement('div'),
      textSkeleton3 = this.renderer.createElement('div'),
      containerCard = this.renderer.createElement('div');

    this.renderer.addClass(template, 'uk2-checkbox-selection-cards-skeleton');
    this.renderer.addClass(iconSkeleton, 'uk2-checkbox-selection-cards-skeleton-icon-container');
    this.renderer.addClass(containerCard, 'uk2-checkbox-selection-cards-skeleton-container-card');
    this.renderer.appendChild(template, containerCard);
    this.renderer.appendChild(containerCard, iconSkeleton);
    this.renderer.addClass(textSkeletonContainer, 'uk2-checkbox-selection-cards-skeleton-text-container');
    this.renderer.appendChild(containerCard, textSkeletonContainer);
    this.renderer.addClass(textSkeleton, 'uk2-checkbox-selection-cards-skeleton-text-start');
    this.renderer.appendChild(textSkeletonContainer, textSkeleton);
    this.renderer.addClass(textSkeleton2, 'uk2-checkbox-selection-cards-skeleton-text-middle');
    this.renderer.appendChild(textSkeletonContainer, textSkeleton2);
    this.renderer.addClass(textSkeleton3, 'uk2-checkbox-selection-cards-skeleton-text-end');
    this.renderer.appendChild(textSkeletonContainer, textSkeleton3);
    this.renderer.addClass(template, 'uk2-hidden');
    this.renderer.insertBefore(this.renderer.parentNode(target), template, target);

    return template;
  }

  private isMultiSelection(): boolean {
    return this.host.multiple;
  }

  private addChevronIconToListItems(): void {
    const options = this.elementRef.nativeElement.querySelectorAll('.uk2-checkbox-selection-cards-text-container');
    for (const option of options) {
      this.createSingleOptionIconTemplate(option);
    }
  }

  private addChevronIcon(): void {
    if (!this.isContentLoaded && !this.isMultiSelection()) {
      this.addChevronIconToListItems();
      this.isContentLoaded = true;
      this.changeDetectorRef.detectChanges();
    }
  }
}
