import { finalize, first, take, tap } from "rxjs/operators";
import { Uk2HTMLElementMutationObserver } from "./uk2-html-element-mutation-observer";
import { Uk2HTMLElementMutationObserverErrors } from "../uk2-enums";
import { PartialObserver } from "rxjs";

describe('Uk2HTMLElementMutationObserver', () => {
  let subscriberSpies: PartialObserver<any>;
  const customEventIds = {
    first: 1,
    second: 2,
  };
  let element: HTMLElement;
  let nullElement = null as unknown as HTMLElement;
  let mutationObserverWithValidElement: Uk2HTMLElementMutationObserver;
  let mutationObserverWithInvalidElement: Uk2HTMLElementMutationObserver;

  beforeEach(() => {
    subscriberSpies = {
      next: jasmine.createSpy('next'),
      error: jasmine.createSpy('error'),
      complete: jasmine.createSpy('complete'),
    };
    element = document.createElement('div');
    element.innerText = "valid mocked element";
    mutationObserverWithValidElement = new Uk2HTMLElementMutationObserver(element, customEventIds.first);
    mutationObserverWithInvalidElement = new Uk2HTMLElementMutationObserver(nullElement, customEventIds.second);
  })

  it('should create mutation observer with valid and invalid node reference', () => {
    expect(mutationObserverWithValidElement).toBeDefined();
    expect(mutationObserverWithInvalidElement).toBeDefined();
  });

  it('should emit value on mutation of a given attribute', (done) => {
    const expected = '100px';
    mutationObserverWithValidElement.mutationChangesWithEventWrapper().pipe(
      first(),
    ).subscribe({
      next: (changes) => {
        const htmlElement = changes.mutations[0].target as HTMLElement;
        expect(changes.uk2EventType).toBe(customEventIds.first);
        expect(htmlElement.style.width).toEqual(expected);
        done();
      }
    });
    element.style.width = expected;
  });

  it('should throw error when setting mutation changes subscription with no valid HTMLElement reference', (done) => {
    mutationObserverWithInvalidElement.mutationChanges().pipe(
      first()
    ).subscribe({
      error: (error) => {
        expect(error).toEqual(new Error('Invalid HTML element reference'));
        done();
      },
    });
  });

  it('should throw error when setting a new customEventType value that is null or undefined', () => {
    const setEventAction = () => mutationObserverWithValidElement.customEventType = null;
    expect(setEventAction).toThrowError(Uk2HTMLElementMutationObserverErrors.customEventTypeCantBeNullishValue);
  });

  it('should set a new customEventType value', () => {
    mutationObserverWithValidElement.customEventType = customEventIds.second;
    expect(mutationObserverWithValidElement.customEventType).toBe(customEventIds.second);
  });

  it('should emit values for each mutation to the given element', (done) => {
    mutationObserverWithValidElement.mutationChanges().pipe(
      take(1),
      finalize(() => {
        expect(subscriberSpies.next).toHaveBeenCalled();
        done();
      })
    ).subscribe(subscriberSpies)
    mutationObserverWithValidElement.element!.setAttribute('style', 'width: 100px');
  });

  it('should emit error if the element is not a valid value', () => {
    mutationObserverWithInvalidElement.mutationChanges().subscribe(subscriberSpies);
    expect(subscriberSpies.error).toHaveBeenCalled();
  });

  it('should throw error is not custom eventType is set for mutationChangesWithEventWrapper', () => {
    // @ts-ignore
    mutationObserverWithValidElement._customEventType = undefined;
    const mutationChangesWithEventWrapperAction = () => mutationObserverWithValidElement.mutationChangesWithEventWrapper();
    expect(mutationChangesWithEventWrapperAction).toThrowError(Uk2HTMLElementMutationObserverErrors.customEventTypeRequiredForSet);
  });

  it('should throw error if no valid element is set for mutationChangesWithEventWrapper', () => {
    mutationObserverWithInvalidElement.mutationChangesWithEventWrapper().subscribe(subscriberSpies);
    expect(subscriberSpies.error).toHaveBeenCalled();
  });

  it('should throw error if after setting a custom event type for mutationChangesWithEventWrapper the event type gets set to nullish value', (done) => {
    mutationObserverWithValidElement.mutationChangesWithEventWrapper().pipe(
      take(2),
      tap((event) => {
        // force event type to be null
        // @ts-ignore
        mutationObserverWithValidElement._customEventType = undefined;
      }),
      finalize(() => {
        expect(subscriberSpies.next).toHaveBeenCalledTimes(1);
        expect(subscriberSpies.error).toHaveBeenCalledTimes(1);
        done();
      })
    ).subscribe(subscriberSpies);
    // force first mutation
    mutationObserverWithValidElement.element!.setAttribute('style', 'width: 100px');
    // force second mutation with a 200 ms delay
    setTimeout(() => {
      mutationObserverWithValidElement.element!.setAttribute('style', 'width: 200px');
    }, 200);
  });

});
