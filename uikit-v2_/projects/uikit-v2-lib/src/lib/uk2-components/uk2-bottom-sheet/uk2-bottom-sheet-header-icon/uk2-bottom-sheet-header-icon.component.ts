import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

import {
  Uk2ButtonSizeEnum,
  Uk2ElementPositionEnum,
  Uk2TextButtonVariant,
  Uk2LabeledIconPositionEnum,
} from '@axos/uikit-v2-lib/src/lib/uk2-directives';

import { Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';
@Component({
  selector: 'uk2-bottom-sheet-header-icon',
  templateUrl: './uk2-bottom-sheet-header-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2BottomSheetHeaderIconComponent {
  @Input() titleHeader!: string;
  @Input() enableBackButton!: boolean;
  @Input() backButtonLabel?: string;
  @Input() enableCloseButton!: boolean;
  @Input() showNavigationIcons!: boolean;
  @Input() showDivider!: boolean;
  @Output() navigateBackButton: EventEmitter<void> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  buttonSize = Uk2ButtonSizeEnum.medium;
  buttonVariant = Uk2TextButtonVariant.button;
  navigationIconX = Uk2Tier1NavigationEnum.x;
  navigationIconBack = Uk2Tier1NavigationEnum.chevronLeft;
  elementPosition = Uk2ElementPositionEnum;
  labeledIconPosition = Uk2LabeledIconPositionEnum.left;

  onClickBackButton() {
    this.navigateBackButton.emit();
  }

  onClickCloseButton() {
    this.close.emit();
  }
}
