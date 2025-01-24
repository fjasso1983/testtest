import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { Uk2BreadCrumbsModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';

import { BreadcrumbsBasicUsageComponent } from './breadcrumbs-basic-usage.component';
import { StoriesCommonModule } from 'stories/stories-common.module';

@NgModule({
  declarations: [BreadcrumbsBasicUsageComponent],
  imports: [
    StoriesCommonModule,
    BrowserModule,
    RouterModule.forChild([
      {
        path: 'story/components-breadcrumbs/',
        component: BreadcrumbsBasicUsageComponent,
      },
    ]),
    Uk2BreadCrumbsModule,
    Uk2ServicesModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  exports: [BreadcrumbsBasicUsageComponent],
})
export class BreadCrumbsModule {}
