import { Uk2MatInput } from './uk2-mat-input.class';

describe('Uk2MatInput class', () => {
  let normalInput: Uk2MatInput;

  it('should return true if input is disabled', () => {
    const inputElement: any = {
      hasAttribute: jasmine.createSpy(),
    };

    inputElement.hasAttribute.and.returnValue(true);
    normalInput = new Uk2MatInput(inputElement);
    const inputDisabled = normalInput.isInputDisabled();

    expect(inputDisabled).toBe(true);
  });

  it('should return false if input is not disabled', () => {
    const inputElement: any = {
      hasAttribute: jasmine.createSpy(),
    };
    inputElement.hasAttribute.and.returnValue(false);
    normalInput = new Uk2MatInput(inputElement);
    const inputDisabled = normalInput.isInputDisabled();

    expect(inputDisabled).toBe(false);
  });

  it('should return true if input value is truthy', () => {
    const inputElement: any = {
      value: 'Lorem Ipsum',
    };
    const element: any = {
      closest: jasmine.createSpy().and.returnValue(inputElement),
    };

    normalInput = new Uk2MatInput(element);
    const inputFilled = normalInput.isInputFilled();

    expect(inputFilled).toBe(true);
    expect(element.closest).toHaveBeenCalledOnceWith('input');
  });

  it('should return false if input value is falsy', () => {
    const inputElement: any = {
      value: '',
    };
    const element: any = {
      closest: jasmine.createSpy().and.returnValue(inputElement),
    };

    normalInput = new Uk2MatInput(element);
    const inputFilled = normalInput.isInputFilled();

    expect(inputFilled).toBe(false);
    expect(element.closest).toHaveBeenCalledOnceWith('input');
  });

  it("should return false if it can't find an mat-select element", () => {
    const element: any = {
      closest: jasmine.createSpy().and.returnValue(null),
    };

    normalInput = new Uk2MatInput(element);
    const matSelectFilled = normalInput.isInputFilled();

    expect(matSelectFilled).toBe(false);
    expect(element.closest).toHaveBeenCalledOnceWith('input');
  });
});
