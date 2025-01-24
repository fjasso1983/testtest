import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uk2TableInlineActionsComponent } from './uk2-table-inline-actions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Uk2DirectivesModule, Uk2FlyoutMenuModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { Uk2ListItemModule } from '../uk2-list-item';

const materialImports = [MatIconModule, MatButtonModule];

@NgModule({
  declarations: [Uk2TableInlineActionsComponent],
  imports: [CommonModule, Uk2DirectivesModule, Uk2ListItemModule, Uk2FlyoutMenuModule, ...materialImports],
  exports: [Uk2TableInlineActionsComponent],
})
export class Uk2TableInlineActionsModule {}
