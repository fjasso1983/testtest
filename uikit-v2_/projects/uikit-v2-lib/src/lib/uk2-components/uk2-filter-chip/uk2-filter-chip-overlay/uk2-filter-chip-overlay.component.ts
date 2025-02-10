import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';

import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { FocusKeyManager } from '@angular/cdk/a11y';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { IUk2FilterChipOverlay } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2FilterChipOverlayOptionComponent } from '../uk2-filter-chip-overlay-option';

@Component({
  selector: 'uk2-filter-chip-overlay',
  templateUrl: './uk2-filter-chip-overlay.component.html',
})
export class Uk2FilterChipOverlayComponent implements OnInit, OnDestroy, AfterContentInit, IUk2FilterChipOverlay {
  @Input() uk2AttachedElement!: ElementRef;
  @Input() uk2FilterChipOverlayOptions!: Uk2FilterChipOverlayOptionComponent[];
  @ViewChild('template') template!: TemplateRef<Element>;
  @ViewChild('clearSelection') clearSelection!: ElementRef;
  vcr = inject(ViewContainerRef);
  overlay = inject(Overlay);
  uk2FilterChipStateService = inject(Uk2FilterChipStateService);
  isActive$ = this.uk2FilterChipStateService?.filterChipState$.pipe(map(state => state.isActive));
  overlayMinWidth$ = this.uk2FilterChipStateService?.filterChipState$.pipe(map(state => state.overlayMinWidth));
  showClearSelection$ = this.uk2FilterChipStateService?.filterChipState$.pipe(map(state => state.showClearSelection));
  overlayRef?: OverlayRef;
  keyManager!: FocusKeyManager<Uk2FilterChipOverlayOptionComponent>;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.uk2FilterChipStateService.openOverlay$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.keyManager.setFirstItemActive();
    });
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.uk2FilterChipOverlayOptions).withWrap();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  open(): OverlayRef {
    const overlayConfig: OverlayConfig = {
      disposeOnNavigation: true,
      positionStrategy: this.getPositionStrategy(),
    };
    this.overlayRef = this.overlay.create(overlayConfig);
    const portal = new TemplatePortal(this.template, this.vcr);
    this.overlayRef.attach(portal);
    this.uk2FilterChipStateService?.setPressed(true);
    this.keyManager.setActiveItem(0);

    return this.overlayRef;
  }

  close(): void {
    this.overlayRef?.detach();
    this.overlayRef = undefined;
    this.uk2FilterChipStateService?.setPressed(false);
  }

  isOpen(): boolean {
    return this.overlayRef !== undefined;
  }

  clearValue(): void {
    const closeOverlay = this.uk2FilterChipStateService?.getCloseOverlayAfterClear();

    this.uk2FilterChipStateService?.setValue('');
    this.uk2FilterChipStateService?.optionSelected();

    // Close overlay if client configured to do so
    if (closeOverlay) {
      this.close();
    }
  }

  handleKeyEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault();
        this.keyManager?.setPreviousItemActive();
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        this.keyManager?.setNextItemActive();
        break;
      }
      case 'Tab': {
        event.preventDefault();
        this.clearSelection?.nativeElement.focus();
        break;
      }
      case 'Escape': {
        event.preventDefault();
        this.close();
        break;
      }
    }
  }

  private getPositionStrategy() {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.uk2AttachedElement)
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
  }
}
