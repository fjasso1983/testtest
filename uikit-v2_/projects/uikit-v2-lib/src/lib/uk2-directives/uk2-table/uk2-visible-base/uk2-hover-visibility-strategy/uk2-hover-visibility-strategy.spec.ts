import { TestBed } from '@angular/core/testing';
import { Uk2HoverVisibilityStrategy } from './uk2-hover-visibility-strategy';

describe('Uk2HoverVisibilityStrategy', () => {
  let strategy: Uk2HoverVisibilityStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Uk2HoverVisibilityStrategy],
    });
    strategy = TestBed.inject(Uk2HoverVisibilityStrategy);
  });

  it('should be created', () => {
    expect(strategy).toBeTruthy();
  });

  it('should add uk2-visible class and remove uk2-hidden class when uk2IsHovered is true', () => {
    const targetElement = createTargetElement();
    const directive = createDirective(true, targetElement);

    strategy.processVisibility(directive as any);

    expect(targetElement.classList.add).toHaveBeenCalledWith('uk2-visible');
    expect(targetElement.classList.remove).toHaveBeenCalledWith('uk2-hidden');
  });

  it('should add uk2-hidden class and remove uk2-visible class when uk2IsHovered is false', () => {
    const targetElement = createTargetElement();
    const directive = createDirective(false, targetElement);

    strategy.processVisibility(directive as any);

    expect(targetElement.classList.add).toHaveBeenCalledWith('uk2-hidden');
    expect(targetElement.classList.remove).toHaveBeenCalledWith('uk2-visible');
  });

  it('should do nothing if target element is not found', () => {
    const directive = createDirective(true, null);

    strategy.processVisibility(directive as any);

    expect(directive.elementRefNativeElement.querySelector).toHaveBeenCalled();
  });

  function createDirective(isHovered: boolean, targetElement: any) {
    return {
      elementRefNativeElement: {
        querySelector: jasmine.createSpy('querySelector').and.returnValue(targetElement),
      },
      uk2IsHovered: isHovered,
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
