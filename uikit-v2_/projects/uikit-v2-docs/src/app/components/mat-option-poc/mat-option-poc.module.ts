import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Uk2DirectivesModule, Uk2ServicesModule, Uk2ListItemModule } from '@axos/uikit-v2-lib';

import { MatOptionPocComponent } from './mat-option-poc.component';
import { MatOptionPocRoutingModule } from './mat-option-poc-routing.module';
import { MatIconModule } from '@angular/material/icon';

const materialModules: any[] = [MatSelectModule, MatFormFieldModule, MatRadioModule, MatCheckboxModule, MatIconModule];

@NgModule({
  declarations: [MatOptionPocComponent],
  imports: [
    CommonModule,
    ...materialModules,
    MatOptionPocRoutingModule,
    ReactiveFormsModule,
    Uk2DirectivesModule,
    Uk2ServicesModule,
    Uk2ListItemModule,
  ],
})
export class MatOptionPocModule {}
