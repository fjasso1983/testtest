import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { Uk2FlyoutMenuXPosition, Uk2FlyoutMenuYPosition } from '../enums';

import { uk2FlyoutMenuConstants } from '../constants';

@Directive({
  selector: '[uk2FlyoutMenu]',
  exportAs: 'uk2FlyoutMenu',
})
export class Uk2FlyoutMenuDirective implements AfterViewInit, OnDestroy {
  @Input() uk2FlyoutTemplate!: TemplateRef<unknown> | undefined;
  @Input() uk2OriginXPosition: Uk2FlyoutMenuXPosition = Uk2FlyoutMenuXPosition.end;
  @Input() uk2OverlayXPosition: Uk2FlyoutMenuXPosition = Uk2FlyoutMenuXPosition.end;
  @Input() uk2OriginYPosition: Uk2FlyoutMenuYPosition = Uk2FlyoutMenuYPosition.bottom;
  @Input() uk2OverlayYPosition: Uk2FlyoutMenuYPosition = Uk2FlyoutMenuYPosition.top;
  @Input() uk2OverlayYOffset = 0;
  @Input() uk2OverlayHasBackdrop = true;
  @Input() uk2OverlayBackdropClass = '';
  @Input() uk2CloseOnClickOutside = true;
  @Output() uk2OverlayOpened = new EventEmitter<void>();
  @Output() uk2OverlayClosed = new EventEmitter<void>();

  private flyoutOverlayRef: OverlayRef | undefined;

  constructor(private elementRef: ElementRef, private overlay: Overlay, private viewContainerRef: ViewContainerRef) {}

  ngAfterViewInit(): void {
    if (!this.uk2FlyoutTemplate) {
      throw new Error(uk2FlyoutMenuConstants.errorMessages.missingTemplate);
    }
  }

  ngOnDestroy(): void {
    this.close();
  }

  toggle() {
    this.flyoutOverlayRef ? this.close() : this.open();
  }

  open() {
    if (this.flyoutOverlayRef) return;

    const positionStrategy = this.getPositionStrategy();

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    this.flyoutOverlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: this.uk2OverlayHasBackdrop,
      disposeOnNavigation: true,
      backdropClass: [uk2FlyoutMenuConstants.cssClasses.backdrop, this.uk2OverlayBackdropClass],
    });

    this.flyoutOverlayRef.backdropClick().subscribe(() => {
      if (this.uk2CloseOnClickOutside) {
        this.close();
      }
    });

    const portal = new TemplatePortal(this.uk2FlyoutTemplate!, this.viewContainerRef);
    this.flyoutOverlayRef.attach(portal);
    this.flyoutOverlayRef.addPanelClass(uk2FlyoutMenuConstants.cssClasses.flyout);
    this.uk2OverlayOpened.emit();
  }

  close() {
    this.flyoutOverlayRef?.dispose();
    this.flyoutOverlayRef = undefined;
    this.uk2OverlayClosed.emit();
  }

  isFlyoutOpen() {
    return !!this.flyoutOverlayRef;
  }

  private getPositionStrategy() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          offsetY: this.uk2OverlayYOffset,
          originX: this.uk2OriginXPosition,
          originY: this.uk2OriginYPosition,
          overlayX: this.uk2OverlayXPosition,
          overlayY: this.uk2OverlayYPosition,
          weight: 1,
        },
      ]);

    return positionStrategy;
  }
}
