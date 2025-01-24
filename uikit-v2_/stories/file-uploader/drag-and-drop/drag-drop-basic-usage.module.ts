import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Uk2DirectivesModule, Uk2FileUploaderDragDropModule, Uk2LoadingSpinnerModule } from '@axos/uikit-v2-lib';
import { HttpClientModule } from '@angular/common/http';
import { FileDragDropBasicUsageComponent } from './drag-drop-basic-usage.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const materialImports = [MatIconModule, MatProgressSpinnerModule];

@NgModule({
  declarations: [FileDragDropBasicUsageComponent],
  imports: [
    Uk2FileUploaderDragDropModule,
    MatProgressSpinnerModule,
    Uk2LoadingSpinnerModule,
    Uk2DirectivesModule,
    HttpClientModule,
    CommonModule,
    ...materialImports,
  ],
  exports: [FileDragDropBasicUsageComponent],
})
export class FileDragDropModule {}
