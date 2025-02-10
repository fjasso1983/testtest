import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2CurrencyDirective } from './uk2-currency.directive';
import { CurrencyPipe } from '@angular/common';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <p
      uk2Currency
      [amount]="amount"
      [currencySymbol]="currencySymbol"
      [showCurrencySymbol]="showCurrencySymbol"
      [truncate]="truncate"
      [digitsInfo]="digitsInfo"
    ></p>
  `,
})
class TestComponent {
  amount = 1000.123;
  currencySymbol = 'USD';
  showCurrencySymbol = true;
  truncate = true;
  digitsInfo = '1.2-2';
}

describe('Uk2CurrencyDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let pDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2CurrencyDirective],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [CurrencyPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    pDebugElement = fixture.debugElement.query(By.css('p'));
  });

  it('should format the amount with currency symbol', () => {
    fixture.detectChanges();
    expect(pDebugElement.nativeElement.innerText).toContain('$1,000.12');
  });

  it('should format the amount without currency symbol', () => {
    component.showCurrencySymbol = false;
    fixture.detectChanges();
    expect(pDebugElement.nativeElement.innerText).toContain('1,000.12');
  });

  it('should truncate the amount when necessary', () => {
    component.amount = 123456789;
    fixture.detectChanges();
    // Simulate insufficient width for truncation
    pDebugElement.nativeElement.style.width = '50px';
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(pDebugElement.nativeElement.innerText).toContain('$123.46M');
  });

  it('should not truncate the amount when truncate is false', () => {
    component.truncate = false;
    component.amount = 123456789;
    fixture.detectChanges();
    expect(pDebugElement.nativeElement.innerText).toContain('$123,456,789.00');
  });

  it('should reformat on window resize', () => {
    spyOn(pDebugElement.injector.get(Uk2CurrencyDirective), 'applyFormatting' as never).and.callThrough();
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(pDebugElement.injector.get(Uk2CurrencyDirective)['applyFormatting']).toHaveBeenCalled();
  });

  it('should handle small amounts correctly', () => {
    component.amount = 0.123;
    fixture.detectChanges();
    expect(pDebugElement.nativeElement.innerText).toContain('$0.12');
  });

  it('should handle large amounts correctly', () => {
    component.amount = 123456789012345;
    fixture.detectChanges();
    // Simulate insufficient width for truncation
    pDebugElement.nativeElement.style.width = '50px';
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(pDebugElement.nativeElement.innerText).toContain('$123,456.79B');
  });

  it('should apply digitsInfo correctly', () => {
    component.digitsInfo = '1.3-3';
    fixture.detectChanges();
    expect(pDebugElement.nativeElement.innerText).toContain('$1,000.123');
  });

  it('should return null if digitsInfo is invalid', () => {
    component.digitsInfo = '1.3-1';
    fixture.detectChanges();
    expect(pDebugElement.nativeElement.innerText).toBe('');
  });

  it('should handle amounts between -1 and 1 correctly', () => {
    component.amount = 0;
    fixture.detectChanges();
    // Simulate insufficient width for truncation
    pDebugElement.nativeElement.style.width = '1px';
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(pDebugElement.nativeElement.innerText).toContain('$0.00');
  });

  it('should handle parsedFromPipe and validOrderOfMagnitude correctly', () => {
    component.amount = 999999;
    fixture.detectChanges();
    // Simulate insufficient width for truncation
    pDebugElement.nativeElement.style.width = '50px';
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(pDebugElement.nativeElement.innerText).toContain('$1.00M');
  });
});
