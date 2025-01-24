import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uk2SuggestedActionComponent } from './uk2-suggested-action.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Uk2DirectivesModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { Uk2TooltipModule } from '../uk2-tooltip/uk2-tooltip.module';

@NgModule({
  declarations: [Uk2SuggestedActionComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    MatButtonModule,
    Uk2DirectivesModule,
    Uk2TooltipModule,
  ],
  exports: [Uk2SuggestedActionComponent],
})
export class Uk2SuggestedActionModule {}
