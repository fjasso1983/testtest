import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Component({
  selector: 'uk2-color-bar',
  templateUrl: './uk2-color-bar.component.html',
})
export class Uk2ColorBarComponent implements IUk2IsLoading, OnChanges, OnInit {
  @ViewChild('uk2ColorBar', { static: true }) colorBar!: ElementRef<HTMLDivElement>;
  @Input() uk2IsLoading = false;
  /**
   * defines if any css extra classes that will be applied to the
   * component this class must be global for css rules to apply to the element
   */
  @Input() uk2ClassName = '';
  @Input() uk2BackgroundColor = '--uk2-brand-top-bar-color-bar-color';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.uk2BackgroundColor && changes.uk2BackgroundColor.currentValue) {
      this.handleColorBarColorChange(changes.uk2BackgroundColor.currentValue);
    }
    if (changes.uk2IsLoading && changes.uk2IsLoading.currentValue) {
      this.handleColorBarColorChange(this.uk2BackgroundColor);
    }
  }

  ngOnInit(): void {
    this.handleColorBarColorChange(this.uk2BackgroundColor);
  }

  handleColorBarColorChange(backgroundColor: string): void {
    if (this.uk2IsLoading) {
      this.colorBar.nativeElement.style.removeProperty('background');
    } else {
      this.colorBar.nativeElement.style.background = this.defineColorBarColor(backgroundColor);
    }
  }

  private defineColorBarColor(color: string): string {
    let colorValue = color;
    if (this.isVariableNameColor(color)) {
      colorValue = `var(${color})`;
    }

    return colorValue;
  }

  private isVariableNameColor(color: string): boolean {
    return color.startsWith('--');
  }
}
