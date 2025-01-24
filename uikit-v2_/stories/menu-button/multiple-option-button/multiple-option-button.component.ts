import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  Uk2ButtonSizeEnum,
  Uk2IconRegistryService,
  Uk2MenuButtonComponent,
  Uk2MenuButtonItem,
  Uk2MenuButtonScrollStrategy,
  Uk2MenuButtonSelectionTypeEnum,
  Uk2Tier1UtilityEnum,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-multiple-option-button',
  templateUrl: './multiple-option-button.component.html',
  styleUrls: ['./multiple-option-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MultipleOptionButtonComponent {
  @Input() iconOnlyCssClass: string | undefined;
  @Input() isIconOnly = false;
  @Input() displayBorder = true;
  @Input() displayBadge = false;
  @Input() isLoading = false;
  @Input() isDisabled = false;
  @Input() defaultStateText = 'Filter';
  @Input() activeStateText = 'Filtered';
  @Input() icon = Uk2Tier1UtilityEnum.filterFunnel;
  @Input() buttonType: Uk2MenuButtonSelectionTypeEnum = Uk2MenuButtonSelectionTypeEnum.multiple;
  @Input() items = [
    {
      text: 'Lorem Ipsum 1',
      isSelected: false,
      value: '1',
    },
    {
      text: 'Lorem Ipsum 2',
      isSelected: false,
      value: '2',
    },
    {
      text: 'Lorem Ipsum 3',
      isSelected: false,
      value: '3',
    },
    {
      text: 'Lorem Ipsum 4',
      isSelected: false,
      value: '4',
    },
    {
      text: 'Lorem Ipsum 5',
      isSelected: false,
      value: '5',
    },
    {
      text: 'Lorem Ipsum 6',
      isSelected: false,
      value: '6',
    },
    {
      text: 'Lorem Ipsum 7',
      isSelected: false,
      value: '7',
    },
    {
      text: 'Lorem Ipsum 8',
      isSelected: false,
      value: '8',
    },
  ];

  receivedItems: Uk2MenuButtonItem[] = [];
  uk2ButtonSize = Uk2ButtonSizeEnum.large;

  @Input() uk2BackdropIsEnabled = true;
  @Input() uk2BackdropIsHidden = true;
  @Input() uk2ScrollStrategy = Uk2MenuButtonScrollStrategy.block;
  @Input() uk2BottomSheetTitle = '';
  @Input() uk2BottomSheetDescription = '';
  @ViewChild(Uk2MenuButtonComponent) menuButton!: Uk2MenuButtonComponent;

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  onItemSelected(itemSelection: Uk2MenuButtonItem[]) {
    this.receivedItems = itemSelection;
  }

  handleApplyButton() {
    this.menuButton.applySelectedOptions();
    this.menuButton.close();
  }
}
