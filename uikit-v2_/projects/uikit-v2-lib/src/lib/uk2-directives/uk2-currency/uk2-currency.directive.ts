import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnInit } from '@angular/core';

@Directive({
  selector: '[uk2Currency]',
})
export class Uk2CurrencyDirective implements OnInit, OnChanges, AfterViewInit {
  @Input() amount = 0;
  @Input() currencySymbol? = 'USD';
  @Input() showCurrencySymbol? = true;
  @Input() truncate? = true;
  @Input() digitsInfo? = '1.2-2';

  constructor(private el: ElementRef<HTMLElement>, private currencyPipe: CurrencyPipe) {}

  @HostListener('window:resize')
  onResize() {
    this.applyFormatting();
  }

  ngOnInit(): void {
    this.applyFormatting();
  }

  ngOnChanges(): void {
    this.applyFormatting();
  }

  ngAfterViewInit(): void {
    this.applyFormatting();
  }

  private applyFormatting(): void {
    let formattedAmount = this.transformToCurrency(this.amount);

    this.el.nativeElement.innerText = formattedAmount!;

    if (this.truncate && this.el.nativeElement.clientWidth < this.el.nativeElement.scrollWidth) {
      this.applyTruncation();
    } else {
      this.el.nativeElement.innerText = formattedAmount!;
    }
  }

  private applyTruncation(): void {
    const truncResult = this.calculateTruncSuffix(this.amount);
    let formattedAmount = truncResult.stringedAmount + truncResult.suffix;

    this.el.nativeElement.innerText = formattedAmount;
  }

  private calculateTruncSuffix(number: number): any {
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
        stringedAmount: this.transformToCurrency(number),
      };
    }

    const magnitude = Math.log10(Math.abs(number));
    const orderOfMagnitude = Math.floor(magnitude / 3);
    const validOrderOfMagnitude = Math.min(orderOfMagnitude, 3);
    const amountDividedBySuffix = number / suffixList[validOrderOfMagnitude].divisor;
    const pipeAmountResult = this.transformToCurrency(amountDividedBySuffix);
    const parsedFromPipe = Number.parseFloat(pipeAmountResult!.replace(/[$,]/g, ''));
    if (parsedFromPipe >= suffixList[1].divisor && validOrderOfMagnitude <= suffixList.length - 2) {
      return {
        amount: amountDividedBySuffix,
        suffix: suffixList[validOrderOfMagnitude + 1].suffix,
        stringedAmount: this.transformToCurrency(parsedFromPipe / suffixList[1].divisor),
      };
    }

    return {
      amount: amountDividedBySuffix,
      suffix: suffixList[validOrderOfMagnitude].suffix,
      stringedAmount: pipeAmountResult!,
    };
  }

  private transformToCurrency(value: number): string | null {
    try {
      if (this.showCurrencySymbol)
        return this.currencyPipe.transform(value, this.currencySymbol, 'symbol', this.digitsInfo);

      return this.currencyPipe.transform(value, '', '', this.digitsInfo);
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}
