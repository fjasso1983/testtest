import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TableScrollingComponent } from './table-scrolling.component';
import { HttpClientModule } from '@angular/common/http';
import {
  Uk2DirectivesModule,
  Uk2IconRegistryService,
  Uk2TableColumnResizeDirectiveModule,
  Uk2TableDirectiveModule,
  Uk2TableScrollerModule,
} from '@axos/uikit-v2-lib';

const materialImports = [MatIconModule, MatTableModule, MatCheckboxModule];

const uk2Imports = [
  Uk2DirectivesModule,
  Uk2TableScrollerModule,
  Uk2TableDirectiveModule,
  Uk2TableColumnResizeDirectiveModule,
];

@NgModule({
  declarations: [TableScrollingComponent],
  imports: [CommonModule, HttpClientModule, ...materialImports, ...uk2Imports],
  exports: [TableScrollingComponent],
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
export class TableScrollingModule {}
