import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Uk2ChipSizesEnum, Uk2ChipTypesEnum, Uk2IconRegistryService } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
})
export class MenuListItemComponent implements OnChanges {
  @Input() item1Text: string = 'Lorem ipsum dolor sit amet';
  @Input() item1Icon: string = 'uk2-download';
  @Input() isLoading: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() hasDivider: boolean = false;
  @Input() toggleIconDisplay: boolean = true;
  @Input() toggleChipDisplay: boolean = false;
  @Input() toggleInputDisplay = 'none'; //none, radio, checkbox

  @Output() itemClickEvent = new EventEmitter<string>();

  chipSize: Uk2ChipSizesEnum = Uk2ChipSizesEnum.small;
  chipType: Uk2ChipTypesEnum = Uk2ChipTypesEnum.rounded;

  radioSelection: string | undefined = undefined;

  firstItem = {
    bodyText: 'Lorem ipsum dolor sit amet',
    svgIconName: 'uk2-download',
    value: 'option1',
    isSelected: false,
  };
  secondItem = {
    bodyText: 'Lorem ipsum dolor sit amet',
    svgIconName: 'uk2-share',
    value: 'option2',
    isSelected: false,
  };
  thirdItem = {
    bodyText: 'Lorem ipsum dolor sit amet',
    svgIconName: 'uk2-upload',
    value: 'option3',
    isSelected: false,
  };

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.toggleInputDisplay) {
      this.resetSelections();
    }
  }

  onActionClicked(item: any) {
    this.itemClickEvent.emit(item.value);
    if (this.toggleInputDisplay == 'radio') {
      this.resetSelections();
      this.radioSelection = item.value;
      item.isSelected = true;
    } else {
      item.isSelected = !item.isSelected;
    }
  }

  private resetSelections() {
    this.firstItem.isSelected = false;
    this.secondItem.isSelected = false;
    this.thirdItem.isSelected = false;
    this.radioSelection = undefined;
  }
}
