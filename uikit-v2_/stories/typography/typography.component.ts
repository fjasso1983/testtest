import { AfterViewInit, Component, ElementRef, ViewChildren } from '@angular/core';

@Component({
  selector: 'storybook-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'],
})
export class TypographyComponent implements AfterViewInit {
  @ViewChildren('displayTexts') displayTexts: any;
  @ViewChildren('bodyTexts') bodyTexts: any;
  fontWeights = ['light', 'regular', 'medium', 'bold'];
  fontNumbers = ['25', '50', '75', '100', '200', '300', '400', '500', '600', '700', '800'];
  displayFontVariants = ['default'];
  bodyFontVariants = ['default', 'italic', 'underline', 'italic-underline'];

  ngAfterViewInit(): void {
    this.displayTexts.forEach((element: ElementRef) => this.insertComputedStyles(element.nativeElement));
    this.bodyTexts.forEach((element: ElementRef) => this.insertComputedStyles(element.nativeElement));
  }

  getCssClass(type: 'body' | 'display', fontSize: string, fontVariant: string, fontValue: string): string {
    const variantText = `${fontVariant !== 'default' ? '-' + fontVariant : ''}`;

    return `uk2-font__${type}-${fontSize}${variantText}--${fontValue}`;
  }

  getComputedClasses(element: any): any {
    return window.getComputedStyle(element);
  }

  private insertComputedStyles(element: HTMLElement): void {
    const { fontFamily, fontSize, lineHeight, fontWeight, fontStyle, letterSpacing } = this.getComputedClasses(element);
    element.innerHTML = `<p style="font-size: 14px !important; line-height: initial !important; font-weight: initial !important;">
      <b style="font-family: Roboto, 'Helvetica Neue', sans-serif" !important">CSS VALUES:</b><br />
      font-family: ${fontFamily},
      <br />
      font-size: ${fontSize},
      <br />
      line-height: ${lineHeight},
      <br />
      font-weight: ${fontWeight},
      <br />
      font-style: ${fontStyle},
      <br />
      letter-spacing: ${letterSpacing},
    </p>`;
  }
}
