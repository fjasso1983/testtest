import {
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  inject,
  Renderer2,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { IUk2IsLoading, Uk2BaseFilterChipComponent } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[uk2FilterBar]',
  exportAs: 'uk2FilterBar',
})
export class Uk2FilterBarDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2RelatedContainer?: HTMLElement;
  @Input() uk2IsLoading = false;
  @ContentChildren(Uk2BaseFilterChipComponent, { descendants: true }) uk2FilterChips!: QueryList<
    Uk2BaseFilterChipComponent<any>
  >;
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private nativeElement = this.elementRef.nativeElement as HTMLElement;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.createSkeleton();
    this.nativeElement.classList.add('uk2-filter-bar');

    if (this.uk2RelatedContainer) {
      fromEvent(this.uk2RelatedContainer, 'mouseover')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.elementRef.nativeElement.classList.add('uk2-filter-bar-hovered');
        });
      fromEvent(this.uk2RelatedContainer, 'mouseout')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.elementRef.nativeElement.classList.remove('uk2-filter-bar-hovered');
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { uk2IsLoading } = changes;

    if (uk2IsLoading) {
      this.handleSkeletonVisibility();
    }
  }

  createSkeleton() {
    const skeletonEL = this.renderer.createElement('div');
    for (let index = 0; index < 4; index++) {
      const skeletonChip = this.renderer.createElement('div');
      this.renderer.addClass(skeletonChip, 'uk2-filter-bar-skeleton-chip');
      this.renderer.appendChild(skeletonEL, skeletonChip);
    }
    this.renderer.addClass(skeletonEL, 'uk2-filter-bar-skeleton');
    this.renderer.appendChild(this.nativeElement, skeletonEL);
    this.handleSkeletonVisibility();
  }

  clearFilters() {
    this.uk2FilterChips.forEach(chip => {
      chip.clearValue();
    });
  }

  private handleSkeletonVisibility() {
    if (this.uk2IsLoading) {
      this.uk2FilterChips?.forEach(uk2FilterChip => uk2FilterChip.closeOverlay());
      this.nativeElement.classList.add('uk2-filter-bar-skeleton-visible');
    } else {
      this.nativeElement.classList.remove('uk2-filter-bar-skeleton-visible');
    }
  }
}
