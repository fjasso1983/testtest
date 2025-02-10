import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { 
    Uk2DirectivesModule,
    Uk2ElementPositionModule,
    Uk2FileViewerModule,
    Uk2FlyoutMenuModule,
    Uk2ListItemModule,
    Uk2ServicesModule,
    Uk2MenuListItemModule
} from '@axos/uikit-v2-lib';
import { HttpClientModule } from '@angular/common/http';
import { FileViewerBasicUsageComponent } from './file-viewer-basic-usage.component';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

const materialImports = [MatIconModule, MatButtonModule];

@NgModule({
  declarations: [FileViewerBasicUsageComponent],
  imports: [
    Uk2DirectivesModule,
    Uk2ServicesModule,
    Uk2ListItemModule,
    Uk2FlyoutMenuModule,
    Uk2MenuListItemModule,
    HttpClientModule,
    PdfViewerModule,
    CommonModule,
    OverlayModule,
    PortalModule,
    FormsModule,
    ...materialImports,
    Uk2FileViewerModule,
    Uk2ElementPositionModule
  ],
  exports: [FileViewerBasicUsageComponent],
})
export class FileViewerModule {}
