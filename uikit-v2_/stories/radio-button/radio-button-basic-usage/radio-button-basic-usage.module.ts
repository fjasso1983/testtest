import { NgModule } from '@angular/core';

import { MatRadioModule } from '@angular/material/radio';

import { Uk2DirectivesModule } from '@axos/uikit-v2-lib';
import { RadioButtonBasicUsageComponent } from './radio-button-basic-usage.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RadioButtonBasicUsageComponent],
  imports: [CommonModule, Uk2DirectivesModule, MatRadioModule],
  exports: [RadioButtonBasicUsageComponent],
})
export class RadioButtonBasicUsageModule {}
