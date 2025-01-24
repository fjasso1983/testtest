import { NgModule } from '@angular/core';
import { KabobBasicUsageComponent } from './kabob-basic-usage.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Uk2DirectivesModule, Uk2FlyoutMenuModule, Uk2ListItemModule, Uk2MenuListItemModule } from '@axos/uikit-v2-lib';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [KabobBasicUsageComponent],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    Uk2MenuListItemModule,
    Uk2DirectivesModule,
    Uk2FlyoutMenuModule,
  ],
  exports: [KabobBasicUsageComponent],
})
export class KabobBasicUsageModule {}
