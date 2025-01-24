import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Uk2PanelHeaderTextBehaviorEnum, uk2PanelPosition } from './enums';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Component({
  selector: 'uk2-panel',
  templateUrl: './uk2-panel.component.html',
})
export class Uk2PanelComponent implements OnDestroy, OnChanges, IUk2IsLoading {
  @ViewChild('uk2PanelTemplate') uk2PanelTemplate!: TemplateRef<any>;
  @ContentChild('uk2PanelLeftHeaderIcons') leftHeaderIcons?: TemplateRef<any>;
  @ContentChild('uk2PanelRightHeaderIcons') rightHeaderIcons?: TemplateRef<any>;
  @ContentChild('uk2PanelHeader') header?: TemplateRef<any>;
  @ContentChild('uk2PanelContent') content?: TemplateRef<any>;
  @ContentChild('uk2PanelFooter') footer?: TemplateRef<any>;

  @Input() uk2BackdropClass = 'uk2-overlay';
  @Input() uk2PanelPosition: uk2PanelPosition = uk2PanelPosition.Right;
  @Input() uk2HeaderTextBehavior: Uk2PanelHeaderTextBehaviorEnum = Uk2PanelHeaderTextBehaviorEnum.truncate;
  @Input() uk2PanelClass: string | undefined;
  @Input() uk2PanelWidth: string | number | undefined = '80%';
  @Input() uk2PanelMaxWidth: string | number | undefined = 1280;
  @Input() uk2PanelMinWidth: string | number | undefined = 496;
  @Input() uk2ShowFooter = true;
  @Input() uk2CloseOnBackdropClick = false;
  @Input() uk2HeaderTitle = '';
  @Input() uk2IsLoading = false;
  @Input() uk2IsPanelResizable = false;

  protected panelStyles: string[] = [];
  protected headerTextBehavior = Uk2PanelHeaderTextBehaviorEnum;

  private panelOverlayRef: OverlayRef | undefined;
  private destroy$ = new Subject();
  private overlayClose$ = new Subject();

  constructor(private overlay: Overlay, public viewContainerRef: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Updates the size when the overlay is open
    if (this.panelOverlayRef) {
      switch (true) {
        case !!changes.panelWidth: {
          this.panelOverlayRef.updateSize({
            width: changes.panelWidth.currentValue,
          });
          break;
        }
        case !!changes.panelMaxWidth: {
          this.panelOverlayRef.updateSize({
            maxWidth: changes.panelMaxWidth.currentValue,
          });
          break;
        }
        case !!changes.panelMinWidth: {
          this.panelOverlayRef.updateSize({
            minWidth: changes.panelMinWidth.currentValue,
          });
          break;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.disposeOverlay();
    this.overlayClose$.next();
    this.overlayClose$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  openPanel() {
    this.setPanelClass();
    this.setPanelOverlayRef();
    this.listenBackdropClick();
    this.setHeaderIconClass();
  }

  closePanel() {
    if (this.panelOverlayRef) {
      this.overlayClose$.next();
      this.setPanelDisposeAnimation();
    }
  }

  private setPanelOverlayRef() {
    const positionStrategy = this.getPanelPosition();
    this.panelOverlayRef = this.overlay.create({
      positionStrategy,
      disposeOnNavigation: true,
      hasBackdrop: true,
      backdropClass: this.uk2BackdropClass,
      width: this.uk2PanelWidth,
      maxWidth: this.uk2PanelMaxWidth,
      minWidth: this.uk2PanelMinWidth,
    });

    const portal = new TemplatePortal(this.uk2PanelTemplate, this.viewContainerRef);
    this.panelOverlayRef.attach(portal);
  }

  private setPanelDisposeAnimation() {
    const panelElement = this.panelOverlayRef!.overlayElement.children[0];
    if (this.uk2PanelPosition === uk2PanelPosition.Left) {
      panelElement.classList.add('uk2-panel-animation-left-position-dispose');
    } else {
      panelElement.classList.add('uk2-panel-animation-right-position-dispose');
    }

    panelElement.addEventListener('animationend', () => this.disposeOverlay());
  }

  private disposeOverlay() {
    this.panelOverlayRef?.dispose();
    this.panelOverlayRef = undefined;
  }

  private setHeaderIconClass() {
    const headerElement = this.panelOverlayRef?.overlayElement.querySelector('.uk2-panel-header-content');
    const buttons = headerElement?.querySelectorAll('button');
    if (buttons) {
      buttons.forEach(button => {
        if (!button.classList.contains('uk2-panel-header-icon')) button.classList.add('uk2-panel-header-icon');
      });
    }
  }

  private setPanelClass() {
    this.panelStyles = [];
    if (this.uk2PanelClass) this.panelStyles.push(this.uk2PanelClass);
    if (this.uk2PanelPosition === uk2PanelPosition.Right) {
      this.panelStyles.push('uk2-panel-right-position');
    } else {
      this.panelStyles.push('uk2-panel-left-position');
    }
  }

  private getPanelPosition() {
    const positionStrategy = this.overlay.position().global();
    if (this.uk2PanelPosition === uk2PanelPosition.Right) {
      positionStrategy.end();
    } else {
      positionStrategy.start();
    }
    return positionStrategy;
  }

  private listenBackdropClick() {
    this.panelOverlayRef!.backdropClick()
      .pipe(
        takeUntil(this.overlayClose$),
        tap(() => {
          if (this.uk2CloseOnBackdropClick) this.closePanel();
        })
      )
      .subscribe();
  }
}
