import {
  Component,
  Input,
  Inject,
  TemplateRef,
  ContentChild,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import {
  Uk2ModalActionsGridEnum,
  Uk2ModalFontWeightEnum,
  Uk2ModalUniversalHeaderDensity,
  Uk2ModalTitleAlignEnum,
  Uk2ModalTitleTextBehaviorEnum,
} from './enums';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Uk2ModalHeaderVariant } from './enums/uk2-modal-header-variant';
import { Uk2ButtonSizeEnum, Uk2TextButtonVariant } from '@axos/uikit-v2-lib/src/lib/uk2-directives';

@Component({
  selector: 'uk2-modal',
  template: ' <div></div> ',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2ModalComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() showCloseButton = false;
  @Input() showHeader = true;
  @Input() headerVariant = Uk2ModalHeaderVariant.defaultHeader;
  @Input() disabledCloseOverlayBackdrop = true;
  @Input() hasBackdrop = true;
  @Input() showTitleDivider = false;
  @Input() showActionsDivider = false;
  @Input() actionsGrid = Uk2ModalActionsGridEnum.side;
  @Input() titleFontWeight = Uk2ModalFontWeightEnum.bold400;
  @Input() titleAlign = Uk2ModalTitleAlignEnum.left;
  @Input() innerPanelClass: string | string[] = 'uk2-modal-dialog-container';
  @Input() bodyContentAlignment = Uk2ModalTitleAlignEnum.left;
  @Input() modalId?: string = undefined;
  @Input() uk2EnableResponsiveFullscreen = false;
  @Input() uk2UniversalHeaderIsLoading = false;
  @Input() uk2UniversalHeaderTextBehavior: Uk2ModalTitleTextBehaviorEnum = Uk2ModalTitleTextBehaviorEnum.truncate;
  @Input() uk2UniversalHeaderDensity: Uk2ModalUniversalHeaderDensity = Uk2ModalUniversalHeaderDensity.medium;
  @Input() uk2UniversalHeaderShowBackButton = false;
  @ContentChild('uk2ModalContent') content?: TemplateRef<any>;
  @ContentChild('uk2ModalActions') actions?: TemplateRef<any>;
  @Output() notifyCloseParent = new EventEmitter<any>();
  @Output() backButtonCallback: EventEmitter<Function> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  closeDialog() {
    if (this.modalId) {
      this.dialog.getDialogById(this.modalId)?.close();
    } else {
      this.dialog.closeAll();
    }
  }

  openDialog() {
    if (this.disabledCloseOverlayBackdrop === false) {
      this.hasBackdrop = true;
    }

    const panelClass = typeof this.innerPanelClass === 'string' ? [this.innerPanelClass] : [...this.innerPanelClass];
    if (this.uk2EnableResponsiveFullscreen) {
      panelClass.push('uk2-modal-responsive-fullscreen-mode');
    }

    let dialogRef = this.dialog.open(Uk2ModalRenderComponent, {
      data: {
        title: this.title,
        subtitle: this.subtitle,
        headerVariant: this.uk2EnableResponsiveFullscreen ? Uk2ModalHeaderVariant.universalHeader : this.headerVariant,
        content: this.content,
        showCloseButton: this.showCloseButton,
        showHeader: this.showHeader,
        showTitleDivider: this.showTitleDivider,
        showActionsDivider: this.showActionsDivider,
        backButtonFunction: this.onBackButtonClick.bind(this),
        actions: this.actions,
        actionsGrid: this.actionsGrid,
        titleFontWeight: this.titleFontWeight,
        titleAlign: this.titleAlign,
        bodyContentAlignment: this.bodyContentAlignment,
        truncateUniversalHeader: this.uk2UniversalHeaderTextBehavior === Uk2ModalTitleTextBehaviorEnum.truncate,
        headerIsLoading: this.uk2UniversalHeaderIsLoading,
        headerDensity: this.uk2UniversalHeaderDensity,
        showBackButton: this.uk2UniversalHeaderShowBackButton,
      } as Uk2DialogData,
      id: this.modalId,
      disableClose: this.disabledCloseOverlayBackdrop,
      hasBackdrop: this.hasBackdrop,
      autoFocus: false,
      backdropClass: 'uk2-modal-backdrop',
      panelClass,
    });
    dialogRef.afterClosed().subscribe(() => this.notifyCloseParent.emit());
  }

  onBackButtonClick() {
    this.backButtonCallback.emit();
  }
}

@Component({
  selector: 'uk2-modal-render',
  templateUrl: './uk2-modal.component.html',
})
export class Uk2ModalRenderComponent implements AfterViewInit, OnDestroy {
  headerVariant = Uk2ModalHeaderVariant;
  navigationX = Uk2Tier1NavigationEnum.x;
  navigationBack = Uk2Tier1NavigationEnum.chevronLeft;

  buttonVariant: Uk2TextButtonVariant = Uk2TextButtonVariant.button;
  buttonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.small;

  destroyed$ = new Subject<void>();
  @ViewChild('uk2ModalContentSection') modalContent: ElementRef = new ElementRef(null);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Uk2DialogData) {}

  actionGridRender() {
    switch (this.data.actionsGrid) {
      case Uk2ModalActionsGridEnum.stacked:
        return 'uk2-modal-stacked-grid';
      case Uk2ModalActionsGridEnum.side:
        return 'uk2-modal-side-grid';
      case Uk2ModalActionsGridEnum.sideSpaced:
        return 'uk2-modal-side-spaced-grid';
      case Uk2ModalActionsGridEnum.centered:
        return 'uk2-modal-centered-grid';
      default:
        return 'uk2-modal-stacked-grid';
    }
  }

  ngAfterViewInit(): void {
    fromEvent(this.getModalContent().nativeElement, 'scroll')
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.setFade();
      });
    this.setFade();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onResize() {
    this.setFade();
  }

  onClickBackButton() {
    if (this.data.backButtonFunction) {
      this.data.backButtonFunction();
    }
  }

  titleAlignClass() {
    let str = this.data.titleAlign === Uk2ModalTitleAlignEnum.center ? 'uk2-modal-title-center' : '';

    if (this.data.showCloseButton && Uk2ModalTitleAlignEnum.center) {
      str += ' uk2-modal-title-center-padding-left';
    }

    return str;
  }

  bodyAlignClass() {
    return this.data.bodyContentAlignment === Uk2ModalTitleAlignEnum.center ? 'uk2-modal-content-center' : '';
  }

  getTitleClass() {
    return !this.data.subtitle ? 'uk2-modal-title-margin-bottom' : '';
  }

  closeButtonClass() {
    return this.data.showCloseButton ? 'uk2-modal-grid-x' : '';
  }

  getModalContent() {
    return this.modalContent;
  }

  setFade() {
    const el = this.getModalContent()?.nativeElement;
    if (el !== null) {
      const isScrollable = el.scrollHeight > el.clientHeight;
      if (!isScrollable) {
        el.classList.remove('uk2-modal-is-bottom-overflowing');
      } else {
        const isScrolledToBottom = el.scrollHeight <= el.clientHeight + el.scrollTop;
        el.classList.toggle('uk2-modal-is-bottom-overflowing', !isScrolledToBottom);
      }
    }
  }

  protected getHeaderState(): string {
    let headerClass = [];
    if (this.data.headerVariant === Uk2ModalHeaderVariant.universalHeader) {
      const densityClasses = {
        [Uk2ModalUniversalHeaderDensity.small]: 'uk2-header-density-sml',
        [Uk2ModalUniversalHeaderDensity.medium]: 'uk2-header-density-med',
        [Uk2ModalUniversalHeaderDensity.large]: 'uk2-header-density-lrg',
      };

      headerClass.push('uk2-modal-universal-header');
      headerClass.push(densityClasses[this.data.headerDensity]);
      if (this.data.headerIsLoading) {
        headerClass.push('uk2-modal-header-skeleton');
      }
    } else {
      headerClass.push('uk2-modal-default-header');
      this.data.titleFontWeight === Uk2ModalFontWeightEnum.bold400
        ? headerClass.push('uk2-header-density-lrg')
        : headerClass.push('uk2-header-density-med');
    }
    return headerClass.join(' ');
  }
}

export interface Uk2DialogData {
  title: string;
  subtitle: string;
  showCloseButton: boolean;
  showHeader: boolean;
  headerVariant: Uk2ModalHeaderVariant;
  content: TemplateRef<any>;
  showTitleDivider: boolean;
  showActionsDivider: boolean;
  actions: TemplateRef<any>;
  actionsGrid: Uk2ModalActionsGridEnum;
  titleFontWeight: Uk2ModalFontWeightEnum;
  titleAlign: Uk2ModalTitleAlignEnum;
  bodyContentAlignment: Uk2ModalTitleAlignEnum;
  headerIsLoading: boolean;
  backButtonFunction: Function;
  truncateUniversalHeader: boolean;
  headerDensity: Uk2ModalUniversalHeaderDensity;
  showBackButton: boolean;
}
