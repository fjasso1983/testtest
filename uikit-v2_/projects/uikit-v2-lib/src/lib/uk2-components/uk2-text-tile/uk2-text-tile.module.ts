import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { Uk2TextTileComponent } from './uk2-text-tile.component';

@NgModule({
  declarations: [Uk2TextTileComponent],
  imports: [CommonModule, MatIconModule],
  exports: [Uk2TextTileComponent],
})
export class Uk2TextTileModule {}
