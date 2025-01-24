import { Component, Input, ViewEncapsulation } from '@angular/core';
import {
  Uk2IconRegistryService,
  Uk2MenuButtonItem,
  Uk2MenuButtonScrollStrategy,
  Uk2MenuButtonSelectionTypeEnum,
  Uk2Tier1NavigationEnum,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-single-option-button',
  templateUrl: './single-option-button.component.html',
  styleUrls: ['./single-option-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SingleOptionButtonComponent {
  @Input() iconOnlyCssClass: string | undefined;
  @Input() isLoading = false;
  @Input() isDisabled = false;
  @Input() defaultStateText = 'Sort';
  @Input() activeStateText = 'Sorted';
  @Input() icon = Uk2Tier1NavigationEnum.arrowsVertical;
  @Input() buttonType: Uk2MenuButtonSelectionTypeEnum = Uk2MenuButtonSelectionTypeEnum.single;
  @Input() isIconOnly = false;
  @Input() displayBorder = true;
  @Input() keepLastSelection = true;
  @Input() items = [
    {
      isSelected: false,
      text: '% of Portfolio H-L',
      sortByKey: 'portfolioPercent',
      value: '1',
      sortDirection: 1,
      sortDirectionLabel: 'H-L',
      sortType: 0,
      sortTypeLabel: '% of Portfolio',
    },
    {
      isSelected: false,
      text: '% of Portfolio L-H',
      sortByKey: 'portfolioPercent',
      value: '2',
      sortDirection: 0,
      sortDirectionLabel: 'L-H',
      sortType: 0,
      sortTypeLabel: '% of Portfolio',
    },
    {
      isSelected: false,
      text: '% Change All Time H-L',
      sortByKey: 'allTimeChangePercent',
      value: '3',
      sortDirection: 1,
      sortDirectionLabel: 'H-L',
      sortType: 1,
      sortTypeLabel: '% Change All Time',
    },
    {
      isSelected: false,
      text: '% Change All Time L-H',
      sortByKey: 'allTimeChangePercent',
      value: '4',
      sortDirection: 0,
      sortDirectionLabel: 'L-H',
      sortType: 1,
      sortTypeLabel: '% Change All Time',
    },
    {
      isSelected: false,
      text: '% Change Today L-H',
      sortByKey: 'pastDayChangePercent',
      value: '5',
      sortDirection: 0,
      sortDirectionLabel: 'L-H',
      sortType: 2,
      sortTypeLabel: '% Change Today',
    },
    {
      isSelected: false,
      text: '% Change Today H-L',
      sortByKey: 'pastDayChangePercent',
      value: '6',
      sortDirection: 1,
      sortDirectionLabel: 'H-L',
      sortType: 2,
      sortTypeLabel: '% Change Today',
    },
    {
      isSelected: false,
      text: 'Name A-Z',
      sortByKey: 'description',
      value: '7',
      sortDirection: 0,
      sortDirectionLabel: 'A-Z',
      sortType: 3,
      sortTypeLabel: 'Name',
    },
    {
      isSelected: true,
      text: 'Name Z-A',
      sortByKey: 'description',
      value: '8',
      sortDirection: 1,
      sortDirectionLabel: 'Z-A',
      sortType: 3,
      sortTypeLabel: 'Name',
    },
  ];

  receivedItems: Uk2MenuButtonItem[] = [];

  @Input() uk2BackdropIsEnabled = true;
  @Input() uk2BackdropIsHidden = true;
  @Input() uk2BackdropCanBeClosedWhenHasBeenClicked = true;
  @Input() uk2ScrollStrategy = Uk2MenuButtonScrollStrategy.block;
  @Input() uk2BottomSheetTitle = '';
  @Input() uk2BottomSheetDescription = '';

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  onItemSelected(itemSelection: Uk2MenuButtonItem[]) {
    this.receivedItems = itemSelection;
  }
}
