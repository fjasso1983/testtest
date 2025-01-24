import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uk2ProgressBarComponent } from './uk2-progress-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Uk2DirectivesModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [Uk2ProgressBarComponent],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, Uk2DirectivesModule, MatProgressBarModule],
  exports: [Uk2ProgressBarComponent],
})
export class Uk2ProgressBarModule {}
