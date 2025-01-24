import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Uk2DirectivesModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { Uk2InternalUtilsModule } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2ToastComponent } from './uk2-toast.component';
import { UK2_TOAST_DEFAULT_DURATION } from './constants/constants';

@NgModule({
  declarations: [Uk2ToastComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    Uk2DirectivesModule,
    Uk2InternalUtilsModule,
  ],
  exports: [Uk2ToastComponent],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: UK2_TOAST_DEFAULT_DURATION,
      },
    },
  ],
})
export class Uk2ToastModule {}
