import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import {
  Uk2ButtonSizeEnum,
  Uk2Icon,
  Uk2IconRegistryService,
  Uk2PanelComponent,
  Uk2PanelHeaderTextBehaviorEnum,
  uk2PanelPosition,
  Uk2Tier1NavigationEnum,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnChanges {
  @ViewChild('sidePanelRef') sidePanelRef!: Uk2PanelComponent;

  //UI Config
  @Input() contentTemplate =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  @Input() primaryButtonLabel = 'Lorem Ipsum';
  @Input() primaryButtonVisible = true;
  @Input() primaryButtonClosePanel = false;
  @Input() primaryButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.large;
  @Input() secondaryButtonLabel = 'Lorem Ipsum';
  @Input() secondaryButtonVisible = true;
  @Input() secondaryButtonClosePanel = false;
  @Input() secondaryButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.large;
  @Input() textButtonLabel = 'Lorem Ipsum';
  @Input() textButtonVisible = true;
  @Input() textButtonClosePanel = false;
  @Input() textButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.large;
  @Input() headerRightActions: 'none' | 'close-button' | 'filter-button' | 'config-button' = 'close-button';
  @Input() headerLeftActions: 'none' | 'chevron-down-up-button' = 'chevron-down-up-button';

  //Panel config
  @Input() panelWidth: number | string | undefined = '80%';
  @Input() panelMinWidth: number | string | undefined = '496';
  @Input() panelMaxWidth: number | string | undefined = '1280';
  @Input() headerBehavior: Uk2PanelHeaderTextBehaviorEnum = Uk2PanelHeaderTextBehaviorEnum.truncate;
  @Input() showFooter = true;
  @Input() isLoading = false;
  @Input() isPanelResizable = false;
  @Input() closeOnBackdropClick = false;
  @Input() headerTitle = 'Lorem ipsum dolor sit amet';
  @Output() headerClickEvent = new EventEmitter();
  @Output() clickEvent = new EventEmitter();

  buttonSize = Uk2ButtonSizeEnum;

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  ngOnChanges(_: SimpleChanges) {
    if (this.sidePanelRef) {
      this.closePanel();
    }
  }

  openPanel() {
    this.sidePanelRef.openPanel();
  }

  closePanel() {
    this.sidePanelRef.closePanel();
  }
}
