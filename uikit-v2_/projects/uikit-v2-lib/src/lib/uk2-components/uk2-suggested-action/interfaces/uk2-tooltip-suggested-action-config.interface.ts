import { Uk2TooltipPlacementEnum } from '../../uk2-tooltip/enums';

export interface IUk2TooltipSuggestedActionConfig {
  bodyText: string;
  arrowOffset?: number;
  displayCloseButton?: boolean;
  placement?: Uk2TooltipPlacementEnum;
}
