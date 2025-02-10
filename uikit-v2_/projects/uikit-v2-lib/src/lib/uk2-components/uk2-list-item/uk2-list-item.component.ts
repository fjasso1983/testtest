import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2ListItem, Uk2ListItemCurrencyOptions } from './types';
import { Uk2Tier1UtilityEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';

@Component({
  selector: 'uk2-list-item',
  templateUrl: './uk2-list-item.component.html',
})
export class Uk2ListItemComponent implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2ListItem!: Uk2ListItem;
  @Input() uk2IsDisabled: boolean | undefined;
  @Input() uk2IsPending: boolean | undefined;
  @Input() uk2IsLoading = false;
  @Input() uk2ShowDividerLine: boolean | undefined = false;
  @Input() uk2CurrencyOptions: Uk2ListItemCurrencyOptions | undefined;
  @Input() uk2ShowDragHandle = false;

  dragIcon: Uk2Tier1UtilityEnum = Uk2Tier1UtilityEnum.dotGridDrag;

  constructor() {}

  ngOnInit(): void {
    this.validateInput();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { uk2ListItem } = changes;
    if (uk2ListItem) {
      this.validateInput();
    }
  }

  private validateInput(): void {
    if (!this.uk2ListItem) {
      throw new Error('uk2ListItem is a required input for Uk2ListItemComponent');
    }
  }
}
