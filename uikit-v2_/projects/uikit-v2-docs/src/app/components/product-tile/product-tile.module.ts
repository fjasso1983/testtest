import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

import {
  Uk2DirectivesModule,
  Uk2TileHeaderLinkModule,
  Uk2AlertBannerModule,
  Uk2MenuButtonModule,
} from '@axos/uikit-v2-lib';

import { ProductTileDocsComponent } from './product-tile.component';
import { ProductTileRoutingModule } from './product-tile.routing.module';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [ProductTileDocsComponent],
  imports: [
    CommonModule,
    Uk2TileHeaderLinkModule,
    Uk2DirectivesModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ProductTileRoutingModule,
    MatDividerModule,
    MatTabsModule,
    Uk2AlertBannerModule,
    MatMenuModule,
    Uk2MenuButtonModule,
  ],
})
export class ProductTileModule {}
