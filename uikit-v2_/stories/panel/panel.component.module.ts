import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Uk2DirectivesModule, Uk2PanelModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { HttpClientModule } from '@angular/common/http';

const materialImports = [MatIconModule, MatButtonModule];

@NgModule({
  declarations: [PanelComponent],
  imports: [
    Uk2DirectivesModule,
    Uk2ServicesModule,
    HttpClientModule,
    CommonModule,
    OverlayModule,
    PortalModule,
    Uk2PanelModule,
    ...materialImports,
  ],
  exports: [PanelComponent],
})
export class PanelModule {}
