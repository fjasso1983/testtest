import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { ObserversModule } from '@angular/cdk/observers';

import { Uk2TooltipModule } from '../../uk2-tooltip';
import { Uk2TileHeaderLinkComponent } from './uk2-tile-header-link.component';

@NgModule({
  declarations: [Uk2TileHeaderLinkComponent],
  imports: [CommonModule, MatIconModule, Uk2TooltipModule, ObserversModule],
  exports: [Uk2TileHeaderLinkComponent],
})
export class Uk2TileHeaderLinkModule {}
