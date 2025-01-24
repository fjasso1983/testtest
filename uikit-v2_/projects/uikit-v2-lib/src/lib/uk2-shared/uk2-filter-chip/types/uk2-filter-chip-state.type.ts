import { Uk2Condition } from './uk2-condition.type';

export type Uk2FilterChipState = {
  conditional: Uk2Condition;
  value: any;
  identifier: string;
  isActive: boolean;
  isPressed: boolean;
  formattedCondition: string;
  formattedIdentifier: string;
  overlayMinWidth: string;
};
