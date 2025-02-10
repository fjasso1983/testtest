import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  Uk2ButtonSizeEnum,
  Uk2FlyoutMenuXPosition,
  Uk2FlyoutMenuYPosition,
  Uk2IconRegistryService,
  Uk2MenuButtonComponent,
  Uk2MenuButtonItem,
  Uk2MenuButtonScrollStrategy,
  Uk2MenuButtonSelectionTypeEnum,
  Uk2Tier1UtilityEnum,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-custom-content-button',
  templateUrl: './custom-content-button.component.html',
  styleUrls: ['./custom-content-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CustomContentButtonComponent {
  @Input() iconOnlyCssClass: string | undefined;
  @Input() isIconOnly = true;
  @Input() displayBorder = false;
  @Input() displayBadge = false;
  @Input() isLoading = false;
  @Input() isPressed = false;
  @Input() isActive = false;
  @Input() isDisabled = false;
  @Input() defaultStateText = 'Open';
  @Input() activeStateText = 'Opened';
  @Input() icon = Uk2Tier1UtilityEnum.filterSlider;
  @Input() buttonType: Uk2MenuButtonSelectionTypeEnum = Uk2MenuButtonSelectionTypeEnum.custom;
  @Input() items = [];
  @Input() badgeText = '2';
  @Input() customContentOriginXPosition: Uk2FlyoutMenuXPosition = Uk2FlyoutMenuXPosition.start;
  @Input() customContentOverlayXPosition: Uk2FlyoutMenuXPosition = Uk2FlyoutMenuXPosition.start;
  @Input() customContentOriginYPosition: Uk2FlyoutMenuYPosition = Uk2FlyoutMenuYPosition.bottom;
  @Input() customContentOverlayYPosition: Uk2FlyoutMenuYPosition = Uk2FlyoutMenuYPosition.top;
  @Input() customContentOverlayYOffset: number = 4;

  receivedItems: Uk2MenuButtonItem[] = [];
  uk2ButtonSize = Uk2ButtonSizeEnum.large;
  timePeriodOptions = ['This Month', 'Last Month', 'Last 3 Months', 'Last 12 Months', '2023', '2022', '2021'];
  documentTypeOptions = ['PDF', 'DOCX', 'JPEG', 'PNG'];
  selectedTimePeriod = '';
  selectedDocumentType = '';

  @Input() uk2BackdropIsEnabled = true;
  @Input() uk2BackdropIsHidden = true;
  @Input() uk2ScrollStrategy = Uk2MenuButtonScrollStrategy.block;
  @ViewChild(Uk2MenuButtonComponent) menuButton!: Uk2MenuButtonComponent;

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  onOverlayOpened(): void {
    this.isPressed = true;
    console.log('Custom content overlay opened!!!');
  }

  onOverlayClosed(): void {
    this.isPressed = false;
    console.log('Custom content overlay closed!!!');
  }
}
