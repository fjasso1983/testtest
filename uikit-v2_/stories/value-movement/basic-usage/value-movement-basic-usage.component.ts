import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {
  Uk2ValueMovementDisplayTypeEnum,
  Uk2ValueMovementSizeEnum,
  Uk2ValueMovementTrendFormatEnum,
  Uk2ValueMovementTypeEnum,
} from '@axos/uikit-v2-lib';
import { Uk2IconRegistryService } from '@axos/uikit-v2-lib';
@Component({
  selector: 'app-valuemovement',
  templateUrl: './value-movement-basic-usage.component.html',
  styleUrls: ['./value-movement-basic-usage.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueMovementBasicUsageComponent implements OnInit {
  @Input() amount? = 99.99;
  @Input() percentage? = 99.99;
  @Input() description = 'Year to Date';
  @Input() isLoading = false;
  @Input() displayType: Uk2ValueMovementDisplayTypeEnum = Uk2ValueMovementDisplayTypeEnum.noContainer;
  @Input() trendFormat: Uk2ValueMovementTrendFormatEnum = Uk2ValueMovementTrendFormatEnum.triangle;
  @Input() valueMovementType: Uk2ValueMovementTypeEnum = Uk2ValueMovementTypeEnum.increasePositive;
  @Input() size: Uk2ValueMovementSizeEnum = Uk2ValueMovementSizeEnum.medium;
  @Input() isEmpty = false;
  @Input() isIconOnly = false;
  @Input() isAmountUndefined = false;
  @Input() isPercentageUndefined = false;

  constructor(private iconRegistryService: Uk2IconRegistryService) {}

  ngOnInit() {
    this.iconRegistryService.registerAllCategories();
  }
}
