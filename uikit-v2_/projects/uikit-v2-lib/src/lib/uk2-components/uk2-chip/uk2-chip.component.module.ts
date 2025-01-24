import { NgModule } from '@angular/core';
import { Uk2ChipComponent } from './uk2-chip.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [Uk2ChipComponent],
  imports: [CommonModule, MatIconModule],
  exports: [Uk2ChipComponent],
})
export class Uk2ChipModule {}
