import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uk2AlertBannerComponent } from './uk2-alert-banner.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Uk2DirectivesModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';

@NgModule({
  declarations: [Uk2AlertBannerComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, Uk2DirectivesModule],
  exports: [Uk2AlertBannerComponent],
})
export class Uk2AlertBannerModule {}
