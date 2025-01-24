import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Uk2IconRegistryService, Uk2MessagingCardTypeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-messaging-card',
  templateUrl: './messaging-card-basic-usage.component.html',
  styleUrls: ['./messaging-card-basic-usage.css'],
})
export class MessagingCardBasicUsageComponent implements OnInit, OnChanges {
  @Input() type: Uk2MessagingCardTypeEnum = Uk2MessagingCardTypeEnum.inform;
  @Input() headerText = 'Lorem ipsum dolor sit amet';
  @Input() isExpandable = true;
  @Input() isExpanded = true;
  @Input() isLoading = false;
  @Input() svgIconName = '';
  @Input() showIcon = true;

  constructor(private iconRegistryService: Uk2IconRegistryService) {}

  ngOnInit() {
    this.iconRegistryService.registerAllCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type) {
      if (changes.type.currentValue == Uk2MessagingCardTypeEnum.alert) {
        this.typeChanged();
      }
    }

    if (changes.isExpandable) {
      this.isExpandableChanged();
    }
  }

  // Empty method to catch event in storybook control to update value:
  typeChanged() {}
  isExpandableChanged() {}
}
