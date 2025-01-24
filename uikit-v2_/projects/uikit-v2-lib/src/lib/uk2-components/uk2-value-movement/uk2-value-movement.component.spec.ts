import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Uk2ValueMovementComponent } from './uk2-value-movement.component';
import { Uk2ValueMovementTypeEnum } from './enums/uk2-value-movement.enum';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Uk2ValueMovementTypeValueEnum } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import {
  Uk2ValueMovementDisplayTypeEnum,
  Uk2ValueMovementIconsEnum,
  Uk2ValueMovementSizeEnum,
  Uk2ValueMovementTrendFormatEnum,
} from './enums';

const fakeIconName = 'test-icon';
describe('Uk2ValueMovementComponent', () => {
  let component: Uk2ValueMovementComponent;
  let fixture: ComponentFixture<Uk2ValueMovementComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [Uk2ValueMovementComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [CurrencyPipe, DecimalPipe],
    })
      .overrideComponent(Uk2ValueMovementComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Uk2ValueMovementComponent);
    component = fixture.componentInstance;

    component.description = 'Some description';
    component.valueMovementType = Uk2ValueMovementTypeEnum.undefined;
    component.svgIconName = fakeIconName;
    component.isIconOnly = false;
    component.isEmpty = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display noContainer by default', () => {
    const htmlComponent = fixture.nativeElement;
    const amountPercentageContainer = htmlComponent.querySelector(
      '.uk2-value-movement-info-row.uk2-value-movement-no-container-type-amount-percentage'
    );
    expect(amountPercentageContainer).toBeInstanceOf(HTMLDivElement);
    expect(component.displayType).toEqual(Uk2ValueMovementDisplayTypeEnum.noContainer);
  });

  describe('[displayType]', () => {
    const testCases = [
      {
        name: 'noContainer',
        displayType: Uk2ValueMovementDisplayTypeEnum.noContainer,
        amountPercentageClass: 'uk2-value-movement-no-container-type-amount-percentage',
        descriptionClass: 'uk2-value-movement-no-container-type-description',
      },
      {
        name: 'display',
        displayType: Uk2ValueMovementDisplayTypeEnum.display,
        amountPercentageClass: 'uk2-value-movement-display-type-amount-percentage',
        descriptionClass: 'uk2-value-movement-display-type-description',
      },
      {
        name: 'chip',
        displayType: Uk2ValueMovementDisplayTypeEnum.chip,
        amountPercentageClass: 'uk2-value-movement-chip-type-amount-percentage',
        descriptionClass: 'uk2-value-movement-chip-type-description',
      },
    ];

    testCases.forEach(test => {
      it(`should display ${test.name}`, () => {
        component.displayType = test.displayType;

        component.ngOnChanges({
          displayType: new SimpleChange(Uk2ValueMovementDisplayTypeEnum.noContainer, test.displayType, true),
        });

        fixture.detectChanges();

        const htmlComponent = fixture.nativeElement;

        const amountPercentageContainer = htmlComponent.querySelector(
          `.uk2-value-movement-info-row.${test.amountPercentageClass}`
        );
        const descriptionContainer = htmlComponent.querySelector(
          `.uk2-value-movement-description.${test.descriptionClass}`
        );
        expect(amountPercentageContainer).toBeInstanceOf(HTMLDivElement);
        expect(descriptionContainer).toBeInstanceOf(HTMLDivElement);
        expect(component.displayType).toEqual(test.displayType);
      });
    });
  });

  describe('[trendFormat]', () => {
    const testCases = [
      {
        name: 'Trend Format = "triangle" and Movement Type = "increasePositive"',
        trendFormat: Uk2ValueMovementTrendFormatEnum.triangle,
        valueMovementType: Uk2ValueMovementTypeEnum.increasePositive,
        icon: Uk2ValueMovementIconsEnum.positiveMovement,
      },
      {
        name: 'Trend Format = "triangle" and Movement Type = "increaseNegative"',
        trendFormat: Uk2ValueMovementTrendFormatEnum.triangle,
        valueMovementType: Uk2ValueMovementTypeEnum.increaseNegative,
        icon: Uk2ValueMovementIconsEnum.positiveMovement,
      },
      {
        name: 'Trend Format = "triangle" and Movement Type = "decreaseNegative"',
        trendFormat: Uk2ValueMovementTrendFormatEnum.triangle,
        valueMovementType: Uk2ValueMovementTypeEnum.decreaseNegative,
        icon: Uk2ValueMovementIconsEnum.negativeMovement,
      },
      {
        name: 'Trend Format = "triangle" and Movement Type = "decreasePositive"',
        trendFormat: Uk2ValueMovementTrendFormatEnum.triangle,
        valueMovementType: Uk2ValueMovementTypeEnum.decreasePositive,
        icon: Uk2ValueMovementIconsEnum.negativeMovement,
      },
      {
        name: 'Trend Format = "triangle" and Movement Type = "none"',
        trendFormat: Uk2ValueMovementTrendFormatEnum.triangle,
        valueMovementType: Uk2ValueMovementTypeEnum.none,
        icon: Uk2ValueMovementIconsEnum.neutralMovement,
      },
      {
        name: 'Trend Format = "symbol" and Movement Type = "increasePositive"',
        trendFormat: Uk2ValueMovementTrendFormatEnum.symbol,
        valueMovementType: Uk2ValueMovementTypeEnum.increasePositive,
        icon: Uk2ValueMovementIconsEnum.symbolPositiveMovement,
      },
      {
        name: 'Trend Format = "symbol" and Movement Type = "increaseNegative"',
        trendFormat: Uk2ValueMovementTrendFormatEnum.symbol,
        valueMovementType: Uk2ValueMovementTypeEnum.increaseNegative,
        icon: Uk2ValueMovementIconsEnum.symbolPositiveMovement,
      },
      {
        name: 'Trend Format = "symbol" and Movement Type = "decreasePositive"',
        trendFormat: Uk2ValueMovementTrendFormatEnum.symbol,
        valueMovementType: Uk2ValueMovementTypeEnum.decreasePositive,
        icon: Uk2ValueMovementIconsEnum.symbolNegativeMovement,
      },
      {
        name: 'Trend Format = "symbol" and Movement Type = "decreaseNegative"',
        trendFormat: Uk2ValueMovementTrendFormatEnum.symbol,
        valueMovementType: Uk2ValueMovementTypeEnum.decreaseNegative,
        icon: Uk2ValueMovementIconsEnum.symbolNegativeMovement,
      },
      {
        name: 'Trend Format = "symbol" and Movement Type = "none"',
        trendFormat: Uk2ValueMovementTrendFormatEnum.symbol,
        valueMovementType: Uk2ValueMovementTypeEnum.none,
        icon: Uk2ValueMovementIconsEnum.neutralMovement,
      },
    ];

    testCases.forEach(test => {
      it(`should display "${test.icon}" icon when ${test.name}`, () => {
        component.trendFormat = test.trendFormat;
        component.valueMovementType = test.valueMovementType;

        component.ngOnChanges({
          trendFormat: new SimpleChange(Uk2ValueMovementTrendFormatEnum.triangle, test.trendFormat, true),
          valueMovementType: new SimpleChange(Uk2ValueMovementTypeEnum.undefined, test.valueMovementType, true),
        });

        fixture.detectChanges();

        expect(component.svgIconName).toEqual(test.icon);
      });
    });
  });

  describe('[size]', () => {
    const testCases = [
      // noContainer
      {
        name: 'Size = "extraSmall" and Display Type = "noContainer"',
        size: Uk2ValueMovementSizeEnum.extraSmall,
        displayType: Uk2ValueMovementDisplayTypeEnum.noContainer,
        amountPercentageContainerClasses: [
          'uk2-value-movement-no-container-type-amount-percentage',
          'uk2-value-movement-no-container-type-amount-percentage-extra-small',
        ],
        descriptionContainerClasses: [
          'uk2-value-movement-no-container-type-description',
          'uk2-value-movement-no-container-type-description-extra-small',
        ],
      },
      {
        name: 'Size = "small" and Display Type = "noContainer"',
        size: Uk2ValueMovementSizeEnum.small,
        displayType: Uk2ValueMovementDisplayTypeEnum.noContainer,
        amountPercentageContainerClasses: [
          'uk2-value-movement-no-container-type-amount-percentage',
          'uk2-value-movement-no-container-type-amount-percentage-small',
        ],
        descriptionContainerClasses: [
          'uk2-value-movement-no-container-type-description',
          'uk2-value-movement-no-container-type-description-small',
        ],
      },
      {
        name: 'Size = "medium" and Display Type = "noContainer"',
        size: Uk2ValueMovementSizeEnum.medium,
        displayType: Uk2ValueMovementDisplayTypeEnum.noContainer,
        amountPercentageContainerClasses: [
          'uk2-value-movement-no-container-type-amount-percentage',
          'uk2-value-movement-no-container-type-amount-percentage-medium',
        ],
        descriptionContainerClasses: [
          'uk2-value-movement-no-container-type-description',
          'uk2-value-movement-no-container-type-description-medium',
        ],
      },
      {
        name: 'Size = "large" and Display Type = "noContainer"',
        size: Uk2ValueMovementSizeEnum.large,
        displayType: Uk2ValueMovementDisplayTypeEnum.noContainer,
        amountPercentageContainerClasses: [
          'uk2-value-movement-no-container-type-amount-percentage',
          'uk2-value-movement-no-container-type-amount-percentage-large',
        ],
        descriptionContainerClasses: [
          'uk2-value-movement-no-container-type-description',
          'uk2-value-movement-no-container-type-description-large',
        ],
      },
      // chip
      {
        name: 'Size = "extraSmall" and Display Type = "chip"',
        size: Uk2ValueMovementSizeEnum.extraSmall,
        displayType: Uk2ValueMovementDisplayTypeEnum.chip,
        amountPercentageContainerClasses: [
          'uk2-value-movement-chip-type-amount-percentage',
          'uk2-value-movement-chip-type-amount-percentage-extra-small',
        ],
        descriptionContainerClasses: [
          'uk2-value-movement-chip-type-description',
          'uk2-value-movement-chip-type-description-extra-small',
        ],
      },
      {
        name: 'Size = "small" and Display Type = "chip"',
        size: Uk2ValueMovementSizeEnum.small,
        displayType: Uk2ValueMovementDisplayTypeEnum.chip,
        amountPercentageContainerClasses: [
          'uk2-value-movement-chip-type-amount-percentage',
          'uk2-value-movement-chip-type-amount-percentage-small',
        ],
        descriptionContainerClasses: [
          'uk2-value-movement-chip-type-description',
          'uk2-value-movement-chip-type-description-small',
        ],
      },
      {
        name: 'Size = "medium" and Display Type = "chip"',
        size: Uk2ValueMovementSizeEnum.medium,
        displayType: Uk2ValueMovementDisplayTypeEnum.chip,
        amountPercentageContainerClasses: [
          'uk2-value-movement-chip-type-amount-percentage',
          'uk2-value-movement-chip-type-amount-percentage-medium',
        ],
        descriptionContainerClasses: [
          'uk2-value-movement-chip-type-description',
          'uk2-value-movement-chip-type-description-medium',
        ],
      },
      {
        name: 'Size = "large" and Display Type = "chip"',
        size: Uk2ValueMovementSizeEnum.large,
        displayType: Uk2ValueMovementDisplayTypeEnum.chip,
        amountPercentageContainerClasses: [
          'uk2-value-movement-chip-type-amount-percentage',
          'uk2-value-movement-chip-type-amount-percentage-large',
        ],
        descriptionContainerClasses: [
          'uk2-value-movement-chip-type-description',
          'uk2-value-movement-chip-type-description-large',
        ],
      },
      // display
      {
        name: 'Size = "extraSmall" and Display Type = "display"',
        size: Uk2ValueMovementSizeEnum.extraSmall,
        displayType: Uk2ValueMovementDisplayTypeEnum.display,
        amountPercentageContainerClasses: [
          'uk2-value-movement-display-type-amount-percentage',
          'uk2-value-movement-display-type-amount-percentage-extra-small',
        ],
        descriptionContainerClasses: [
          'uk2-value-movement-display-type-description',
          'uk2-value-movement-display-type-description-extra-small',
        ],
      },
      {
        name: 'Size = "small" and Display Type = "display"',
        size: Uk2ValueMovementSizeEnum.small,
        displayType: Uk2ValueMovementDisplayTypeEnum.display,
        amountPercentageContainerClasses: [
          'uk2-value-movement-display-type-amount-percentage',
          'uk2-value-movement-display-type-amount-percentage-small',
        ],
        descriptionContainerClasses: [
          'uk2-value-movement-display-type-description',
          'uk2-value-movement-display-type-description-small',
        ],
      },
      {
        name: 'Size = "medium" and Display Type = "display"',
        size: Uk2ValueMovementSizeEnum.medium,
        displayType: Uk2ValueMovementDisplayTypeEnum.display,
        amountPercentageContainerClasses: [
          'uk2-value-movement-display-type-amount-percentage',
          'uk2-value-movement-display-type-amount-percentage-medium',
        ],
        descriptionContainerClasses: [
          'uk2-value-movement-display-type-description',
          'uk2-value-movement-display-type-description-medium',
        ],
      },
      {
        name: 'Size = "large" and Display Type = "display"',
        size: Uk2ValueMovementSizeEnum.large,
        displayType: Uk2ValueMovementDisplayTypeEnum.display,
        amountPercentageContainerClasses: [
          'uk2-value-movement-display-type-amount-percentage',
          'uk2-value-movement-display-type-amount-percentage-large',
        ],
        descriptionContainerClasses: [
          'uk2-value-movement-display-type-description',
          'uk2-value-movement-display-type-description-large',
        ],
      },
    ];

    testCases.forEach(test => {
      it(`should contain CSS classes when ${test.name}`, () => {
        component.size = test.size;
        component.displayType = test.displayType;

        component.ngOnChanges({
          size: new SimpleChange(Uk2ValueMovementSizeEnum.medium, test.size, true),
          displayType: new SimpleChange(Uk2ValueMovementDisplayTypeEnum.noContainer, test.displayType, true),
        });

        fixture.detectChanges();

        const htmlComponent = fixture.nativeElement;
        const valueMovementContainer = htmlComponent.querySelector(
          '#uk2-value-movement-container .uk2-value-movement-info-row'
        );
        const descriptionContainer = htmlComponent.querySelector('#uk2-value-movement-description');

        const hasContainerCorrespondingClasses = test.amountPercentageContainerClasses.every(x =>
          valueMovementContainer.classList.contains(x)
        );
        const hasDescriptionContainerCorrespondingClasses = test.descriptionContainerClasses.every(x =>
          descriptionContainer.classList.contains(x)
        );

        expect(hasContainerCorrespondingClasses).toBeTrue();
        expect(hasDescriptionContainerCorrespondingClasses).toBeTrue();
      });
    });
  });

  it('should display empty amount if amount input was not provided', () => {
    const htmlComponent = fixture.nativeElement;
    const amountContent = htmlComponent.querySelector('.uk2-value-movement-amount-wrap').innerText;

    expect(amountContent).toEqual('');
  });

  it('should display empty percentage if percentage input was not provided', () => {
    const htmlComponent = fixture.nativeElement;
    const percentageContent = htmlComponent.querySelector('.uk2-value-movement-percentage-wrap').innerText;

    expect(percentageContent).toEqual('');
  });

  it('should display only amount if amount input was provided and percentage input was not', () => {
    component.amount = 123.23;

    component.ngOnChanges({
      amount: new SimpleChange(0, 123.23, true),
    });
    fixture.detectChanges();

    const htmlComponent = fixture.nativeElement;
    const amountContent = htmlComponent.querySelector('.uk2-value-movement-amount-wrap').textContent;
    const percentageContent = htmlComponent.querySelector('.uk2-value-movement-percentage-wrap').textContent;

    expect(amountContent).toEqual('$123.23');
    expect(percentageContent).toEqual('');
  });

  it('should display only percentage if percentage input was provided and amount input was not', () => {
    component.amount = 123.23;
    component.percentage = 10.25;

    component.ngOnChanges({
      amount: new SimpleChange(0, 123.23, true),
      percentage: new SimpleChange(0, 10.25, true),
    });
    fixture.detectChanges();

    const htmlComponent = fixture.nativeElement;
    const amountContent = htmlComponent.querySelector('.uk2-value-movement-amount-wrap').textContent;
    const percentageContent = htmlComponent.querySelector('.uk2-value-movement-percentage-wrap').textContent;

    expect(amountContent).toEqual('$123.23');
    expect(percentageContent).toEqual('(10.25%)');
  });

  it('should display percentage wrapped by parenthesis if percentage and amount inputs were provided', () => {
    component.percentage = 10.25;

    component.ngOnChanges({
      percentage: new SimpleChange(0, 10.25, true),
    });
    fixture.detectChanges();

    const htmlComponent = fixture.nativeElement;
    const amountContent = htmlComponent.querySelector('.uk2-value-movement-amount-wrap').textContent;
    const percentageContent = htmlComponent.querySelector('.uk2-value-movement-percentage-wrap').textContent;

    expect(amountContent).toEqual('');
    expect(percentageContent).toEqual('10.25%');
  });

  it('should display amount formatted', () => {
    component.amount = 123.23;
    component.isEmpty = false;
    component.isIconOnly = false;
    component.uk2IsLoading = false;

    component.ngOnChanges({
      amount: new SimpleChange(23, '123.23', true),
    });

    fixture.detectChanges();

    const htmlComponent = fixture.nativeElement;
    const amountContent = htmlComponent.querySelector('.uk2-value-movement-amount-wrap').innerText;
    expect(amountContent).toContain('$123.23');
  });

  it('should display amount formatted', () => {
    component.amount = 123.23;
    component.isEmpty = false;
    component.isIconOnly = false;
    component.uk2IsLoading = false;

    component.ngOnChanges({
      amount: new SimpleChange(23, '123.23', true),
    });

    fixture.detectChanges();

    const htmlComponent = fixture.nativeElement;
    const amountContent = htmlComponent.querySelector('.uk2-value-movement-amount-wrap').innerText;
    expect(amountContent).toContain('$123.23');
  });

  it('should display percentage formatted', () => {
    component.percentage = 2.35;
    component.isEmpty = false;
    component.isIconOnly = false;
    component.uk2IsLoading = false;

    component.ngOnChanges({
      percentage: new SimpleChange(2.1, '2.35', true),
    });

    fixture.detectChanges();

    const htmlComponent = fixture.nativeElement;
    const percentageContent = htmlComponent.querySelector('.uk2-value-movement-percentage-wrap').textContent;
    expect(percentageContent).toContain('2.35%');
  });

  it('should display description', () => {
    const htmlComponent = fixture.nativeElement;
    const descriptionContent = htmlComponent.querySelector('.uk2-value-movement-description').textContent;
    expect(descriptionContent).toContain('Some description');
  });

  it('should change to increase positive state', () => {
    component.setImageColor(Uk2ValueMovementTypeEnum.increasePositive);

    expect(component.svgIconName).toEqual('uk2-positive-movement');
    expect(component.colorTheme).toEqual('uk2-value-movement-type-positive');
  });

  it('should change to increase negative state', () => {
    component.setImageColor(Uk2ValueMovementTypeEnum.increaseNegative);

    expect(component.svgIconName).toEqual('uk2-positive-movement');
    expect(component.colorTheme).toEqual('uk2-value-movement-type-negative');
  });

  it('should change to decrease positive state', () => {
    component.setImageColor(Uk2ValueMovementTypeEnum.decreasePositive);

    expect(component.svgIconName).toEqual('uk2-negative-movement');
    expect(component.colorTheme).toEqual('uk2-value-movement-type-positive');
  });

  it('should change to decrease negative state', () => {
    component.setImageColor(Uk2ValueMovementTypeEnum.decreaseNegative);

    expect(component.svgIconName).toEqual('uk2-negative-movement');
    expect(component.colorTheme).toEqual('uk2-value-movement-type-negative');
  });

  it('should change to none state', () => {
    component.setImageColor(Uk2ValueMovementTypeEnum.none);

    expect(component.svgIconName).toEqual('uk2-neutral-movement');
    expect(component.colorTheme).toEqual('uk2-value-movement-type-neutral');
  });

  describe('[calculateTruncSuffix]', () => {
    it('should return amount as 0, suffix as "" and stringedAmount as "0" when called with parameter value as 0', () => {
      const { suffix, amount, stringedAmount } = component.calculateTruncSuffix(0);
      expect(suffix).toBe('');
      expect(amount).toBe(0);
      expect(stringedAmount).toBe('$0.00');
    });
    it('should return higher order suffix when current truncation happens to be equal to 1,000.00K', () => {
      const { suffix, stringedAmount } = component.calculateTruncSuffix(999_999);
      expect(suffix).toBe('M');
      expect(stringedAmount).toBe('$1.00');
    });
    it('should return values without throwing error for value higher than -1 and lower than 0', () => {
      const result = component.calculateTruncSuffix(-0.99);
      expect(result.amount).toBe(-0.99);
      expect(result.stringedAmount).toBe('-$0.99');
      expect(result.suffix).toBe('');
    });
    it('should return values without throwing error for zero', () => {
      const result = component.calculateTruncSuffix(0);
      expect(result.amount).toBe(0);
      expect(result.stringedAmount).toBe('$0.00');
      expect(result.suffix).toBe('');
    });
    it('should return values without throwing error for value lower than 1 and higher than 0', () => {
      const result = component.calculateTruncSuffix(0.755);
      expect(result.amount).toBe(0.755);
      expect(result.stringedAmount).toBe('$0.76');
      expect(result.suffix).toBe('');
    });
    it('should not throw error if the number has to many decimal numbers', () => {
      const result = component.calculateTruncSuffix(1.11111111111);
      expect(result.amount).toBe(1.11111111111);
      expect(result.stringedAmount).toBe('$1.11');
      expect(result.suffix).toBe('');
    });
  });

  it('should detect ngOnChanges from valueMovementType', () => {
    component.uk2IsLoading = false;
    component.description = 'Some value';
    component.setImageColor(Uk2ValueMovementTypeEnum.none);
    component.ngOnChanges({
      valueMovementType: new SimpleChange(
        Uk2ValueMovementTypeEnum.none,
        Uk2ValueMovementTypeEnum.decreaseNegative,
        true
      ),
    });
    fixture.detectChanges();

    expect(component.svgIconName).toEqual('uk2-negative-movement');
    expect(component.colorTheme).toEqual('uk2-value-movement-type-negative');
  });

  it('should display empty state for Amount when isEmpty property is true', () => {
    component.amount = 0;
    component.uk2IsLoading = false;
    component.description = 'Some value';
    component.isEmpty = true;
    component.svgIconName = fakeIconName;
    component.setImageColor(Uk2ValueMovementTypeEnum.none);

    component.ngOnChanges({
      amount: new SimpleChange(0, 0, true),
      isEmpty: new SimpleChange(false, true, true),
    });

    fixture.detectChanges();
    const htmlComponent = fixture.nativeElement;
    const emptyAmount = htmlComponent.querySelector('.uk2-value-movement-amount-wrap').textContent;
    expect(emptyAmount).toContain('$--');
  });

  it('should display empty state for percentage when isEmpty property is true', () => {
    component.percentage = 0;
    component.uk2IsLoading = false;
    component.description = 'Some value';
    component.isEmpty = true;
    component.svgIconName = fakeIconName;
    component.setImageColor(Uk2ValueMovementTypeEnum.none);

    component.ngOnChanges({
      percentage: new SimpleChange(0, 0, true),
      isEmpty: new SimpleChange(false, true, true),
    });

    fixture.detectChanges();
    const htmlComponent = fixture.nativeElement;
    const emptyPercentage = htmlComponent.querySelector('.uk2-value-movement-percentage-wrap').textContent;
    expect(emptyPercentage).toContain('--%');
  });

  it('should display zero dollars when Amount property is 0 and Amount was provided', () => {
    component.amount = 0;
    component.uk2IsLoading = false;
    component.description = 'Some value';
    component.isEmpty = false;
    component.svgIconName = fakeIconName;
    component.setImageColor(Uk2ValueMovementTypeEnum.none);

    component.ngOnChanges({
      amount: new SimpleChange(0, 0, true),
      isEmpty: new SimpleChange(false, false, true),
    });

    fixture.detectChanges();
    const htmlComponent = fixture.nativeElement;
    const emptyAmount = htmlComponent.querySelector('.uk2-value-movement-amount-wrap').textContent;
    expect(emptyAmount).toBe('$0.00');
  });

  it('should not display empty state when percentage property is 0 and percentage was provided', () => {
    component.percentage = 0;
    component.uk2IsLoading = false;
    component.description = 'Some value';
    component.isEmpty = false;
    component.isIconOnly = false;
    component.svgIconName = fakeIconName;
    component.setImageColor(Uk2ValueMovementTypeEnum.none);

    component.ngOnChanges({
      isEmpty: new SimpleChange(false, true, true),
      percentage: new SimpleChange(0, 0, true),
    });

    fixture.detectChanges();
    const htmlComponent = fixture.nativeElement;
    const emptyPercentage = htmlComponent.querySelector('.uk2-value-movement-percentage-wrap').textContent;
    expect(emptyPercentage).toBe('0.00%');
  });

  it('should handle the resize event', () => {
    spyOn(component, 'onResize');
    window.dispatchEvent(new Event('resize'));
    expect(component.onResize).toHaveBeenCalled();
  });

  it('should handle the resize event and call truncateElements method', fakeAsync(() => {
    spyOn(component, 'truncateElements').and.callThrough();
    window.dispatchEvent(new Event('resize'));
    tick(300);
    expect(component.truncateElements).toHaveBeenCalled();
  }));

  it('should call changeDetectionRef.detectChanges when calling truncateElements and truncation is performed', () => {
    spyOn(component['changeDetector'], 'detectChanges');
    component.amount = 1200000;
    component.percentage = 5000;
    component.description = 'Some description a little bit long';
    component.isEmpty = false;
    component.isIconOnly = false;
    component.uk2IsLoading = false;
    component['elementRef'].nativeElement.style.width = '100px';

    component.ngOnChanges({
      amount: new SimpleChange(0, 1200000, true),
      percentage: new SimpleChange(0, 5000, true),
    });
    fixture.detectChanges();

    component.truncateElements();

    expect(component['changeDetector'].detectChanges).toHaveBeenCalled();
  });

  it('should truncate everything', () => {
    spyOn(component, 'printAmountPercentage');
    spyOn(component, 'toggleDescriptionTruncation');

    component.amount = 1200000;
    component.percentage = 5000;
    component.description = 'Some description a little bit long';
    component.isEmpty = false;
    component.isIconOnly = false;
    component.uk2IsLoading = false;

    component['elementRef'].nativeElement.style.width = '100px';

    component.ngOnChanges({
      amount: new SimpleChange(0, 1200000, true),
      percentage: new SimpleChange(0, 5000, true),
    });

    component.truncateElements();

    fixture.detectChanges();

    const htmlComponent = fixture.nativeElement;
    const amountContent = htmlComponent.querySelector('.uk2-value-movement-amount-wrap').textContent;
    const percentageContent = htmlComponent.querySelector('.uk2-value-movement-percentage-wrap').textContent;
    const descriptionClassContained = htmlComponent
      .querySelector('.uk2-value-movement-description')
      .classList.contains('uk2-value-movement-text-overflow');
    expect(component.printAmountPercentage).toHaveBeenCalled();
    expect(component.toggleDescriptionTruncation).toHaveBeenCalled();
    expect(amountContent).toBe('$1.20M');
    expect(percentageContent).toBe('(5.00K%)');
    expect(descriptionClassContained).toBeTrue();
  });

  it('should call toggleDescriptionTruncation method and add uk2-value-movement-text-overflow class', () => {
    spyOn(component, 'toggleDescriptionTruncation').and.callThrough();
    const container = component.containerRef!;
    const className = 'uk2-value-movement-text-overflow';
    component.toggleDescriptionTruncation(container, false);

    const containerClasses = container.nativeElement.classList;
    expect(containerClasses.contains(className)).toBeTrue();
  });

  it('should truncate amount', () => {
    const zero = component.truncateValue(0, Uk2ValueMovementTypeValueEnum.amount);
    expect(zero).toBe('$0.00');
    const noTruncate = component.truncateValue(100, Uk2ValueMovementTypeValueEnum.amount);
    expect(noTruncate).toBe('$100.00');
    expect(component.amountSuffix).toBe('');
    const truncateThousand = component.truncateValue(1000, Uk2ValueMovementTypeValueEnum.amount);
    expect(truncateThousand).toBe('$1.00');
    expect(component.amountSuffix).toBe('K');
    const truncateMillion = component.truncateValue(1000000, Uk2ValueMovementTypeValueEnum.amount);
    expect(truncateMillion).toBe('$1.00');
    expect(component.amountSuffix).toBe('M');
    const truncateBillion = component.truncateValue(1000000000, Uk2ValueMovementTypeValueEnum.amount);
    expect(truncateBillion).toBe('$1.00');
    expect(component.amountSuffix).toBe('B');
  });

  it('should return empty string when calling [getAmount] with falsy value as first parameter', () => {
    const result = component.getAmount(null as unknown as number);
    expect(result).toBe('');
  });

  it('should truncate percentage', () => {
    const noTruncate = component.truncateValue(100, Uk2ValueMovementTypeValueEnum.percentage);
    expect(noTruncate).toBe('100.00');
    expect(component.percentageSuffix).toBe('%');
    const truncateThousand = component.truncateValue(1000, Uk2ValueMovementTypeValueEnum.percentage);
    expect(truncateThousand).toBe('100.00');
    expect(component.percentageSuffix).toBe('K%');
    const truncateMillion = component.truncateValue(1000000, Uk2ValueMovementTypeValueEnum.percentage);
    expect(truncateMillion).toBe('100.00');
    expect(component.percentageSuffix).toBe('M%');
    const truncateBillion = component.truncateValue(1000000000, Uk2ValueMovementTypeValueEnum.percentage);
    expect(truncateBillion).toBe('100.00');
    expect(component.percentageSuffix).toBe('B%');
  });

  it('It should display <0.01% when percentage property is less than 0.01', () => {
    component.percentage = 0.00001;
    component.uk2IsLoading = false;
    component.description = 'Some value';
    component.isEmpty = false;
    component.isIconOnly = false;
    component.svgIconName = fakeIconName;
    component.setImageColor(Uk2ValueMovementTypeEnum.none);

    component.ngOnChanges({
      isEmpty: new SimpleChange(false, true, true),
      percentage: new SimpleChange(0, 0.00001, true),
    });
    fixture.detectChanges();

    const htmlComponent = fixture.nativeElement;
    const emptyPercentage = htmlComponent.querySelector('.uk2-value-movement-percentage-wrap').textContent;
    expect(emptyPercentage).toBe('<0.01%');
  });
});
