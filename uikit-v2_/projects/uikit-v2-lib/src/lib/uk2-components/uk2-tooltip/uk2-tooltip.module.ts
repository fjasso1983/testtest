import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Uk2TooltipComponent } from './uk2-tooltip.component';
import { LayoutModule } from '@angular/cdk/layout';
@NgModule({
  declarations: [Uk2TooltipComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, LayoutModule],
  exports: [Uk2TooltipComponent],
})
export class Uk2TooltipModule {}
