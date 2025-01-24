import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { Uk2BreadCrumbsModule, Uk2DirectivesModule, Uk2ServicesModule, Uk2BrandTopBarModule } from '@axos/uikit-v2-lib';

import { ContextualTopBarBasicUsageComponent } from './contextual-top-bar-basic-usage.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrandTopBarBasicUsageModule } from 'stories/top-bar/brand-top-bar/brand-top-bar-basic-usage/brand-top-bar-basic-usage.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [ContextualTopBarBasicUsageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild([
      {
        path: 'story/components-top-bar-contextual-top-bar/',
        component: ContextualTopBarBasicUsageComponent,
      },
    ]),
    Uk2DirectivesModule,
    Uk2BreadCrumbsModule,
    Uk2ServicesModule,
    Uk2BrandTopBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    BrandTopBarBasicUsageModule,
  ],
  exports: [ContextualTopBarBasicUsageComponent],
})
export class ContextualTopBarBasicUsageModule {}
