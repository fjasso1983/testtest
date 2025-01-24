import { ElementRef } from '@angular/core';
import { Uk2LoadingSkeletonDirective } from './uk2-loading-skeleton.directive';
import { UK2_LOADING_SKELETON_STYLE_CLASS } from './utils';
import { Uk2LoadingSkeleton, Uk2LoadingSkeletonChanges, Uk2LoadingSkeletonSimpleChange, Uk2LoadingSkeletonSize } from './types';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

describe('Uk2LoadingSkeletonDirective', () => {
  let uk2LoadingSkeleton:Uk2LoadingSkeletonDirective;
  let hostElementRef: ElementRef<HTMLElement>;
  beforeEach(() => {
    const hostElementNode = document.createElement('div');
    hostElementRef = new ElementRef(hostElementNode);
    uk2LoadingSkeleton = new Uk2LoadingSkeletonDirective(hostElementRef);
  });

  it('should create an instance', () => {
    expect(uk2LoadingSkeleton).toBeDefined();
  });

  describe('initial [Uk2LoadingSkeletonDirective] state', () => {
    it('should have width and height properties of [hasMemoizedWidthAndHeight] as false by default', () => {
      expect(uk2LoadingSkeleton.hasMemoizedWidthAndHeight.memoizedHeight).toBeFalse();
      expect(uk2LoadingSkeleton.hasMemoizedWidthAndHeight.memoizedWidth).toBeFalse();
    });

    it('should uk2IsLoading be set as false by default', () => {
      expect(uk2LoadingSkeleton.uk2IsLoading).toBeFalse();
    });

    it('should have width set as "auto" by default', () => {
      expect(uk2LoadingSkeleton.uk2LoadingWidth).toBe(undefined);
    });

    it('should have height set as "auto" by default', () => {
      expect(uk2LoadingSkeleton.uk2LoadingHeight).toBe(undefined);
    });
  });

  describe('[setLoadingState]', () => {
    it('should set class [UK2_LOADING_SKELETON_STYLE_CLASS.LOADING] on ElementRef.nativeElement when setAsLoading parameter is set to true', () => {
      uk2LoadingSkeleton.setLoadingState(true, true);
      const containsRequiredClass = uk2LoadingSkeleton['hostElement'].nativeElement.classList.contains(UK2_LOADING_SKELETON_STYLE_CLASS.LOADING);
      expect(containsRequiredClass).toBeTrue();
    });
    it('should return a boolean to match the presence of the [UK2_LOADING_SKELETON_STYLE_CLASS.LOADING] on dom element, when calling [hasSkeletonClass]', () => {
      uk2LoadingSkeleton.setLoadingState(true, true);
      const containsRequiredClass = uk2LoadingSkeleton['hostElement'].nativeElement.classList.contains(UK2_LOADING_SKELETON_STYLE_CLASS.LOADING);
      expect(containsRequiredClass).toBe(uk2LoadingSkeleton.hasSkeletonClass());
    });
    it('should update height on ElementRef.nativeElement to input [height] when setAsLoading and requiredMemoizedSizeChecking are passed as true when memoized sizes are present', () => {
      uk2LoadingSkeleton.hasMemoizedWidthAndHeight.memoizedHeight = true;
      uk2LoadingSkeleton.uk2LoadingHeight = 15;
      uk2LoadingSkeleton.setLoadingState(true, true);
      const elementHeight = uk2LoadingSkeleton['hostElement'].nativeElement.style.height;
      expect(elementHeight).toBe('15px');
    });
    it('should update width on ElementRef.nativeElement to input [width] when setAsLoading and requiredMemoizedSizeChecking are passed as true when memoized sizes are present', () => {
      uk2LoadingSkeleton.hasMemoizedWidthAndHeight.memoizedWidth = true;
      uk2LoadingSkeleton.uk2LoadingWidth = 45;
      uk2LoadingSkeleton.setLoadingState(true, true);
      const elementHeight = uk2LoadingSkeleton['hostElement'].nativeElement.style.width;
      expect(elementHeight).toBe('45px');
    });
    it('should remove class [UK2_LOADING_SKELETON_STYLE_CLASS.LOADING] on ElementRef.nativeElement when setAsLoading parameter is set to false', () => {
      uk2LoadingSkeleton.setLoadingState(false, false);
      const containsRequiredClass = uk2LoadingSkeleton['hostElement'].nativeElement.classList.contains(UK2_LOADING_SKELETON_STYLE_CLASS.LOADING);
      expect(containsRequiredClass).toBeFalse();
    });
  });

  it('should update elementRef.nativeElement height and set hasMemoizedWidthAndHeight.memoizedHeight to true', () => {
    uk2LoadingSkeleton.updateSkeletonHeight(20);
    const height = uk2LoadingSkeleton['hostElement'].nativeElement.style.height;
    expect(height).toBe('20px');
    expect(uk2LoadingSkeleton.hasMemoizedWidthAndHeight.memoizedHeight).toBeTrue();
  });

  it('should update elementRef.nativeElement width and set hasMemoizedWidthAndWidth.memoizedHeight to true', () => {
    uk2LoadingSkeleton.updateSkeletonWidth(20);
    const width = uk2LoadingSkeleton['hostElement'].nativeElement.style.width;
    expect(width).toBe('20px');
    expect(uk2LoadingSkeleton.hasMemoizedWidthAndHeight.memoizedWidth).toBeTrue();
  });

  describe('[ngOnChange]', () => {
    const changes: Uk2LoadingSkeletonChanges<Uk2LoadingSkeleton & IUk2IsLoading> = {
      uk2IsLoading: {
        previousValue: false,
        currentValue: true
      } as Uk2LoadingSkeletonSimpleChange<boolean>,
      uk2LoadingHeight: {
        previousValue: 'auto',
        currentValue: 10,
      } as Uk2LoadingSkeletonSimpleChange<Uk2LoadingSkeletonSize>,
      uk2LoadingWidth: {
        previousValue: 'auto',
        currentValue: 40,
      } as Uk2LoadingSkeletonSimpleChange<Uk2LoadingSkeletonSize>
    }
    it('should toggle loading state to true when uk2IsLoading input is changed calling [setLoadingState]', () => {
      spyOn(uk2LoadingSkeleton, 'setLoadingState');
      uk2LoadingSkeleton.uk2IsLoading = changes.uk2IsLoading?.currentValue!;
      uk2LoadingSkeleton.ngOnChanges(changes);
      expect(uk2LoadingSkeleton.setLoadingState).toHaveBeenCalled();
    });
    it('should update skeleton height by calling [updateSkeletonHeight]', () => {
      spyOn(uk2LoadingSkeleton, 'updateSkeletonHeight');
      uk2LoadingSkeleton.uk2LoadingHeight = changes.uk2LoadingHeight?.currentValue;
      uk2LoadingSkeleton.ngOnChanges(changes);
      expect(uk2LoadingSkeleton.updateSkeletonHeight).toHaveBeenCalled();
    });
    it('should update skeleton width by calling [updateSkeletonWidth]', () => {
      spyOn(uk2LoadingSkeleton, 'updateSkeletonWidth');
      uk2LoadingSkeleton.uk2LoadingWidth = changes.uk2LoadingWidth?.currentValue;
      uk2LoadingSkeleton.ngOnChanges(changes);
      expect(uk2LoadingSkeleton.updateSkeletonWidth).toHaveBeenCalled();
    });
    it('should update skeleton width with current value stored by calling [updateSkeletonWidth] when calling ngOnChanges with falsy width changes', () => {
      spyOn(uk2LoadingSkeleton, 'updateSkeletonWidth');
      uk2LoadingSkeleton.uk2LoadingWidth = changes.uk2LoadingWidth?.currentValue;
      const falsyWidthChanges: Uk2LoadingSkeletonChanges<Uk2LoadingSkeleton & IUk2IsLoading> = {
        uk2LoadingHeight: {
          previousValue: 'auto',
          currentValue: 10,
        } as Uk2LoadingSkeletonSimpleChange<Uk2LoadingSkeletonSize>,
      }
      uk2LoadingSkeleton.ngOnChanges(falsyWidthChanges);
      expect(uk2LoadingSkeleton.updateSkeletonWidth).not.toHaveBeenCalled();
    });
    it('should update skeleton height with current value stored by calling [updateSkeletonHeight] when calling ngOnChanges with falsy height changes', () => {
      spyOn(uk2LoadingSkeleton, 'updateSkeletonHeight');
      uk2LoadingSkeleton.uk2LoadingHeight = changes.uk2LoadingHeight?.currentValue;
      const falsyHeightChanges: Uk2LoadingSkeletonChanges<Uk2LoadingSkeleton & IUk2IsLoading> = {
        uk2LoadingWidth: {
          previousValue: 'auto',
          currentValue: 10,
        } as Uk2LoadingSkeletonSimpleChange<Uk2LoadingSkeletonSize>,
      }
      uk2LoadingSkeleton.ngOnChanges(falsyHeightChanges);
      expect(uk2LoadingSkeleton.updateSkeletonHeight).not.toHaveBeenCalled();
    });
  });

});
