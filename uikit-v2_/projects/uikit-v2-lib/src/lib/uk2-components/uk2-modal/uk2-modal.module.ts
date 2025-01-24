import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uk2ModalComponent } from './uk2-modal.component';
import { Uk2ModalRenderComponent } from './uk2-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Uk2DirectivesModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [Uk2ModalComponent, Uk2ModalRenderComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule, MatDividerModule, Uk2DirectivesModule],
  exports: [Uk2ModalComponent],
})
export class Uk2ModalModule {}
