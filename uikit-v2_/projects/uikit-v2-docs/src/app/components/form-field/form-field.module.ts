import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uk2DirectivesModule } from '@axos/uikit-v2-lib';

import { FormFieldRoutingModule } from './form-field-routing.module';
import { FormFieldMaterialModule } from './form-field-material.module';
import { HintDisplayComponent } from './hint-display/hint-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './form-field.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HintDisplayComponent, FormFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Uk2DirectivesModule,
    FormFieldRoutingModule,
    FormFieldMaterialModule,
    MatIconModule,
  ],
})
export class FormFieldModule {}
