import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uk2FileUploadDragDropDirective } from './uk2-file-upload-drag-drop.directive';

@NgModule({
  declarations: [Uk2FileUploadDragDropDirective],
  imports: [CommonModule],
  exports: [Uk2FileUploadDragDropDirective],
})
export class Uk2FileUploaderDragDropModule {}
