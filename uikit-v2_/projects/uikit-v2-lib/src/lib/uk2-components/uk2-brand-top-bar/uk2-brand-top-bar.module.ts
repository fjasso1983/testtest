import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uk2BrandTopBarComponent } from './uk2-brand-top-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Uk2DirectivesModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { Uk2ColorBarModule } from '../uk2-brand-top-color-bar';
import { Uk2IsNullOrEmptyPipe } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
@NgModule({
  declarations: [Uk2BrandTopBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    Uk2DirectivesModule,
    Uk2ColorBarModule,
    Uk2IsNullOrEmptyPipe,
  ],
  exports: [Uk2BrandTopBarComponent],
})
export class Uk2BrandTopBarModule {}
