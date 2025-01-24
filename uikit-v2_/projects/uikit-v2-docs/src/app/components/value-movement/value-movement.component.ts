import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Uk2ValueMovementTypeEnum } from '@axos/uikit-v2-lib';

@Component({
  templateUrl: './value-movement.component.html',
  styleUrls: ['./value-movement.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ValueMovementComponent {
  isLoading = false;

  isEmpty = false;

  isIconOnly = false;

  valueMovementsIncreasePositive = {
    amount: 134.25,
    percentage: 23.2,
    description: 'Some description',
    valueMovementType: Uk2ValueMovementTypeEnum.increasePositive,
  };
  valueMovementsIncreaseNegative = {
    amount: 134.25,
    percentage: 23.2,
    description: 'Some description',
    valueMovementType: Uk2ValueMovementTypeEnum.increaseNegative,
  };
  valueMovementsDecreasePositive = {
    amount: 134.25,
    percentage: 23.2,
    description: 'Some description',
    valueMovementType: Uk2ValueMovementTypeEnum.decreasePositive,
  };
  valueMovementsDecreaseNegative = {
    amount: 134.25,
    percentage: 23.2,
    description: 'Some description',
    valueMovementType: Uk2ValueMovementTypeEnum.decreaseNegative,
  };
  valueMovementsNone = {
    amount: 134.25,
    percentage: 23.2,
    description: 'Some description',
    valueMovementType: Uk2ValueMovementTypeEnum.none,
  };

  constructor() {}

  get basicExample(): string {
    return `<uk2-value-movement
    [uk2IsLoading]="IsLoading"
    [svgIconName]="valueMovementsIncreasePositive.iconName"
    [amount]="valueMovementsIncreasePositive.amount"
    [percentage]="valueMovementsIncreasePositive.percentage"
    [description]="valueMovementsIncreasePositive.description"
    [valueMovementType]="valueMovementsIncreasePositive.valueMovementType"
    [isEmpty]="isEmpty"
    [isIconOnly]="isIconOnly"
    ></uk2-value-movement>`;
  }
  get basicExampleData(): string {
    return `valueMovementsIncreasePositive =
    {
      amount: "134.25",
      percentage: "23.2",
      description: "Some description",
      valueMovementType: Uk2ValueMovementType.IncreasePositive,
      isEmpty: false,
      isIconOnly: false,
      uk2IsLoading: false,
    };`;
  }

  toggleLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  toggleisEmpty() {
    this.isEmpty = true;
    setTimeout(() => {
      this.isEmpty = false;
    }, 3000);
  }

  toggleisIconOnly() {
    this.isIconOnly = true;
    setTimeout(() => {
      this.isIconOnly = false;
    }, 3000);
  }
}
