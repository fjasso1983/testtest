import { Component, ViewChild } from '@angular/core';

import { Uk2ButtonSizeEnum, Uk2PanelComponent, uk2PanelPosition } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  animations: [],
})
export class PanelComponent {
  @ViewChild('sidePanelRef') sidePanelRef!: Uk2PanelComponent;
  headerTitle = 'Side panel header text';
  buttonSize = Uk2ButtonSizeEnum;
  panelPosition = uk2PanelPosition.Right;
  footerDisplay = true;
  isLoading = false;
  isPanelResizable = false;

  constructor() {}

  openOverlay() {
    this.sidePanelRef.openPanel();
  }

  closeOverlay() {
    this.sidePanelRef.closePanel();
  }

  toggleSidePanelPosition() {
    this.panelPosition = this.panelPosition === uk2PanelPosition.Right ? uk2PanelPosition.Left : uk2PanelPosition.Right;
  }

  toggleSkeleton() {
    this.isLoading = !this.isLoading;
  }

  alert(message?: string) {
    alert(message ? message : 'Function was executed');
  }
}
