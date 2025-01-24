import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Uk2ValueMovementComponent } from './uk2-value-movement.component';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
@NgModule({
  declarations: [Uk2ValueMovementComponent],
  imports: [CommonModule, MatIconModule],
  exports: [Uk2ValueMovementComponent],
  providers: [CurrencyPipe, DecimalPipe],
})
export class Uk2ValueMovementModule {}
