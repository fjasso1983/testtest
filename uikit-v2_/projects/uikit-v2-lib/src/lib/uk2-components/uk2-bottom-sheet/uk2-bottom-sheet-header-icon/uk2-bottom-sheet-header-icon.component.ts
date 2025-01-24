import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';

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
  @Input() titleheadericon!: string;
  @Input() showTitleDivider!: boolean;
  //@Input() close!: () => void;

  @Output() backButtonCallback: EventEmitter<Function> = new EventEmitter();
  @Output() close: EventEmitter<Function> = new EventEmitter();

  //private panelOverlayRef: OverlayRef | undefined;
  //private destroy$ = new Subject();
  //private overlayClose$ = new Subject();

  buttonSize = Uk2ButtonSizeEnum.medium;
  buttonVariant = Uk2TextButtonVariant.button;
  navigationX = Uk2Tier1NavigationEnum.x;
  navigationBack = Uk2Tier1NavigationEnum.chevronLeft;
  elementposition = Uk2ElementPositionEnum;
  leftposition = Uk2ElementPositionEnum.left;
  rightposition = Uk2ElementPositionEnum.right;
  centerposition = Uk2ElementPositionEnum.center;
  labeledIconPosition = Uk2LabeledIconPositionEnum.left;

  onClickBackButton() {
    this.backButtonCallback.emit();
    //  review fj probar desde docs
    console.log('Click Back button');
    alert('Back function was executed');
  }

  onClickCloseButton() {
    this.close.emit();
    //this.close();
    //this.closeButtonCallback.emit();
    //  review fj probar desde docs
    //console.log('Click close button');
    //alert('Close function was executed');
  }
}
