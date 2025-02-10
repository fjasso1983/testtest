import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {
  Uk2FlyoutMenuModule,
  Uk2IconRegistryService,
  Uk2MenuListItemModule,
  Uk2ServicesModule,
  Uk2TableDirectiveModule,
  Uk2TableHeaderFlyoutModule,
} from '@axos/uikit-v2-lib';
import { TableHeaderFlyoutComponent } from './table-header-flyout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';

const materialImports = [MatIconModule, MatTableModule, MatSlideToggleModule];

const uk2Imports = [
  Uk2TableDirectiveModule,
  Uk2ServicesModule,
  Uk2TableHeaderFlyoutModule,
  Uk2FlyoutMenuModule,
  Uk2MenuListItemModule,
];

@NgModule({
  declarations: [TableHeaderFlyoutComponent],
  imports: [CommonModule, HttpClientModule, ...materialImports, ...uk2Imports],
  exports: [TableHeaderFlyoutComponent],
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
export class TableHeaderFlyoutModule {}
