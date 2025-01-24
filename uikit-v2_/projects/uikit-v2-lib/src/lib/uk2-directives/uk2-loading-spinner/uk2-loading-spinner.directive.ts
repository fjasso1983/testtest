import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: 'mat-spinner[uk2LoadingSpinner]:not([color])',
})
export class Uk2LoadingSpinnerDirective implements OnInit, OnChanges {
  @Input() uk2Diameter = 32;
  @Input() uk2StrokeWidth = 4;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private matSpinnerDirective: MatProgressSpinner
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'uk2-loading-spinner');
    this.overrideMaterialValues();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.uk2Diameter || changes.uk2StrokeWidth) this.overrideMaterialValues();
  }

  private overrideMaterialValues() {
    this.matSpinnerDirective.diameter = this.uk2Diameter;
    this.matSpinnerDirective.strokeWidth = this.uk2StrokeWidth;
  }
}
