import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { uk2ProgressBarConstants } from './constants/constants';
import { Uk2ButtonSizeEnum } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { Uk2ProgressBarLabeledIconButtonModel } from './models';

@Component({
  selector: 'uk2-progress-bar',
  templateUrl: './uk2-progress-bar.component.html',
})
export class Uk2ProgressBarComponent implements OnChanges, IUk2IsLoading {
  @Input() uk2LogoImgPath = '';
  @Input() uk2OrganizationName = '';
  @Input() uk2IsLoading = false;
  @Input() uk2ProgressBarValue = 0;
  @Input() uk2HeaderText = '';
  @Input() uk2HeaderIconButton: Uk2ProgressBarLabeledIconButtonModel | undefined = undefined;
  @Output() uk2HeaderCallBackButton: EventEmitter<any> = new EventEmitter();
  @Input() uk2FooterIconButton: Uk2ProgressBarLabeledIconButtonModel | undefined = undefined;
  @Output() uk2FooterCallBackButton: EventEmitter<any> = new EventEmitter();
  buttonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.small;
  buttonSizeMedium: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.medium;
  displayHeaderButton = false;
  displayFooterButton = false;
  constructor() {}

  ngOnChanges() {
    this.inputIconButtonChange((sw: boolean) => {
      this.displayHeaderButton = sw;
    }, this.uk2HeaderIconButton);

    this.inputIconButtonChange((sw: boolean) => {
      this.displayFooterButton = sw;
    }, this.uk2FooterIconButton);
  }

  inputIconButtonChange(callback: any, iconButtonModel: Uk2ProgressBarLabeledIconButtonModel | undefined) {
    callback(iconButtonModel !== undefined);
    if (iconButtonModel !== undefined) {
      if (
        iconButtonModel.svgIconName == undefined ||
        iconButtonModel.svgIconName == '' ||
        iconButtonModel.svgIconName === null
      ) {
        throw new Error(uk2ProgressBarConstants.errorMessages.svgIconName);
      }

      if (
        iconButtonModel.labelText == undefined ||
        iconButtonModel.labelText == '' ||
        iconButtonModel.labelText === null
      ) {
        throw new Error(uk2ProgressBarConstants.errorMessages.labelText);
      }
    }
  }

  actionFooterButtonClick() {
    this.uk2FooterCallBackButton.emit();
  }

  actionHeaderButtonClick() {
    this.uk2HeaderCallBackButton.emit();
  }

  getSkeletonClass() {
    return this.uk2IsLoading ? 'uk2-progress-bar-skeleton' : '';
  }
}
