import { Uk2Tier1AlertsEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { Uk2TooltipStrategyEnum, Uk2TooltipPlacementEnum, Uk2TooltipTriggerEnum, Uk2TooltipSizeEnum } from '../enums';

export class Uk2TooltipConfigModel {
  bodyText: string;
  labelText: string;
  svgIconName: string;
  uk2IsLoading: boolean;
  arrowOffset: number;
  displayCloseButton: boolean;
  desktopOpenMode: Uk2TooltipTriggerEnum;
  placement: Uk2TooltipPlacementEnum;
  strategy: Uk2TooltipStrategyEnum;
  size: Uk2TooltipSizeEnum;

  constructor(uk2TooltipConfig: Partial<Uk2TooltipConfigModel> = {}) {
    const {
      bodyText = '',
      labelText = '',
      svgIconName = Uk2Tier1AlertsEnum.infoCircle,
      uk2IsLoading = false,
      arrowOffset = 0,
      displayCloseButton = false,
      desktopOpenMode = Uk2TooltipTriggerEnum.hover,
      placement = Uk2TooltipPlacementEnum.auto,
      strategy = Uk2TooltipStrategyEnum.absolute,
      size = Uk2TooltipSizeEnum.large,
    } = uk2TooltipConfig;

    this.bodyText = bodyText;
    this.labelText = labelText;
    this.svgIconName = svgIconName;
    this.uk2IsLoading = uk2IsLoading;
    this.arrowOffset = arrowOffset;
    this.displayCloseButton = displayCloseButton;
    this.desktopOpenMode = desktopOpenMode;
    this.placement = placement;
    this.strategy = strategy;
    this.size = size;
  }
}
