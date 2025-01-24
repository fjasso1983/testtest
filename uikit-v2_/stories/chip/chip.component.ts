import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Uk2ChipSizesEnum, Uk2ChipTypesEnum, Uk2Icon, Uk2IconRegistryService } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() chipText: string = 'Lorem Ipsum';
  @Input() chipSize: Uk2ChipSizesEnum = Uk2ChipSizesEnum.medium;
  @Input() chipType: Uk2ChipTypesEnum = Uk2ChipTypesEnum.square;
  @Input() trailingIcon: Uk2Icon | undefined = 'uk2-info-circle' as Uk2Icon;
  @Input() leadingIcon: Uk2Icon | undefined = 'uk2-info-circle' as Uk2Icon;
  @Input() hasChipIndicator: boolean = false;
  @Input() showBorder: boolean = true;
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() clickableChip: boolean = false;
  @Input() truncateText: boolean = true;
  @Input() chipActive: boolean = false;

  @Output() chipEmitter = new EventEmitter();

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  clickChip() {
    this.chipEmitter.emit();
  }
}
