import { NgModule } from '@angular/core';
import { Uk2FileViewerActionControlDirective } from './uk2-file-viewer-action-control';
import { Uk2FileViewerContainerDirective } from './uk2-file-viewer-container';
import { Uk2FileViewerFileNameDirective } from './uk2-file-viewer-file-name';
import { Uk2FileViewerFooterDirective } from './uk2-file-viewer-footer';
import { Uk2FileViewerHeaderDirective } from './uk2-file-viewer-header';
import { Uk2FileViewerPageControlDirective } from './uk2-file-viewer-page-control';
import { Uk2FileViewerZoomControlDirective } from './uk2-file-viewer-zoom-control';

@NgModule({
  declarations: [
    Uk2FileViewerActionControlDirective,
    Uk2FileViewerContainerDirective,
    Uk2FileViewerFileNameDirective,
    Uk2FileViewerFooterDirective,
    Uk2FileViewerHeaderDirective,
    Uk2FileViewerPageControlDirective,
    Uk2FileViewerZoomControlDirective,
  ],
  exports: [
    Uk2FileViewerActionControlDirective,
    Uk2FileViewerContainerDirective,
    Uk2FileViewerFileNameDirective,
    Uk2FileViewerFooterDirective,
    Uk2FileViewerHeaderDirective,
    Uk2FileViewerPageControlDirective,
    Uk2FileViewerZoomControlDirective,
  ],
})
export class Uk2FileViewerModule {}
