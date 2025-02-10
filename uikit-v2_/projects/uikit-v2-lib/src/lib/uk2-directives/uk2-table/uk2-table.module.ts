import { NgModule } from '@angular/core';

import {
  Uk2BulkActionCellDirective,
  Uk2ChipCellDirective,
  Uk2HeaderBulkActionCellDirective,
  Uk2HeaderInlineActionsCellDirective,
  Uk2HeaderMenuCellDirective,
  Uk2HeaderNumericCellDirective,
  Uk2HeaderRecordCellDirective,
  Uk2HeaderTextCellDirective,
  Uk2InlineActionsCellDirective,
  Uk2MenuCellDirective,
  Uk2NumericCellDirective,
  Uk2RecordCellDirective,
  Uk2TextCellDirective,
} from './cells';
import { Uk2HeaderFillColumnDirective } from './columns';
import { Uk2HeaderRowDirective, Uk2RowDirective, Uk2SubHeaderRowDirective } from './rows';
import { Uk2TableCellContentOverlapElementDirective } from './uk2-table-cell-content-overlap-element';
import { Uk2TableDirective } from './uk2-table.directive';
import { Uk2VisibleUntilHoverDirective, Uk2VisibleUntilHoverElementDirective } from './uk2-visible-until-hover';
import {
  Uk2VisibleUntilSelectedAndHoverDirective,
  Uk2VisibleUntilSelectedAndHoverElementDirective,
} from './uk2-visible-until-selected-and-hover';

@NgModule({
  declarations: [
    Uk2TableDirective,
    Uk2HeaderBulkActionCellDirective,
    Uk2HeaderRecordCellDirective,
    Uk2HeaderTextCellDirective,
    Uk2HeaderNumericCellDirective,
    Uk2HeaderMenuCellDirective,
    Uk2HeaderInlineActionsCellDirective,
    Uk2HeaderRowDirective,
    Uk2HeaderFillColumnDirective,
    Uk2VisibleUntilSelectedAndHoverDirective,
    Uk2VisibleUntilSelectedAndHoverElementDirective,
    Uk2RowDirective,
    Uk2BulkActionCellDirective,
    Uk2RecordCellDirective,
    Uk2NumericCellDirective,
    Uk2TextCellDirective,
    Uk2ChipCellDirective,
    Uk2MenuCellDirective,
    Uk2InlineActionsCellDirective,
    Uk2SubHeaderRowDirective,
    Uk2TableCellContentOverlapElementDirective,
    Uk2VisibleUntilHoverDirective,
    Uk2VisibleUntilHoverElementDirective,
  ],
  exports: [
    Uk2TableDirective,
    Uk2HeaderBulkActionCellDirective,
    Uk2HeaderRecordCellDirective,
    Uk2HeaderTextCellDirective,
    Uk2HeaderNumericCellDirective,
    Uk2HeaderMenuCellDirective,
    Uk2HeaderInlineActionsCellDirective,
    Uk2HeaderRowDirective,
    Uk2HeaderFillColumnDirective,
    Uk2VisibleUntilSelectedAndHoverDirective,
    Uk2VisibleUntilSelectedAndHoverElementDirective,
    Uk2RowDirective,
    Uk2BulkActionCellDirective,
    Uk2RecordCellDirective,
    Uk2NumericCellDirective,
    Uk2TextCellDirective,
    Uk2ChipCellDirective,
    Uk2MenuCellDirective,
    Uk2InlineActionsCellDirective,
    Uk2SubHeaderRowDirective,
    Uk2TableCellContentOverlapElementDirective,
    Uk2VisibleUntilHoverDirective,
    Uk2VisibleUntilHoverElementDirective,
  ],
})
export class Uk2TableDirectiveModule {}
