import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import {
  Uk2ModalActionsGridEnum,
  Uk2ModalTitleAlignEnum,
  Uk2ModalFontWeightEnum,
  Uk2ButtonSizeEnum,
  Uk2ModalComponent,
  Uk2IconRegistryService,
  Uk2ModalHeaderVariant,
  Uk2ModalTitleTextBehaviorEnum,
  Uk2ModalUniversalHeaderDensity,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-modal',
  templateUrl: './modal-basic-usage.component.html',
  styleUrls: ['./modal-basic-usage.component.css'],
})
export class ModalComponent implements OnChanges {
  @Input() contentTemplate =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
  @Input() title = 'Lorem ipsum dolor';
  @Input() subtitle = 'Amet consecutar etum';
  @Input() showCloseButton = false;
  @Input() primaryButton = true;
  @Input() primaryButtonText = 'Lorem Ipsum';
  @Input() primaryButtonCloseModal = false;
  @Input() secondaryButton = true;
  @Input() secondaryButtonText = 'Lorem Ipsum';
  @Input() secondaryButtonCloseModal = false;
  @Input() textButton = true;
  @Input() textButtonText = 'Lorem Ipsum';
  @Input() textButtonCloseModal = false;
  @Input() disabledCloseOverlayBackdrop = true;
  @Input() hasBackdrop = true;
  @Input() showTitleDivider = false;
  @Input() showActionsDivider = false;
  @Input() showHeader = true;
  @Input() headerVariant = Uk2ModalHeaderVariant.defaultHeader;
  @Input() actionsGrid = Uk2ModalActionsGridEnum.side;
  @Input() titleFontWeight = Uk2ModalFontWeightEnum.bold400;
  @Input() titleAlign = Uk2ModalTitleAlignEnum.left;
  @Input() contentAlign = Uk2ModalTitleAlignEnum.left;
  @Input() enableResponsiveFullscreen = false;
  @Input() uk2UniversalHeaderIsLoading = false;
  @Input() uk2UniversalHeaderTextBehavior = Uk2ModalTitleTextBehaviorEnum.truncate;
  @Input() uk2UniversalHeaderDensity: Uk2ModalUniversalHeaderDensity = Uk2ModalUniversalHeaderDensity.medium;
  @Input() uk2UniversalHeaderShowBackButton = false;
  @ViewChild('modal') modal?: Uk2ModalComponent;
  @Output() clickEvent = new EventEmitter();
  @Output() backButtonClickEvent = new EventEmitter();

  buttonSize = Uk2ButtonSizeEnum;

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabledCloseOverlayBackdrop) {
      if (changes.disabledCloseOverlayBackdrop.currentValue == false) {
        this.forceHasBackdrop();
      }
    }

    if (changes.hasBackdrop) {
      if (changes.hasBackdrop.currentValue == false && this.disabledCloseOverlayBackdrop == false) {
        this.forceHasBackdrop();
      }
    }

    this.closeModal();
  }

  openModal() {
    this.modal?.openDialog();
  }

  closeModal() {
    this.modal?.closeDialog();
  }

  backButtonAction() {
    this.backButtonClickEvent.emit();
  }

  // Empty method to catch event in storybook control to update value:
  forceHasBackdrop() {}
}
