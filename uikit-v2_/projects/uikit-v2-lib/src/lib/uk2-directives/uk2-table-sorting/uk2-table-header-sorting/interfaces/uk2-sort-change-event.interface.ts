import { Uk2SortDirectionEnum } from '../enums';

export interface Uk2SortChangeEvent {
  column: string;
  direction: Uk2SortDirectionEnum;
}
