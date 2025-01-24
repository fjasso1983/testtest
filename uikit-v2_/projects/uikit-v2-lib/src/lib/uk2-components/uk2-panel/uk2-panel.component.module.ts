import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { Uk2InternalUtilsModule } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2PanelComponent } from './uk2-panel.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Uk2DirectivesModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { Uk2PanelResizeDirective } from './directives/uk2-panel-resize/uk2-panel-resize.directive';

const materialImports = [MatIconModule, MatButtonModule];

@NgModule({
  declarations: [Uk2PanelComponent, Uk2PanelResizeDirective],
  imports: [CommonModule, Uk2DirectivesModule, Uk2InternalUtilsModule, OverlayModule, PortalModule, ...materialImports],
  exports: [Uk2PanelComponent, Uk2PanelResizeDirective],
})
export class Uk2PanelModule {}
