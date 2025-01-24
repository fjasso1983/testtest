import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import {
  Uk2DirectivesModule,
  Uk2IconRegistryService,
  Uk2ServicesModule,
  Uk2TableDirectiveModule,
} from '@axos/uikit-v2-lib';

import { TableComponent } from './table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

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
