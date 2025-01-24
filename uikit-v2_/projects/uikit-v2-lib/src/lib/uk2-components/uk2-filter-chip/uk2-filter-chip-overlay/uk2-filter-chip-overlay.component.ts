import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
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
import { Uk2FilterChipOverlayOptionComponent } from '../uk2-filter-chip-overlay-option';

@Component({
  selector: 'uk2-filter-chip-overlay',
  templateUrl: './uk2-filter-chip-overlay.component.html',
})
export class Uk2FilterChipOverlayComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input() uk2AttachedElement!: ElementRef;
  @ViewChild('template') template!: TemplateRef<Element>;
  @ViewChild('clearSelection') clearSelection!: ElementRef;
  @ContentChildren(Uk2FilterChipOverlayOptionComponent)
  uk2Options!: QueryList<Uk2FilterChipOverlayOptionComponent>;
  vcr = inject(ViewContainerRef);
  overlay = inject(Overlay);
  uk2FilterChipStateService = inject(Uk2FilterChipStateService);
  isActive$ = this.uk2FilterChipStateService?.filterChipState$.pipe(map(state => state.isActive));
  overlayMinWidth$ = this.uk2FilterChipStateService?.filterChipState$.pipe(map(state => state.overlayMinWidth));
  overlayRef?: OverlayRef;
  keyManager!: FocusKeyManager<Uk2FilterChipOverlayOptionComponent>;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.uk2FilterChipStateService.openOverlay$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.keyManager.setFirstItemActive();
    });
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.uk2Options).withWrap();
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

  close() {
    this.overlayRef?.detach();
    this.overlayRef = undefined;
    this.uk2FilterChipStateService?.setPressed(false);
  }

  isOpen() {
    return this.overlayRef !== undefined;
  }

  clearValue() {
    this.uk2FilterChipStateService?.setValue('');
    this.uk2FilterChipStateService?.optionSelected();
  }

  moveFocus(event: KeyboardEvent) {
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
