import { TestBed } from '@angular/core/testing';
import { Uk2SelectedAndHoverVisibilityStrategy } from './uk2-selected-and-hover-visibility-strategy';

describe('SelectedAndHoverVisibilityStrategy', () => {
  let strategy: Uk2SelectedAndHoverVisibilityStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Uk2SelectedAndHoverVisibilityStrategy],
    });
    strategy = TestBed.inject(Uk2SelectedAndHoverVisibilityStrategy);
  });

  it('should be created', () => {
    expect(strategy).toBeTruthy();
  });

  const testCases = [
    { isHovered: true, isSelected: true, expectedAdd: 'uk2-visible', expectedRemove: 'uk2-hidden' },
    { isHovered: true, isSelected: false, expectedAdd: 'uk2-hidden', expectedRemove: 'uk2-visible' },
    { isHovered: false, isSelected: true, expectedAdd: 'uk2-hidden', expectedRemove: 'uk2-visible' },
    { isHovered: false, isSelected: false, expectedAdd: 'uk2-hidden', expectedRemove: 'uk2-visible' },
  ];

  testCases.forEach(({ isHovered, isSelected, expectedAdd, expectedRemove }) => {
    it(`should add ${expectedAdd} class and remove ${expectedRemove} class when uk2IsHovered is ${isHovered} and uk2IsSelected is ${isSelected}`, () => {
      const targetElement = createTargetElement();
      const directive = createDirective(isHovered, isSelected, targetElement);

      strategy.processVisibility(directive as any);

      expect(targetElement.classList.add).toHaveBeenCalledWith(expectedAdd);
      expect(targetElement.classList.remove).toHaveBeenCalledWith(expectedRemove);
    });
  });

  it('should do nothing if target element is not found', () => {
    const directive = createDirective(true, true, null);

    strategy.processVisibility(directive as any);

    expect(directive.elementRefNativeElement.querySelector).toHaveBeenCalled();
  });

  function createDirective(isHovered: boolean, isSelected: boolean, targetElement: any) {
    return {
      elementRefNativeElement: {
        querySelector: jasmine.createSpy('querySelector').and.returnValue(targetElement),
      },
      uk2IsHovered: isHovered,
      getCheckboxCheckedState: () => isSelected,
    };
  }

  function createTargetElement() {
    return {
      classList: {
        add: jasmine.createSpy('add'),
        remove: jasmine.createSpy('remove'),
      },
    };
  }
});
