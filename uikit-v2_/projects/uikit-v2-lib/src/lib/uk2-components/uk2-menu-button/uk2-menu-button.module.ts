import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { OverlayModule } from '@angular/cdk/overlay';

import { Uk2DirectivesModule, Uk2MenuListItemModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';

import { Uk2MenuButtonComponent } from './uk2-menu-button.component';
import { Uk2MenuButtonOverlayComponent } from './uk2-menu-button-overlay/uk2-menu-button-overlay.component';
import { Uk2BottomSheetModule } from '../uk2-bottom-sheet';

@NgModule({
  declarations: [Uk2MenuButtonComponent, Uk2MenuButtonOverlayComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatBadgeModule,
    MatRadioModule,
    Uk2DirectivesModule,
    Uk2MenuListItemModule,
    OverlayModule,
    MatBottomSheetModule,
    Uk2BottomSheetModule,
  ],
  exports: [Uk2MenuButtonComponent, Uk2MenuButtonOverlayComponent],
})
export class Uk2MenuButtonModule {}
