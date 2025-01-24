import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { Uk2Tier1AlertsEnum, Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { Uk2ButtonSizeEnum } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { Uk2AlertBannerBehaviorEnum, Uk2AlertBannerTypeEnum } from './enums';
import { uk2AlertBannerErrorConstants } from './constants';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
@Component({
  selector: 'uk2-alert-banner',
  templateUrl: './uk2-alert-banner.component.html',
})
export class Uk2AlertBannerComponent implements OnInit, OnChanges, IUk2IsLoading {
  @Output() uk2AlertBannerDismissBannerAction: EventEmitter<void> = new EventEmitter();
  @Output() uk2AlertBannerHyperlinkAction: EventEmitter<void> = new EventEmitter();
  @Input() uk2AlertBannerBodyText = '';
  @Input() uk2AlertBannerHeaderText = '';
  @Input() uk2AlertBannerHyperlinkText = '';
  @Input() uk2AlertBannerSvgIconName = '';
  @Input() uk2IsLoading = false;
  @Input() uk2AlertBannerType: Uk2AlertBannerTypeEnum | undefined;
  @Input() uk2AlertBannerBehavior: Uk2AlertBannerBehaviorEnum | undefined;
  @Input() uk2AlertbannerAnimateOnDisplay = true;

  dismissButtonSize = Uk2ButtonSizeEnum.small;
  dismissButtonIcon = Uk2Tier1NavigationEnum.x;
  svgIconNameToDisplay = '';
  dismissClick: Boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.validateInput();
    this.setDefaultIcon();
  }

  ngOnChanges(): void {
    this.setDefaultIcon();
  }

  validateInput() {
    if (
      this.uk2AlertBannerType == undefined ||
      !Object.values(Uk2AlertBannerTypeEnum).includes(this.uk2AlertBannerType)
    ) {
      throw new Error(uk2AlertBannerErrorConstants.errorAlertBannerType);
    }

    if (
      this.uk2AlertBannerBehavior == undefined ||
      !Object.values(Uk2AlertBannerBehaviorEnum).includes(this.uk2AlertBannerBehavior)
    ) {
      throw new Error(uk2AlertBannerErrorConstants.errorAlertBannerBehavior);
    }

    if (this.uk2AlertBannerBodyText.length === 0) {
      throw new Error(uk2AlertBannerErrorConstants.errorAlertBannerBodyText);
    }
  }

  setDefaultIcon() {
    if (this.uk2AlertBannerSvgIconName == '') {
      switch (this.uk2AlertBannerType) {
        case Uk2AlertBannerTypeEnum.alert:
          this.svgIconNameToDisplay = Uk2Tier1AlertsEnum.exclamationTriangle;
          break;
        case Uk2AlertBannerTypeEnum.inform:
          this.svgIconNameToDisplay = Uk2Tier1AlertsEnum.infoCircle;
          break;
        default:
          break;
      }
    } else {
      this.svgIconNameToDisplay = this.uk2AlertBannerSvgIconName;
    }
  }

  dismissBannerAction() {
    this.dismissClick = true;
    setTimeout(() => {
      this.uk2AlertBannerDismissBannerAction.emit();
      this.dismissClick = false;
    }, 500);
  }

  urlBannerAction() {
    this.uk2AlertBannerHyperlinkAction.emit();
  }

  getClasses() {
    let classes = '';
    switch (this.uk2AlertBannerType) {
      case Uk2AlertBannerTypeEnum.alert:
        classes = 'uk2-alert-banner-alert';
        break;
      case Uk2AlertBannerTypeEnum.inform:
        classes = 'uk2-alert-banner-inform';
        break;
      default:
        break;
    }

    return classes;
  }

  getAnimationClasses() {
    let classes = '';

    if (this.uk2AlertbannerAnimateOnDisplay) {
      classes += ' uk2-alert-banner-animation';
    }

    if (this.dismissClick) {
      classes += ' uk2-alert-banner-dismiss-animation';
    }

    return classes;
  }

  isDismissible() {
    return this.uk2AlertBannerBehavior == Uk2AlertBannerBehaviorEnum.dismissible;
  }
}
