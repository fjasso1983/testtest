import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';

import {
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayContainer,
  OverlayRef,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2ButtonSizeEnum } from '@axos/uikit-v2-lib/src/lib/uk2-directives';

import { Uk2MenuButtonCSSProperty, Uk2MenuButtonItem } from '../types';
import { Uk2MenuButtonScrollStrategy, Uk2MenuButtonSelectionTypeEnum } from '../enums';
import { uk2MenuButtonConstants } from '../constants';

@Component({
  selector: 'uk2-menu-button-overlay',
  templateUrl: './uk2-menu-button-overlay.component.html',
})
export class Uk2MenuButtonOverlayComponent implements OnDestroy, OnInit, OnChanges {
  @ViewChild(TemplateRef) content!: TemplateRef<any>;

  @Input() optionDividerLine!: TemplateRef<any>;
  @Input() optionTemplateRef!: TemplateRef<any>;
  @Input() uk2ButtonType: Uk2MenuButtonSelectionTypeEnum = Uk2MenuButtonSelectionTypeEnum.single;
  @Input()
  set uk2ItemList(value: Uk2MenuButtonItem[]) {
    this.localUk2ItemList = [...value];
  }
  @Input() uk2CSSPortalProperties: Uk2MenuButtonCSSProperty[] = [];
  @Input() menuItemsContainerMinHeight = 0;
  @Input() uk2ContentClass: string = uk2MenuButtonConstants.defaultContentClass;
  @Input() uk2DividerLineClass: string = uk2MenuButtonConstants.defaultDividerLineClass;
  @Input() uk2BackdropIsEnabled = true;
  @Input() uk2BackdropIsHidden = true;
  @Input() uk2BackdropCanBeClosedWhenHasBeenClicked = true;
  @Input() uk2BackdropClass = uk2MenuButtonConstants.defaultBackdropClass;
  @Input() uk2ScrollStrategy = Uk2MenuButtonScrollStrategy.block;
  @Input() menuButton!: ElementRef<HTMLButtonElement>;
  @Input() isMobileSize = false;
  @Input() bottomSheetTitle?: string;
  @Input() bottomSheetDescription?: string;
  @Output() selectOptionIndex = new EventEmitter<number>();
  @Output() multipleOptionsSelect = new EventEmitter<Uk2MenuButtonItem[]>();

  flyoutOverlayReference: OverlayRef | undefined;
  overlayPortal?: TemplatePortal<any>;
  flyoutIsOpen = false;
  buttonType = Uk2MenuButtonSelectionTypeEnum;
  uk2ButtonSize = Uk2ButtonSizeEnum.large;
  localUk2ItemList: Uk2MenuButtonItem[] = [];

  private destroyed = new EventEmitter<void>();
  private matBottomSheetRef?: MatBottomSheetRef;
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private bottomSheet = inject(MatBottomSheet);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private overlayContainer = inject(OverlayContainer);

  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.close();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.uk2CSSPortalProperties) {
      this.setPortalOutletCSSVariables(changes.uk2CSSPortalProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  open() {
    if (!this.isMobileSize) {
      this.openOverlay();
    } else {
      this.openBottomSheet();
    }
  }

  close() {
    this.matBottomSheetRef?.dismiss();
    this.clearFlyoutContainer();
    this.changeDetectorRef.markForCheck();
  }

  handleMultipleSelection(selectedItemIndex: number) {
    // emits index of selected option in overlay menu
    if (!this.isMobileSize) {
      this.selectOptionIndex.emit(selectedItemIndex);

      return;
    }

    // handle selection in component state in bottom sheet overlay until user click 'Apply' button
    this.localUk2ItemList = this.localUk2ItemList.map((item, index) => {
      if (index === selectedItemIndex) {
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      }

      return item;
    });
  }

  handleBottomSheetApplyButton() {
    this.multipleOptionsSelect.emit(this.localUk2ItemList);
  }

  isAnyOptionSelected(): boolean {
    return this.localUk2ItemList.some(item => item.isSelected);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    if (this.flyoutOverlayReference) {
      const flyoutElement = this.flyoutOverlayReference.overlayElement;
      if (!this.menuButton?.nativeElement.contains(event.target) && !flyoutElement?.contains(event.target)) {
        this.close();
      }
    }
  }

  private openOverlay() {
    if (this.flyoutIsOpen) return;

    this.createFlyoutContainer();
    this.flyoutIsOpen = !this.flyoutIsOpen;
  }

  private openBottomSheet() {
    this.matBottomSheetRef = this.bottomSheet.open(this.content, {
      panelClass: uk2MenuButtonConstants.defaultBottomSheetClass,
    });
    this.setPortalOutletCSSVariables(this.uk2CSSPortalProperties);
  }

  private createFlyoutContainer() {
    this.flyoutOverlayReference = this.createOverlay();
    this.overlayPortal = new TemplatePortal(this.content!, this.viewContainerRef);
    this.setPortalOutletCSSVariables(this.uk2CSSPortalProperties);
    this.flyoutOverlayReference.attach(this.overlayPortal);
    if (this.validatePropertiesToPreventCloseFlyoutByBackdropClick()) {
      this.handleBackdropClickEventToPreventCloseFlyout();
    }
  }

  private createOverlay(): OverlayRef {
    const overlayRef = this.overlay.create({
      disposeOnNavigation: true,
      positionStrategy: this.getPositionStrategy(),
      scrollStrategy: this.getScrollStrategy(),
      hasBackdrop: this.uk2BackdropIsEnabled,
      backdropClass: this.getBackdropClass(),
    });

    return overlayRef;
  }

  private getScrollStrategy(): ScrollStrategy {
    switch (this.uk2ScrollStrategy) {
      case Uk2MenuButtonScrollStrategy.block:
        return this.overlay.scrollStrategies.block();
      case Uk2MenuButtonScrollStrategy.close:
        return this.overlay.scrollStrategies.close();
      case Uk2MenuButtonScrollStrategy.noop:
        return this.overlay.scrollStrategies.noop();
      case Uk2MenuButtonScrollStrategy.reposition:
        return this.overlay.scrollStrategies.reposition();
      default:
        return this.overlay.scrollStrategies.noop();
    }
  }

  private getPositionStrategy(): FlexibleConnectedPositionStrategy {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.menuButton!)
      .withPositions([
        {
          originX: 'start', // top-left
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4,
          weight: 1,
        },
        {
          originX: 'end', // top-right
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 4,
          weight: 1,
        },
      ]);

    return positionStrategy;
  }

  private getBackdropClass(): string {
    if (this.uk2BackdropIsEnabled && this.uk2BackdropIsHidden) {
      return MATERIAL_CLASSES.cdkOverlayTransparentBackdrop;
    }

    return this.uk2BackdropClass;
  }

  private setPortalOutletCSSVariables(properties: Uk2MenuButtonCSSProperty[]): void {
    for (const property of properties) {
      this.getOverlayElement()?.style.setProperty(property.name, property.value);
    }
  }

  /**
   * @description Validate if the overlay can be closed when its backdrop is clicked.
   *
   * @remarks This behavior is only allowed for single-select type.
   * Currently, it is not possible to handle this in multi-select
   * because the flyout is kept open to allow users to select options.
   * And it can only be closed by clicking outside the flyout.
   *
   * Re-designing the flyout would be needed to prevent backdrop click on multi-select.
   */
  private validatePropertiesToPreventCloseFlyoutByBackdropClick(): boolean {
    if (!this.uk2BackdropIsEnabled) return false;

    if (this.uk2BackdropCanBeClosedWhenHasBeenClicked) return false;

    const multipleSelectionType = Uk2MenuButtonSelectionTypeEnum.multiple;

    if (this.uk2ButtonType === multipleSelectionType) return false;

    return true;
  }

  private handleBackdropClickEventToPreventCloseFlyout(): void {
    if (!this.flyoutOverlayReference) return;

    this.flyoutOverlayReference
      .backdropClick()
      .pipe(takeUntil(this.destroyed))
      .subscribe((event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
      });
  }

  private clearFlyoutContainer() {
    this.flyoutOverlayReference?.dispose();
    this.flyoutOverlayReference = undefined;
    this.flyoutIsOpen = false;
  }

  private getOverlayElement(): HTMLElement | null {
    return this.overlayContainer.getContainerElement()?.querySelector<HTMLElement>('.cdk-overlay-pane');
  }
}
