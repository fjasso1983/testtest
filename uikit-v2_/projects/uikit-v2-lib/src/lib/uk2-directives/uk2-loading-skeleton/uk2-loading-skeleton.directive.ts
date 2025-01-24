import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2LoadingSkeleton, Uk2LoadingSkeletonChanges, Uk2LoadingSkeletonSize } from './types';
import { UK2_LOADING_SKELETON_STYLE_CLASS } from './utils';

@Directive({
  selector: '[uk2LoadingSkeleton]',
})
export class Uk2LoadingSkeletonDirective implements Uk2LoadingSkeleton, IUk2IsLoading, OnChanges {
  readonly hasMemoizedWidthAndHeight: { memoizedHeight: boolean; memoizedWidth: boolean } = {
    memoizedHeight: false,
    memoizedWidth: false,
  };
  @Input() uk2IsLoading = false;
  @Input() uk2LoadingWidth: Uk2LoadingSkeletonSize = undefined;
  @Input() uk2LoadingHeight: Uk2LoadingSkeletonSize = undefined;
  constructor(private readonly hostElement: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: Uk2LoadingSkeletonChanges<Uk2LoadingSkeleton & IUk2IsLoading>): void {
    this.checkLoadingChanges(changes);
    this.checkHeightChanges(changes);
    this.checkWidthChanges(changes);
  }

  checkLoadingChanges(changes: Uk2LoadingSkeletonChanges<Uk2LoadingSkeleton & IUk2IsLoading>): void {
    if (changes.uk2IsLoading?.previousValue !== changes.uk2IsLoading?.currentValue) {
      const requiresSizeCheck = !(changes?.uk2LoadingHeight && changes?.uk2LoadingWidth);
      this.setLoadingState(changes.uk2IsLoading?.currentValue!, requiresSizeCheck);
    }
  }

  checkHeightChanges(changes: Uk2LoadingSkeletonChanges<Uk2LoadingSkeleton & IUk2IsLoading>): void {
    if (
      (changes?.uk2LoadingHeight?.currentValue || this.uk2LoadingHeight) &&
      (changes.uk2IsLoading?.currentValue || this.uk2IsLoading)
    ) {
      this.updateSkeletonHeight(changes?.uk2LoadingHeight?.currentValue || this.uk2LoadingHeight);
    }
  }

  checkWidthChanges(changes: Uk2LoadingSkeletonChanges<Uk2LoadingSkeleton & IUk2IsLoading>): void {
    if (
      (changes?.uk2LoadingWidth?.currentValue || this.uk2LoadingWidth) &&
      (changes.uk2IsLoading?.currentValue || this.uk2IsLoading)
    ) {
      this.updateSkeletonWidth(changes?.uk2LoadingWidth?.currentValue || this.uk2LoadingWidth);
    }
  }

  setLoadingState(setAsLoading: boolean, requiredMemoizedSizeChecking: boolean): void {
    if (setAsLoading) {
      this.setAsLoading();
      if (requiredMemoizedSizeChecking) {
        if (this.hasMemoizedWidthAndHeight.memoizedHeight) {
          this.updateSkeletonHeight(this.uk2LoadingHeight);
        }
        if (this.hasMemoizedWidthAndHeight.memoizedWidth) {
          this.updateSkeletonWidth(this.uk2LoadingWidth);
        }
      }

      return;
    }
    this.setAsLoaded();
    this.removeSkeletonHeight();
    this.removeSkeletonWidth();
  }

  updateSkeletonHeight(newHeight: Uk2LoadingSkeletonSize): void {
    if (newHeight && this.hostElement.nativeElement) {
      this.hostElement.nativeElement.style.height = typeof newHeight === 'number' ? `${newHeight}px` : newHeight;
      this.hasMemoizedWidthAndHeight.memoizedHeight = true;
    }
  }

  removeSkeletonWidth(): void {
    if (this.hostElement.nativeElement) {
      this.hostElement.nativeElement.style.removeProperty('width');
    }
  }

  removeSkeletonHeight(): void {
    if (this.hostElement.nativeElement) {
      this.hostElement.nativeElement.style.removeProperty('height');
    }
  }

  updateSkeletonWidth(newWidth: Uk2LoadingSkeletonSize): void {
    if (newWidth && this.hostElement.nativeElement) {
      this.hostElement.nativeElement.style.width = typeof newWidth === 'number' ? `${newWidth}px` : newWidth;
      this.hasMemoizedWidthAndHeight.memoizedWidth = true;
    }
  }

  hasSkeletonClass(): boolean {
    return this.hostElement.nativeElement.classList.contains(UK2_LOADING_SKELETON_STYLE_CLASS.LOADING);
  }

  setAsLoading(): void {
    if (this.hostElement.nativeElement) {
      this.hostElement.nativeElement.classList.add(UK2_LOADING_SKELETON_STYLE_CLASS.LOADING);
    }
  }

  setAsLoaded(): void {
    if (this.hostElement.nativeElement) {
      this.hostElement.nativeElement.classList.remove(UK2_LOADING_SKELETON_STYLE_CLASS.LOADING);
    }
  }
}
