import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from "@angular/material/list";

import {
  Uk2AlertBannerModule,
  Uk2DirectivesModule,
  Uk2IconRegistryService,
  Uk2ListItemModule,
  Uk2MenuButtonModule,
  Uk2TileHeaderLinkModule,
} from '@axos/uikit-v2-lib';

import { ProductTileBasicUsageComponent } from './product-tile-basic-usage.component';

@NgModule({
  declarations: [ProductTileBasicUsageComponent],
  exports: [
    ProductTileBasicUsageComponent,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    Uk2TileHeaderLinkModule,
    Uk2DirectivesModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    Uk2MenuButtonModule,
    MatCheckboxModule,
    Uk2ListItemModule,
    Uk2AlertBannerModule,
  ],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        MatCardModule,
        HttpClientModule,
        MatIconModule,
        Uk2TileHeaderLinkModule,
        Uk2DirectivesModule,
        MatTabsModule,
        MatButtonModule,
        MatMenuModule,
        Uk2MenuButtonModule,
        MatCheckboxModule,
        Uk2ListItemModule,
        Uk2AlertBannerModule,
        MatListModule,
    ],
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
export class ProductTileBasicUsageModule {}
