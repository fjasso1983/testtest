import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';

import {
  Uk2DirectivesModule,
  Uk2FilterBarDirectiveModule,
  Uk2FilterChipBooleanModule,
  Uk2IconRegistryService,
  Uk2MenuListItemModule,
} from '@axos/uikit-v2-lib';

import { FilterBarComponent } from './filter-bar.component';
import { Uk2FilterChipOverlayOptionModule } from '../../projects/uikit-v2-lib/src/lib/uk2-components/uk2-filter-chip/uk2-filter-chip-overlay-option/uk2-filter-chip-overlay-option.module';
import { Uk2ListItemModule } from '../../projects/uikit-v2-lib/src/lib/uk2-components/uk2-list-item/uk2-list-item.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

const uk2Imports = [
  Uk2MenuListItemModule,
  Uk2FilterChipBooleanModule,
  Uk2DirectivesModule,
  Uk2FilterBarDirectiveModule,
  Uk2ListItemModule,
  Uk2FilterChipOverlayOptionModule,
];

@NgModule({
  declarations: [FilterBarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    OverlayModule,
    MatCheckboxModule,
    ...uk2Imports,
  ],
  exports: [FilterBarComponent],
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
export class FilterBarModule {}
