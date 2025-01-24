import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';

import { Uk2DirectivesModule, Uk2ElementPositionModule, Uk2FlyoutMenuModule } from '@axos/uikit-v2-lib';

import { FlyoutMenuComponent } from './flyout-menu.component';

@NgModule({
  declarations: [FlyoutMenuComponent],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    Uk2DirectivesModule,
    Uk2FlyoutMenuModule,
    HttpClientModule,
    Uk2ElementPositionModule,
    MatTabsModule,
    MatIconModule,
    MatBadgeModule,
  ],
  exports: [FlyoutMenuComponent],
})
export class FlyoutMenuModule {}
