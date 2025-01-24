import { NgModule } from '@angular/core';
import { Uk2TableInlineActionsModule } from '@axos/uikit-v2-lib';
import { TableInlineActionsComponent } from './table-inline-actions-basic-usage.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TableInlineActionsComponent],
  imports: [Uk2TableInlineActionsModule, HttpClientModule],
  exports: [TableInlineActionsComponent],
})
export class TableInlineActionBasicUsagenModule {}
