import { Uk2MatSelectInput } from './classes/uk2-mat-select-input.class';
import { Uk2MatInput } from './classes/uk2-mat-input.class';
import { Uk2InputValidationsService } from './uk2-input-validations.service';

describe('Uk2InputValidationsService', () => {
  let service: Uk2InputValidationsService;

  beforeEach(() => {
    service = new Uk2InputValidationsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Uk2MatSelectInput.isInputDisabled if nodeName equals "MAT-SELECT"', () => {
    const spy = spyOn(Uk2MatSelectInput.prototype, 'isInputDisabled');
    const element: any = {
      nodeName: 'MAT-SELECT',
    };
    service.setStrategy(element);
    service.isInputDisabled();
    expect(spy).toHaveBeenCalled();
  });

  it('should call NormaInput.isInputDisabled by default', () => {
    const spy = spyOn(Uk2MatInput.prototype, 'isInputDisabled');
    const element: any = {
      nodeName: 'INPUT',
    };
    service.setStrategy(element);
    service.isInputDisabled();
    expect(spy).toHaveBeenCalled();
  });

  it('should return null if input is not defined', () => {
    expect(service.isInputDisabled()).toBeUndefined();
  });

  it('should call Uk2MatSelectInput.isInputFilled if nodeName equals "MAT-SELECT"', () => {
    const spy = spyOn(Uk2MatSelectInput.prototype, 'isInputFilled');
    const element: any = {
      nodeName: 'MAT-SELECT',
    };
    service.setStrategy(element);
    service.isInputFilled();
    expect(spy).toHaveBeenCalled();
  });

  it('should call NormaInput.isInputFilled by default', () => {
    const spy = spyOn(Uk2MatInput.prototype, 'isInputFilled');
    const element: any = {
      nodeName: 'INPUT',
    };
    service.setStrategy(element);
    service.isInputFilled();
    expect(spy).toHaveBeenCalled();
  });

  it('should return null if input is not defined', () => {
    expect(service.isInputFilled()).toBeUndefined();
  });
});
