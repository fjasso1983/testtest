import { Uk2TooltipConfigModel } from '../../uk2-tooltip/models';
import { Uk2TooltipSizeEnum, Uk2TooltipStrategyEnum, Uk2TooltipTriggerEnum } from '../../uk2-tooltip/enums';
import { IUk2TooltipSuggestedActionConfig } from '../interfaces';
import { Uk2Tier1AlertsEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';

export class Uk2TooltipSuggestedActionConfigModel extends Uk2TooltipConfigModel {
  constructor(uk2TooltipSuggestedActionConfig: IUk2TooltipSuggestedActionConfig) {
    let uk2TooltipConfig = {
      strategy: Uk2TooltipStrategyEnum.fixed,
      desktopOpenMode: Uk2TooltipTriggerEnum.hover,
      uk2IsLoading: false,
      svgIconName: Uk2Tier1AlertsEnum.infoCircle,
      labelText: '',
      size: Uk2TooltipSizeEnum.large,
    };

    uk2TooltipConfig = {
      ...uk2TooltipConfig,
      ...uk2TooltipSuggestedActionConfig,
    };

    super(uk2TooltipConfig);
  }
}
