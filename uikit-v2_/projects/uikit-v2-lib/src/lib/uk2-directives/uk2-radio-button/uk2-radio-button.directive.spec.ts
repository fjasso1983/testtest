import { Renderer2, SimpleChanges } from '@angular/core';

import { Uk2RadioButtonDirective } from './uk2-radio-button.directive';
import { Uk2RadioButtonAlignmentEnum, Uk2RadioButtonSizeEnum } from './enums';

describe('Uk2RadioButtonDirective', () => {
  let directive: Uk2RadioButtonDirective;
  let nativeElMock: any;
  let elementRefMock: any;
  let rendererMock: Renderer2;

  beforeEach(() => {
    nativeElMock = {
      classList: {
        remove: jasmine.createSpy(),
        add: jasmine.createSpy(),
      },
      querySelector: jasmine.createSpy(),
    };
    elementRefMock = { nativeElement: nativeElMock };
    rendererMock = jasmine.createSpyObj(Renderer2, [
      'createElement',
      'insertBefore',
      'appendChild',
      'addClass',
      'removeClass',
      'parentNode',
    ]);
    directive = new Uk2RadioButtonDirective(elementRefMock, rendererMock);
  });

  describe('ngOnInit', () => {
    it('should add class uk2-radio-button', () => {
      const handleSkeletonSpy = spyOn(directive as any, 'handleSkeleton');

      directive.ngOnInit();

      expect(nativeElMock.classList.add).toHaveBeenCalledWith('uk2-radio-button');
      expect(handleSkeletonSpy).toHaveBeenCalled();
    });
  });

  describe('ngOnChanges', () => {
    it('should call handleSkeleton if simpleChanges include uk2IsLoading', () => {
      const simpleChanges = {
        uk2IsLoading: { currentValue: true, previousValue: false, firstChange: false },
      } as unknown as SimpleChanges;
      const handleSkeletonSpy = spyOn(directive as any, 'handleSkeleton');

      directive.ngOnChanges(simpleChanges);

      expect(handleSkeletonSpy).toHaveBeenCalled();
    });

    it('should call addDensityClass if simpleChanges include uk2Density', () => {
      const simpleChanges = {
        uk2RadioButtonSize: { currentValue: true, previousValue: false, firstChange: false },
      } as unknown as SimpleChanges;
      const addDensityClassSpy = spyOn(directive as any, 'addDensityClass');

      directive.ngOnChanges(simpleChanges);

      expect(addDensityClassSpy).toHaveBeenCalled();
    });

    it('should call addAlignmentClass if simpleChanges include uk2Alignment', () => {
      const simpleChanges = {
        uk2Alignment: { currentValue: true, previousValue: false, firstChange: false },
      } as unknown as SimpleChanges;
      const addAlignmentClassSpy = spyOn(directive as any, 'addAlignmentClass');

      directive.ngOnChanges(simpleChanges);

      expect(addAlignmentClassSpy).toHaveBeenCalled();
    });
  });

  describe('addDensityClass', () => {
    it('should reset density classes and set uk2-radio-button-size-small when uk2Density is small', () => {
      directive['uk2RadioButtonSize'] = Uk2RadioButtonSizeEnum.small;

      directive['addDensityClass']();

      const [firstRemoveCall, secondRemoveCall] = nativeElMock.classList.remove.calls.allArgs();
      expect(firstRemoveCall).toEqual(['uk2-radio-button-size-medium']);
      expect(secondRemoveCall).toEqual(['uk2-radio-button-size-small']);
      expect(nativeElMock.classList.add).toHaveBeenCalledWith('uk2-radio-button-size-small');
    });

    it('should reset density classes and set uk2-radio-button-size-medium when uk2Density is medium', () => {
      directive['uk2RadioButtonSize'] = Uk2RadioButtonSizeEnum.medium;

      directive['addDensityClass']();

      const [firstRemoveCall, secondRemoveCall] = nativeElMock.classList.remove.calls.allArgs();
      expect(firstRemoveCall).toEqual(['uk2-radio-button-size-medium']);
      expect(secondRemoveCall).toEqual(['uk2-radio-button-size-small']);
      expect(nativeElMock.classList.add).toHaveBeenCalledWith('uk2-radio-button-size-medium');
    });
  });

  describe('addAlignmentClass', () => {
    it('should reset align classes and set uk2-radio-button-alignment-left when uk2Alignment is left', () => {
      directive['uk2Alignment'] = Uk2RadioButtonAlignmentEnum.left;

      directive['addAlignmentClass']();

      const [firstRemoveCall, secondRemoveCall] = nativeElMock.classList.remove.calls.allArgs();
      expect(firstRemoveCall).toEqual(['uk2-radio-button-alignment-left']);
      expect(secondRemoveCall).toEqual(['uk2-radio-button-alignment-right']);
      expect(nativeElMock.classList.add).toHaveBeenCalledWith('uk2-radio-button-alignment-left');
    });

    it('should reset align classes and set uk2-radio-button-alignment-right when uk2Alignment is right', () => {
      directive['uk2Alignment'] = Uk2RadioButtonAlignmentEnum.right;

      directive['addAlignmentClass']();

      const [firstRemoveCall, secondRemoveCall] = nativeElMock.classList.remove.calls.allArgs();
      expect(firstRemoveCall).toEqual(['uk2-radio-button-alignment-left']);
      expect(secondRemoveCall).toEqual(['uk2-radio-button-alignment-right']);
      expect(nativeElMock.classList.add).toHaveBeenCalledWith('uk2-radio-button-alignment-right');
    });
  });

  describe('handleSkeleton', () => {
    it('should not call createSkeletonTemplate if skeletonTemplate is already setup', () => {
      const createSkeletonTemplateSpy = spyOn(directive as any, 'createSkeletonTemplate');
      const toggleIsLoadingSpy = spyOn(directive as any, 'toggleIsLoading');
      directive['uk2InputSkeletonTemplate'] = {
        classList: {
          contains() {
            return true;
          },
        },
      };

      directive['handleSkeleton']();

      expect(createSkeletonTemplateSpy).not.toHaveBeenCalled();
      expect(toggleIsLoadingSpy).toHaveBeenCalled();
    });

    it('should call createSkeletonTemplate if skeletonTemplate is not setup', () => {
      const createSkeletonTemplateSpy = spyOn(directive as any, 'createSkeletonTemplate');
      const toggleIsLoadingSpy = spyOn(directive as any, 'toggleIsLoading');
      directive['uk2InputSkeletonTemplate'] = {
        classList: {
          contains() {
            return false;
          },
        },
      };

      directive['handleSkeleton']();

      expect(createSkeletonTemplateSpy).toHaveBeenCalled();
      expect(toggleIsLoadingSpy).toHaveBeenCalled();
    });
  });

  describe('createSkeletonTemplate', () => {
    it('should create skeleton template and return it', () => {
      directive['createSkeletonTemplate']();

      const [addClassFirst, addClassSecond, addClassThird, addClassFourth] = (
        rendererMock.addClass as any
      ).calls.allArgs();
      const [createElementFirst, createElementSecond, createElementThird] = (
        rendererMock.createElement as any
      ).calls.allArgs();
      const [appendChildFirst, appendChildSecond] = (rendererMock.appendChild as any).calls.allArgs();
      const insertBeforeSpy = rendererMock.insertBefore;

      expect(addClassFirst).toEqual([undefined, 'uk2-skeleton-radio']);
      expect(addClassSecond).toEqual([undefined, 'uk2-hidden']);
      expect(addClassThird).toEqual([undefined, 'uk2-skeleton-input-radio-button']);
      expect(addClassFourth).toEqual([undefined, 'uk2-skeleton-input-radio-button-text']);
      expect(createElementFirst).toEqual(['div']);
      expect(createElementSecond).toEqual(['div']);
      expect(createElementThird).toEqual(['div']);
      expect(appendChildFirst).toEqual([undefined, undefined]);
      expect(appendChildSecond).toEqual([undefined, undefined]);
      expect(insertBeforeSpy).toHaveBeenCalledWith(undefined, undefined, undefined);
    });
  });

  describe('toggleIsLoading', () => {
    it('should hide radio button and show skeleton if uk2IsLoading is true', () => {
      const getSkeletonContainerSpy = spyOn(directive as any, 'getSkeletonContainer').and.returnValue('skeleton');
      const getFormFieldSpy = spyOn(directive as any, 'getFormField').and.returnValue('form-field');
      directive['uk2IsLoading'] = true;

      directive['toggleIsLoading']();

      expect(getSkeletonContainerSpy).toHaveBeenCalled();
      expect(getFormFieldSpy).toHaveBeenCalled();
      expect(rendererMock.addClass).toHaveBeenCalledWith('form-field', 'uk2-hidden');
      expect(rendererMock.removeClass).toHaveBeenCalledWith('skeleton', 'uk2-hidden');
    });

    it('should show radio button and hide skeleton if uk2IsLoading is false', () => {
      const getSkeletonContainerSpy = spyOn(directive as any, 'getSkeletonContainer').and.returnValue('skeleton');
      const getFormFieldSpy = spyOn(directive as any, 'getFormField').and.returnValue('form-field');
      directive['uk2IsLoading'] = false;

      directive['toggleIsLoading']();

      expect(getSkeletonContainerSpy).toHaveBeenCalled();
      expect(getFormFieldSpy).toHaveBeenCalled();
      expect(rendererMock.addClass).toHaveBeenCalledWith('skeleton', 'uk2-hidden');
      expect(rendererMock.removeClass).toHaveBeenCalledWith('form-field', 'uk2-hidden');
    });
  });

  describe('getSkeletonContainer', () => {
    it('should return element with skeleton class', () => {
      directive['getSkeletonContainer']();

      expect(nativeElMock.querySelector).toHaveBeenCalledWith('.uk2-skeleton-radio');
    });
  });
});
