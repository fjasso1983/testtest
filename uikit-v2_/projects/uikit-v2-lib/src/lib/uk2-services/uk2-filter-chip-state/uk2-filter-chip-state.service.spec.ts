import { Uk2Condition } from '@axos/uikit-v2-lib/src/lib/uk2-shared';

import { Uk2FilterChipStateService } from './uk2-filter-chip-state.service';

describe('Uk2FilterChipStateService', () => {
  let service: Uk2FilterChipStateService;

  beforeEach(() => {
    service = new Uk2FilterChipStateService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get identifier', () => {
    // Arrange
    const identifier = 'Name';

    // Act
    service.setIdentifier(identifier);

    // Assert
    expect(service.getIdentifier()).toBe(identifier);
  });

  // same for other properties
  it('should set and get conditional', () => {
    // Arrange
    const conditional: Uk2Condition = { buttonLabel: 'Is', label: 'Is' };

    // Act
    service.setConditional(conditional);

    // Assert
    expect(service.getConditional()).toBe(conditional);
  });

  it('should set and get value of type string and update active if value is not empty string', () => {
    // Arrange
    const value = 'Option 1';

    // Act
    service.setValue(value);

    // Assert
    expect(service.getValue()).toBe(value);
    expect(service.getActive()).toBeTrue();
  });

  it('should set and get value of type array and update active if array length is more than zero', () => {
    // Arrange
    const value = ['Option 1', 'Option 2'];

    // Act
    service.setValue(value);

    // Assert
    expect(service.getValue()).toBe(value);
    expect(service.getActive()).toBeTrue();
  });

  it('should set and get active', () => {
    // Arrange
    const active = true;

    // Act
    service.setActive(active);

    // Assert
    expect(service.getActive()).toBe(active);
  });

  it('should set and get pressed', () => {
    // Arrange
    const pressed = true;

    // Act
    service.setPressed(pressed);

    // Assert
    expect(service.getPressed()).toBe(pressed);
  });

  it('should set active to false if value is empty string', () => {
    // Arrange
    const value = '';

    // Act
    service.setValue(value);

    // Assert
    expect(service.getActive()).toBeFalse();
  });

  it('should set active to false if value is empty array', () => {
    // Arrange
    const value: any = [];

    // Act
    service.setValue(value);

    // Assert
    expect(service.getActive()).toBeFalse();
  });

  it('should set and get overlayMinWidth', () => {
    // Arrange
    const overlayMinWidth = '200px';

    // Act
    service.setOverlayMinWidth(overlayMinWidth);

    // Assert
    expect(service.getOverlayMinWidth()).toBe(overlayMinWidth);
  });

  it('should emit _deleted$ subject when calling deleteFilter method', () => {
    // Arrange
    let nextSpy = spyOn(service['_deleted$'], 'next');

    // Act
    service.deleteFilter();

    // Assert
    expect(nextSpy).toHaveBeenCalled();
  });

  it('should set active to false if value is null or undefined', () => {
    // Arrange
    const value = null;

    // Act
    service.setValue(value);

    // Assert
    expect(service.getActive()).toBeFalse();
    expect(service.getValue()).toBe(value);
  });

  it('should emit values in filterValue$ property when method optionSelected is called', () => {
    // Arrange
    const value = 'Option 1';

    // Assert
    service.filterValue$.subscribe(filterValue => {
      expect(filterValue.value).toEqual(value);
    });

    // Act
    service.setValue(value);
    service.optionSelected();
  });
});
