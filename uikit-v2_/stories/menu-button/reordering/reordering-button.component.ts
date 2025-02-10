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
  selector: 'storybook-reordering-button',
  templateUrl: './reordering-button.component.html',
  styleUrls: ['./reordering-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ReorderingButtonComponent {
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
  @Input() items = [...Array(12)].map((_, i) => ({
    text: `Lorem Ipsum ${i + 1}`,
    isSelected: true,
    value: `${i + 1}`,
  }));

  receivedItems: Uk2MenuButtonItem[] = [];
  uk2ButtonSize = Uk2ButtonSizeEnum.large;
  enableListOrdering: boolean = true;
  originalItems = window.structuredClone(this.items);

  @Input() uk2BackdropIsEnabled = true;
  @Input() uk2BackdropIsHidden = true;
  @Input() uk2ScrollStrategy = Uk2MenuButtonScrollStrategy.block;
  @Input() uk2BottomSheetTitle = '';
  @Input() uk2BottomSheetDescription = '';
  @Input() enableListFooter = true;
  @Input() enableListScrolling = true;
  @Input() listScrollingMaxHeight = 360;
  @ViewChild(Uk2MenuButtonComponent) menuButton!: Uk2MenuButtonComponent;

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  onItemsReordered(items: Uk2MenuButtonItem[]) {
    this.receivedItems = items;
  }

  handleApplyButton() {
    this.menuButton.applySelectedOptions();
    this.menuButton.close();
  }

  resetColumns(): void {
    this.items = window.structuredClone(this.originalItems);
    this.receivedItems = [];
  }
}
