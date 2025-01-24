import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

import { Uk2BreadcrumbsComponent } from './uk2-breadcrumbs.component';
import { Uk2BreadcrumbsContainerDirective } from './uk2-breadcrumbs-container';
import { Uk2BreadcrumbTruncatedComponent } from './uk2-breadcrumb-truncated';
import { Uk2BreadcrumbItemComponent } from './uk2-breadcrumb-item';
import { Uk2BreadcrumbOverlayListComponent } from './uk2-breadcrumb-overlay-list';

@NgModule({
  declarations: [
    Uk2BreadcrumbsComponent,
    Uk2BreadcrumbsContainerDirective,
    Uk2BreadcrumbTruncatedComponent,
    Uk2BreadcrumbItemComponent,
    Uk2BreadcrumbOverlayListComponent,
  ],
  imports: [CommonModule, MatIconModule, HttpClientModule, RouterModule, OverlayModule, A11yModule],
  exports: [Uk2BreadcrumbsComponent, Uk2BreadcrumbsContainerDirective],
})
export class Uk2BreadCrumbsModule {}
