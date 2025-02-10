import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  Uk2DirectivesModule,
  Uk2FilterChipBooleanModule,
  Uk2FilterChipOverlayOptionModule,
  Uk2IconRegistryService,
  Uk2ListItemModule,
  Uk2MenuListItemModule,
} from '@axos/uikit-v2-lib';

import { FilterChipBooleanComponent } from './filter-chip-boolean.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [FilterChipBooleanComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    Uk2FilterChipBooleanModule,
    Uk2FilterChipOverlayOptionModule,
    MatIconModule,
    Uk2ListItemModule,
    Uk2DirectivesModule,
    Uk2MenuListItemModule,
    MatCheckboxModule,
  ],
  exports: [FilterChipBooleanComponent],
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
export class FilterChipBooleanModule {}
