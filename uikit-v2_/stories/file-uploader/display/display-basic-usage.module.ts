import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  Uk2DirectivesModule,
  Uk2ElementPositionModule,
  Uk2FileUploaderDisplayModule,
  Uk2FileUploaderDragDropModule,
  Uk2FlyoutMenuModule,
  Uk2ListItemModule,
  Uk2LoadingSpinnerModule,
  Uk2MenuListItemModule,
} from '@axos/uikit-v2-lib';
import { HttpClientModule } from '@angular/common/http';
import { FileUploaderDisplayBasicUsageComponent } from './display-basic-usage.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FileUploaderPdfViewerComponent } from './file-viewer-example/file-viewer-example.component';
import { FileDragDropExampleComponent } from './drap-drop-example/drag-drop-example.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const materialImports = [MatIconModule, MatButtonModule, MatProgressSpinnerModule];

const uk2Imports = [
  Uk2MenuListItemModule,
  Uk2LoadingSpinnerModule,
  Uk2FlyoutMenuModule,
  Uk2FileUploaderDisplayModule,
  Uk2FileUploaderDragDropModule,
  Uk2ElementPositionModule,
  Uk2DirectivesModule,
  Uk2ListItemModule,
];

@NgModule({
  declarations: [FileUploaderDisplayBasicUsageComponent, FileUploaderPdfViewerComponent, FileDragDropExampleComponent],
  imports: [PdfViewerModule, HttpClientModule, CommonModule, FormsModule, ...uk2Imports, ...materialImports],
  exports: [FileUploaderDisplayBasicUsageComponent],
})
export class FileDragDropModule {}
