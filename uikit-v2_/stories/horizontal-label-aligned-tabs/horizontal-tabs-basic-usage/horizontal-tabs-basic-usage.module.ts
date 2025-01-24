import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { HorizontalTabsBasicUsageComponent } from './horizontal-tabs-basic-usage.component';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [HorizontalTabsBasicUsageComponent],
  imports: [
    MatTabsModule,
    StoriesCommonModule,
    CommonModule,
    MatIconModule,
    HttpClientModule,
    Uk2ServicesModule,
    MatBadgeModule,
    MatButtonModule,
  ],
  exports: [HorizontalTabsBasicUsageComponent],
})
export class HorizontalTabsBasicUsageModule {}
