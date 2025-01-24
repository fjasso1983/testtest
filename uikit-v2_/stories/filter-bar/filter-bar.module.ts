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

const uk2Imports = [
  Uk2MenuListItemModule,
  Uk2FilterChipBooleanModule,
  Uk2DirectivesModule,
  Uk2FilterBarDirectiveModule,
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
