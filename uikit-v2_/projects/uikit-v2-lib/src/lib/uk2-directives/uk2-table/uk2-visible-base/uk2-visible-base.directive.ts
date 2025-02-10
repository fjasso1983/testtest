import { AfterViewInit, Directive, ElementRef, HostListener, inject } from '@angular/core';
import { Uk2VisibilityStrategy } from './interfaces';

@Directive()
export abstract class Uk2VisibleBaseDirective implements AfterViewInit {
  uk2IsHovered = false;
  protected visibilityStrategy: Uk2VisibilityStrategy<Uk2VisibleBaseDirective>;
  protected elementRef = inject(ElementRef);
  protected nativeElement = this.elementRef.nativeElement;
  constructor(visibilityStrategy: Uk2VisibilityStrategy<Uk2VisibleBaseDirective>) {
    this.visibilityStrategy = visibilityStrategy;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.uk2IsHovered = true;
    this.processVisibilityOfTargetElement();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.uk2IsHovered = false;
    this.processVisibilityOfTargetElement();
  }

  get elementRefNativeElement() {
    return this.nativeElement;
  }

  ngAfterViewInit(): void {
    this.subscribeCheckboxChanges();
    const checkbox = this.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
    if (checkbox) {
      this.processVisibilityOfTargetElement();
    }
  }

  protected processVisibilityOfTargetElement() {
    this.visibilityStrategy.processVisibility(this);
  }

  private subscribeCheckboxChanges() {
    const checkbox = this.nativeElement.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        this.processVisibilityOfTargetElement();
      });
    }
  }
}
