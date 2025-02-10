import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import {
  Uk2DirectivesModule,
  Uk2IconRegistryService,
  Uk2ServicesModule,
  Uk2TableDirectiveModule,
  Uk2ChipModule,
  Uk2TableInlineActionsModule,
} from '@axos/uikit-v2-lib';

import { TableComponent } from './table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TableComponent],
  imports: [
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    CommonModule,
    Uk2DirectivesModule,
    Uk2ServicesModule,
    Uk2TableDirectiveModule,
    MatButtonModule,
    Uk2ChipModule,
    Uk2TableInlineActionsModule,
  ],
  exports: [TableComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (iconRegistryService: Uk2IconRegistryService) => {
        iconRegistryService.registerAllCategories();
      },
      deps: [Uk2IconRegistryService],
    },
  ],
})
export class TableModule {}
