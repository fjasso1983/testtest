import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uk2FileUploadDisplayDirective } from './uk2-file-upload-display.directive';

@NgModule({
  declarations: [Uk2FileUploadDisplayDirective],
  imports: [CommonModule],
  exports: [Uk2FileUploadDisplayDirective],
})
export class Uk2FileUploaderDisplayModule {}
