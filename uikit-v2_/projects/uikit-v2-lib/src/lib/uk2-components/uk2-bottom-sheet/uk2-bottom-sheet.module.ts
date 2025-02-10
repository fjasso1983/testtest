import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Uk2DirectivesModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { Uk2BottomSheetHeaderComponent } from './uk2-bottom-sheet-header/uk2-bottom-sheet-header.component';
import { Uk2BottomSheetHeaderIconComponent } from './uk2-bottom-sheet-header-icon/uk2-bottom-sheet-header-icon.component';
import { Uk2BottomSheetComponent } from './uk2-bottom-sheet.component';
import { Uk2BottomSheetOptionsComponent } from './uk2-bottom-sheet-options';
import {
  Uk2BottomSheetCalculatorDirective,
  Uk2BottomSheetStyleDirective,
  Uk2BottomSheetTouchDismissDirective,
  Uk2BottomSheetOptionHelperDirective,
} from './uk2-bottom-sheet-directives';

@NgModule({
  declarations: [
    Uk2BottomSheetHeaderComponent,
    Uk2BottomSheetHeaderIconComponent,
    Uk2BottomSheetComponent,
    Uk2BottomSheetCalculatorDirective,
    Uk2BottomSheetStyleDirective,
    Uk2BottomSheetOptionsComponent,
    Uk2BottomSheetTouchDismissDirective,
    Uk2BottomSheetOptionHelperDirective,
  ],
  imports: [CommonModule, MatBottomSheetModule, MatRadioModule, Uk2DirectivesModule, MatDividerModule, MatIconModule],
  exports: [
    Uk2BottomSheetComponent,
    Uk2BottomSheetOptionsComponent,
    Uk2BottomSheetTouchDismissDirective,
    Uk2BottomSheetHeaderComponent,
    Uk2BottomSheetCalculatorDirective,
    Uk2BottomSheetOptionHelperDirective,
    Uk2BottomSheetHeaderIconComponent,
  ],
})
export class Uk2BottomSheetModule {}
