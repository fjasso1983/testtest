import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  HostListener,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  Uk2ValueMovementDisplayTypeEnum,
  Uk2ValueMovementSizeEnum,
  Uk2ValueMovementTrendFormatEnum,
  Uk2ValueMovementTypeEnum,
} from './enums';
import { Uk2ValueMovementTypeValueEnum } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2ValueMovementIconsEnum } from './enums/uk2-value-movement-icons.enum';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { IconMappingType, SuffixCalculation } from './types';
import { uk2ValueMovementConstants } from './constants';

@Component({
  selector: 'uk2-value-movement',
  templateUrl: './uk2-value-movement.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2ValueMovementComponent implements OnInit, AfterViewInit, OnChanges, IUk2IsLoading {
  @ViewChildren('uk2ValueMovementElem') valueMovementElems?: QueryList<ElementRef<HTMLDivElement>>;

  containerRef?: ElementRef<HTMLDivElement>;
  amountRef?: ElementRef<HTMLDivElement>;
  percentageRef?: ElementRef<HTMLDivElement>;
  descriptionRef?: ElementRef<HTMLDivElement>;

  @Input() amount?: number;
  @Input() percentage?: number;
  @Input() valueMovementType: Uk2ValueMovementTypeEnum = Uk2ValueMovementTypeEnum.undefined;
  @Input() displayType = Uk2ValueMovementDisplayTypeEnum.noContainer;
  @Input() trendFormat = Uk2ValueMovementTrendFormatEnum.triangle;
  @Input() size = Uk2ValueMovementSizeEnum.medium;
  @Input() uk2IsLoading = false;
  @Input() isEmpty = false;
  @Input() isIconOnly = false;

  /**
   * @deprecated
   * Uk2ValueMovementComponent now supports content projection for custom description.
   */
  @Input() description = '';

  amountDisplay = '';
  amountSuffix = '';
  percentageDisplay = '';
  percentageSuffix = '';
  svgIconName = '';
  colorTheme = '';
  ariaLabel = '';
  chipTypeBackgroundColorTheme = '';

  isViewLoaded = false;

  iconMapping: IconMappingType = {
    [Uk2ValueMovementTrendFormatEnum.triangle]: {
      [Uk2ValueMovementTypeEnum.increasePositive]: Uk2ValueMovementIconsEnum.positiveMovement,
      [Uk2ValueMovementTypeEnum.increaseNegative]: Uk2ValueMovementIconsEnum.positiveMovement,
      [Uk2ValueMovementTypeEnum.decreasePositive]: Uk2ValueMovementIconsEnum.negativeMovement,
      [Uk2ValueMovementTypeEnum.decreaseNegative]: Uk2ValueMovementIconsEnum.negativeMovement,
      [Uk2ValueMovementTypeEnum.none]: Uk2ValueMovementIconsEnum.neutralMovement,
    },
    [Uk2ValueMovementTrendFormatEnum.symbol]: {
      [Uk2ValueMovementTypeEnum.increasePositive]: Uk2ValueMovementIconsEnum.symbolPositiveMovement,
      [Uk2ValueMovementTypeEnum.increaseNegative]: Uk2ValueMovementIconsEnum.symbolPositiveMovement,
      [Uk2ValueMovementTypeEnum.decreasePositive]: Uk2ValueMovementIconsEnum.symbolNegativeMovement,
      [Uk2ValueMovementTypeEnum.decreaseNegative]: Uk2ValueMovementIconsEnum.symbolNegativeMovement,
      [Uk2ValueMovementTypeEnum.none]: Uk2ValueMovementIconsEnum.neutralMovement,
    },
  };

  constructor(
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {}

  @HostListener('window:resize')
  onResize() {
    this.truncateElements();
  }

  ngOnInit(): void {
    this.setImageColor(this.valueMovementType);
    this.printAmountPercentage();
  }

  ngAfterViewInit() {
    this.initializeElemsRefs();
    this.isViewLoaded = true;
    this.truncateElements();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.valueMovementType) this.setImageColor(changes.valueMovementType.currentValue);

    if (changes.trendFormat)
      this.setIconTrendFormat(
        changes.trendFormat.currentValue,
        changes.valueMovementType?.currentValue ?? this.valueMovementType
      );

    if (changes.amount) {
      this.formatAmount();
    }

    if (changes.percentage) {
      this.formatPercentage();
    }

    if (changes.isEmpty) {
      this.printAmountPercentage();
    }

    if (this.isViewLoaded) {
      // setTimeout is used to avoid getting undefined error when accessing to nativeElements
      setTimeout(() => {
        this.truncateElements();
      }, 0);
    }
  }

  initializeElemsRefs() {
    this.valueMovementElems?.changes.subscribe(elems => {
      this.setupElemsRefs(elems);
      this.changeDetector.detectChanges();
    });

    this.setupElemsRefs(this.valueMovementElems);
  }

  setupElemsRefs(elems?: QueryList<ElementRef<HTMLDivElement>>) {
    this.containerRef = elems?.find(elem => elem.nativeElement.id == 'uk2-value-movement-container');
    this.amountRef = elems?.find(elem => elem.nativeElement.id == 'uk2-value-movement-amount');
    this.percentageRef = elems?.find(elem => elem.nativeElement.id == 'uk2-value-movement-percentage');
    this.descriptionRef = elems?.find(elem => elem.nativeElement.id == 'uk2-value-movement-description');
  }

  truncateValue(value: number, type: Uk2ValueMovementTypeValueEnum) {
    if (type === Uk2ValueMovementTypeValueEnum.percentage) {
      const suffixes = ['', 'K', 'M', 'B'];
      let divisor = 1;
      if (value >= 1000) {
        divisor = 1000;
        let suffixIndex = 1;
        while (value >= divisor * 1000 && suffixIndex < suffixes.length - 1) {
          divisor *= 1000;
          suffixIndex++;
        }

        return this.getPercentage(value / divisor, suffixes[suffixIndex]);
      }

      return this.getPercentage(value);
    }

    return this.calculateAmount(value);
  }

  calculateAmount(value: number): string {
    const result = this.calculateTruncSuffix(value);
    this.amountSuffix = result.suffix;

    return result.stringedAmount;
  }

  calculateTruncSuffix(number: number): SuffixCalculation {
    const suffixList = [
      {
        suffix: '',
        divisor: 1,
      },
      {
        suffix: 'K',
        divisor: 1_000,
      },
      {
        suffix: 'M',
        divisor: 1_000_000,
      },
      {
        suffix: 'B',
        divisor: 1_000_000_000,
      },
    ] as const;
    if (number > -1 && number < 1) {
      return {
        amount: number,
        suffix: '',
        stringedAmount: this.currencyPipe.transform(number, 'USD', 'symbol', '1.2-2')!,
      };
    }

    const magnitude = Math.log10(Math.abs(number));
    const orderOfMagnitude = Math.floor(magnitude / 3);
    const validOrderOfMagnitude = Math.min(orderOfMagnitude, 3);
    const amountDividedBySuffix = number / suffixList[validOrderOfMagnitude].divisor;
    const pipeAmountResult = this.currencyPipe.transform(amountDividedBySuffix, 'USD', 'symbol', '1.2-2')!;
    const parsedFromPipe = Number.parseFloat(pipeAmountResult!.replace(/[$,]/g, ''));
    if (parsedFromPipe >= suffixList[1].divisor && validOrderOfMagnitude <= suffixList.length - 2) {
      return {
        amount: amountDividedBySuffix,
        suffix: suffixList[validOrderOfMagnitude + 1].suffix,
        stringedAmount: this.currencyPipe.transform(parsedFromPipe / suffixList[1].divisor, 'USD', 'symbol', '1.2-2')!,
      };
    }

    return {
      amount: amountDividedBySuffix,
      suffix: suffixList[validOrderOfMagnitude].suffix,
      stringedAmount: pipeAmountResult!,
    };
  }

  truncateElements(): void {
    if (this.uk2IsLoading || this.isIconOnly) return;

    this.printAmountPercentage();
    this.toggleDescriptionTruncation(this.containerRef!, true);
    const amountElem = this.getElementWidth(this.amountDisplay, this.amountRef!);
    const percentageElem = this.getElementWidth(this.percentageDisplay, this.percentageRef!);
    const descriptionElem = this.getDescriptionWidth();
    const elementsLeftSize = this.containerRef!.nativeElement.offsetLeft;
    const containerWidth = this.elementRef?.nativeElement.offsetWidth;
    const combinedWidth = amountElem + percentageElem + descriptionElem + elementsLeftSize;

    if (containerWidth <= combinedWidth) {
      const truncatedAmount = !this.isEmptyAmount()
        ? this.truncateValue(this.amount ?? 0, Uk2ValueMovementTypeValueEnum.amount)
        : this.amountDisplay;
      const newAmountWidth = this.getElementWidth(truncatedAmount, this.amountRef!);
      const newTotalWidth = newAmountWidth + percentageElem + descriptionElem + elementsLeftSize;
      if (newTotalWidth >= containerWidth) {
        const truncatedPercentage = !this.isEmptyPercentage()
          ? this.truncateValue(this.percentage ?? 0, Uk2ValueMovementTypeValueEnum.percentage)
          : this.percentageDisplay;
        const newPercentageWidth = this.getElementWidth(truncatedPercentage, this.percentageRef!);
        const finalTotalWidth = newAmountWidth + newPercentageWidth + descriptionElem + elementsLeftSize;
        if (finalTotalWidth >= containerWidth) {
          this.amountDisplay = truncatedAmount;
          this.percentageDisplay = truncatedPercentage;
          this.toggleDescriptionTruncation(this.containerRef!, false);
        }
        this.amountDisplay = truncatedAmount;
        this.percentageDisplay = truncatedPercentage;
      }
      this.amountDisplay = truncatedAmount;
      this.changeDetector.detectChanges();
    }
  }

  toggleDescriptionTruncation(container: ElementRef<HTMLDivElement>, isAdded: boolean) {
    const containerElement = container!.nativeElement;
    const firstElementChild = containerElement.firstElementChild!;
    const className = 'uk2-value-movement-text-overflow';

    if (isAdded) {
      containerElement.classList.remove(className);
      firstElementChild.classList.remove(className);
    } else {
      containerElement.classList.add(className);
      firstElementChild.classList.add(className);
    }
  }

  getElementWidth(content: string, elementRef: ElementRef): number {
    const spanElement = document.createElement('span');
    spanElement.textContent = content;
    spanElement.classList.add(...elementRef.nativeElement.classList);
    elementRef.nativeElement.insertAdjacentElement('afterend', spanElement);
    const width = spanElement.offsetWidth;
    spanElement.remove();

    return width;
  }

  getDescriptionWidth() {
    return this.description
      ? this.getElementWidth(this.description, this.descriptionRef!)
      : this.descriptionRef?.nativeElement?.offsetWidth ?? 0;
  }

  setImageColor(valueMovementType: Uk2ValueMovementTypeEnum): void {
    switch (valueMovementType) {
      case Uk2ValueMovementTypeEnum.increasePositive:
        this.colorTheme = 'uk2-value-movement-type-positive';
        this.chipTypeBackgroundColorTheme = 'uk2-value-movement-chip-type-background-positive';
        break;
      case Uk2ValueMovementTypeEnum.decreasePositive:
        this.colorTheme = 'uk2-value-movement-type-positive';
        this.chipTypeBackgroundColorTheme = 'uk2-value-movement-chip-type-background-positive';
        break;
      case Uk2ValueMovementTypeEnum.increaseNegative:
        this.colorTheme = 'uk2-value-movement-type-negative';
        this.chipTypeBackgroundColorTheme = 'uk2-value-movement-chip-type-background-negative';
        break;
      case Uk2ValueMovementTypeEnum.decreaseNegative:
        this.colorTheme = 'uk2-value-movement-type-negative';
        this.chipTypeBackgroundColorTheme = 'uk2-value-movement-chip-type-background-negative';
        break;
      case Uk2ValueMovementTypeEnum.none:
        this.colorTheme = 'uk2-value-movement-type-neutral';
        this.chipTypeBackgroundColorTheme = 'uk2-value-movement-chip-type-background-neutral';
        this.svgIconName = Uk2ValueMovementIconsEnum.neutralMovement;
        break;
    }

    this.setIconTrendFormat(this.trendFormat, valueMovementType);
  }

  setIconTrendFormat(trendFormat: Uk2ValueMovementTrendFormatEnum, valueMovementType: Uk2ValueMovementTypeEnum) {
    this.svgIconName = this.iconMapping[trendFormat][valueMovementType] || Uk2ValueMovementIconsEnum.neutralMovement;
  }

  printAmountPercentage() {
    this.formatAmount();
    this.formatPercentage();
  }

  formatAmount() {
    if (this.hasAmountValue() && this.isEmpty) {
      this.amountSuffix = '';
      this.amountDisplay = uk2ValueMovementConstants.amountEmptyFormattedValue;

      return;
    }
    if (!this.hasAmountValue()) {
      this.amountSuffix = '';
      this.amountDisplay = '';

      return;
    }
    this.amountDisplay = this.getAmount(this.amount ?? 0);
  }

  isEmptyAmount() {
    return this.amountDisplay == uk2ValueMovementConstants.amountEmptyFormattedValue || this.amountDisplay == '';
  }

  hasAmountValue() {
    return this.amount !== undefined && this.amount !== null;
  }

  formatPercentage() {
    if (this.hasPercentageValue() && !this.hasAmountValue() && this.isEmpty) {
      this.percentageSuffix = '';
      this.percentageDisplay = uk2ValueMovementConstants.percentageSingleFormattedEmptyValue;
      this.changeDetector.detectChanges();

      return;
    }
    if (this.hasPercentageValue() && this.hasAmountValue() && this.isEmpty) {
      this.percentageSuffix = uk2ValueMovementConstants.percentageSuffixFormattedEmptyValue;
      this.percentageDisplay = uk2ValueMovementConstants.percentagePrefixFormattedEmptyValue;
      this.changeDetector.detectChanges();

      return;
    }
    if (!this.hasPercentageValue()) {
      this.percentageSuffix = '';
      this.percentageDisplay = '';
      this.changeDetector.detectChanges();

      return;
    }
    this.percentageDisplay = this.getPercentage(this.percentage ?? 0);

    this.changeDetector.detectChanges();
  }

  isEmptyPercentage() {
    return (
      this.percentageDisplay == uk2ValueMovementConstants.percentagePrefixFormattedEmptyValue ||
      this.percentageDisplay == uk2ValueMovementConstants.percentageSingleFormattedEmptyValue ||
      this.percentageDisplay == ''
    );
  }

  hasPercentageValue() {
    return this.percentage !== undefined && this.percentage !== null;
  }

  getAmount(amount: number, suffix: string = '') {
    this.amountSuffix = suffix;

    const result = this.currencyPipe.transform(amount, 'USD', 'symbol', '1.2-2') ?? '';

    return result;
  }

  getPercentage(percentage: number, suffix: string = '') {
    const startingWrapperChar = this.hasAmountValue() ? uk2ValueMovementConstants.percentageStartingWrapperChar : '';
    const endingWrapperChar = this.hasAmountValue() ? uk2ValueMovementConstants.percentageEndingWrapperChar : '';

    this.percentageSuffix = `${suffix}%${endingWrapperChar}`;

    if (percentage === 0) return `${startingWrapperChar}0.00`;
    if (percentage < 0.0001) return `${startingWrapperChar}<0.01`;
    const result = `${startingWrapperChar}${
      percentage > 1 ? this.decimalPipe.transform(percentage, '1.2-2') : (percentage * 100).toFixed(2)
    }`;

    return result;
  }

  shouldShowLoadingIcon() {
    return this.uk2IsLoading && this.displayType == Uk2ValueMovementDisplayTypeEnum.noContainer;
  }

  shouldShowLoadingSkeletonBody() {
    return (
      this.uk2IsLoading &&
      (this.displayType != Uk2ValueMovementDisplayTypeEnum.noContainer ||
        (this.displayType == Uk2ValueMovementDisplayTypeEnum.noContainer && !this.isIconOnly))
    );
  }

  shouldRemoveGapForDisplayType(displayType: Uk2ValueMovementDisplayTypeEnum) {
    return (
      this.displayType == displayType &&
      (this.size == Uk2ValueMovementSizeEnum.extraSmall || this.size == Uk2ValueMovementSizeEnum.small)
    );
  }

  getContainerClass() {
    const classes: string[] = [this.colorTheme];

    if (this.displayType == Uk2ValueMovementDisplayTypeEnum.chip) {
      classes.push('uk2-value-movement-chip-type');
      classes.push(`uk2-value-movement-chip-type-${this.size}`);
      classes.push(this.chipTypeBackgroundColorTheme);
    }

    if (
      !this.isIconOnly &&
      (this.amountDisplay != '' || this.percentageDisplay != '') &&
      !this.shouldRemoveGapForDisplayType(Uk2ValueMovementDisplayTypeEnum.chip) &&
      !this.shouldRemoveGapForDisplayType(Uk2ValueMovementDisplayTypeEnum.noContainer)
    ) {
      classes.push('uk2-value-movement-info-row-gap');
    }

    return classes;
  }

  getAmountPercentageClass() {
    return [
      `uk2-value-movement-${this.displayType}-type-amount-percentage`,
      `uk2-value-movement-${this.displayType}-type-amount-percentage-${this.size}`,
    ];
  }

  getDescriptionClass() {
    const classes: string[] = [
      `uk2-value-movement-${this.displayType}-type-description`,
      `uk2-value-movement-${this.displayType}-type-description-${this.size}`,
    ];

    if (
      this.displayType == Uk2ValueMovementDisplayTypeEnum.display &&
      (this.hasAmountValue() || this.hasPercentageValue())
    ) {
      classes.push(`uk2-value-movement-${this.displayType}-type-description-margin-${this.size}`);
    }

    return classes;
  }

  getSkeletonIconClass() {
    return {
      'uk2-value-movement-no-container-type-skeleton-icon':
        this.displayType == Uk2ValueMovementDisplayTypeEnum.noContainer,
    };
  }

  getSkeletonBodyClass() {
    return {
      'uk2-value-movement-display-type-skeleton-body': this.displayType == Uk2ValueMovementDisplayTypeEnum.display,
      'uk2-value-movement-chip-type-skeleton-body': this.displayType == Uk2ValueMovementDisplayTypeEnum.chip,
      'uk2-value-movement-no-container-type-skeleton-body':
        this.displayType == Uk2ValueMovementDisplayTypeEnum.noContainer,
    };
  }

  getSkeletonRowClass() {
    return {
      'uk2-value-movement-info-row': this.displayType == Uk2ValueMovementDisplayTypeEnum.noContainer,
      'uk2-value-movement-info-row-gap': !this.isIconOnly,
    };
  }
}
