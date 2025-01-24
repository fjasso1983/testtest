import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Uk2ServicesModule } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { Uk2IconValidationService } from './uk2-icon-validation';
import { Uk2InputValidationsService } from './uk2-input-validations/uk2-input-validations.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, Uk2ServicesModule],
  exports: [],
  providers: [Uk2IconValidationService, Uk2InputValidationsService],
})
export class Uk2InternalUtilsServicesModule {}
