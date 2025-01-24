import { MATERIAL_CLASSES } from '../../../uk2-constants';
import { Uk2MatSelectInput } from './uk2-mat-select-input.class';

describe('Uk2MatSelectInput class', () => {
  let matSelectInput: Uk2MatSelectInput;

  it('should return true if mat-select is disabled', () => {
    const matSelectElement: any = {
      classList: {
        contains: jasmine.createSpy(),
      },
    };

    matSelectElement.classList.contains.and.returnValue(true);
    matSelectInput = new Uk2MatSelectInput(matSelectElement);
    const inputDisabled = matSelectInput.isInputDisabled();

    expect(inputDisabled).toBe(true);
    expect(matSelectElement.classList.contains).toHaveBeenCalledOnceWith('mat-select-disabled');
  });

  it('should return false if mat-select is not disabled', () => {
    const matSelectElement: any = {
      classList: {
        contains: jasmine.createSpy(),
      },
    };

    matSelectElement.classList.contains.and.returnValue(false);
    matSelectInput = new Uk2MatSelectInput(matSelectElement);
    const inputDisabled = matSelectInput.isInputDisabled();

    expect(inputDisabled).toBe(false);
    expect(matSelectElement.classList.contains).toHaveBeenCalledOnceWith('mat-select-disabled');
  });

  it("should return true if is classList doesn't contains 'mat-mdc-select-empty'", () => {
    const matSelectElement: any = {
      classList: {
        contains: jasmine.createSpy().and.returnValue(false),
      },
    };
    const element: any = {
      closest: jasmine.createSpy().and.returnValue(matSelectElement),
    };

    matSelectInput = new Uk2MatSelectInput(element);
    const matSelectFilled = matSelectInput.isInputFilled();

    expect(matSelectFilled).toBe(true);
    expect(element.closest).toHaveBeenCalledOnceWith('mat-select');
    expect(matSelectElement.classList.contains).toHaveBeenCalledOnceWith(`${MATERIAL_CLASSES.selectEmpty}`);
  });

  it("should return false if is classList does contains 'mat-mdc-select-empty'", () => {
    const matSelectElement: any = {
      classList: {
        contains: jasmine.createSpy().and.returnValue(true),
      },
    };
    const element: any = {
      closest: jasmine.createSpy().and.returnValue(matSelectElement),
    };

    matSelectInput = new Uk2MatSelectInput(element);
    const matSelectFilled = matSelectInput.isInputFilled();

    expect(matSelectFilled).toBe(false);
    expect(element.closest).toHaveBeenCalledOnceWith('mat-select');
    expect(matSelectElement.classList.contains).toHaveBeenCalledOnceWith(`${MATERIAL_CLASSES.selectEmpty}`);
  });

  it("should return false if it can't find an mat-select element", () => {
    const element: any = {
      closest: jasmine.createSpy().and.returnValue(null),
    };

    matSelectInput = new Uk2MatSelectInput(element);
    const matSelectFilled = matSelectInput.isInputFilled();

    expect(matSelectFilled).toBe(false);
    expect(element.closest).toHaveBeenCalledOnceWith('mat-select');
  });
});
