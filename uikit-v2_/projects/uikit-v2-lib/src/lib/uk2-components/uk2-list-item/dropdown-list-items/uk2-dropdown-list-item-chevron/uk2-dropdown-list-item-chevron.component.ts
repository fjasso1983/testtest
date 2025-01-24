import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
} from '@angular/core';

import { MatOption } from '@angular/material/core';

import { IUk2IsLoading, MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';

import { UK2_DROPDOWN_LIST_ITEM_CLASS } from '../constants';
import { Uk2ListItem, Uk2ListItemCurrencyOptions } from '../../types';

@Component({
  selector: 'uk2-dropdown-list-item-chevron',
  templateUrl: './uk2-dropdown-list-item-chevron.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2DropdownListItemChevronComponent implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2ListItem!: Uk2ListItem;
  @Input() uk2IsDisabled: boolean | undefined;
  @Input() uk2IsPending: boolean | undefined;
  @Input() uk2IsLoading = false;
  @Input() uk2ShowDividerLine: boolean | undefined = false;
  @Input() uk2CurrencyOptions: Uk2ListItemCurrencyOptions | undefined;
  chevronRightIcon = Uk2Tier1NavigationEnum.chevronRight;

  constructor(private elementRef: ElementRef<HTMLElement>, @Optional() private matOption?: MatOption) {}

  ngOnInit(): void {
    this.addParentClass();
    this.disableMatOption();

    const title = this.elementRef.nativeElement.innerText.replace(/\r?\n|\r/gm, ' ').trim();
    this.elementRef.nativeElement.setAttribute('title', title);
    this.elementRef.nativeElement.setAttribute('aria-label', title);
  }

  ngOnChanges(changes: SimpleChanges) {
    const { uk2IsDisabled } = changes;
    if (uk2IsDisabled) {
      this.disableMatOption();
    }
  }

  private addParentClass(): void {
    const parentEl = this.elementRef.nativeElement.closest(`.${MATERIAL_CLASSES.matOption}`) as HTMLElement;
    if (parentEl) {
      parentEl.classList.add(UK2_DROPDOWN_LIST_ITEM_CLASS);
    }
  }

  private disableMatOption() {
    if (this.matOption && this.matOption.disabled !== undefined) {
      this.matOption.disabled = this.uk2IsDisabled;
    }
  }
}
