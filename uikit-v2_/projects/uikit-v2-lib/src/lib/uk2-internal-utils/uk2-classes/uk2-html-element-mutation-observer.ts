import { Observable, Subscriber } from 'rxjs';
import { Uk2MutationEventsWrapper } from '../uk2-types';
import { Uk2HTMLElementMutationObserverErrors } from '../uk2-enums';

export class Uk2HTMLElementMutationObserver<T = any> {
  private _customEventType: T | undefined;
  get customEventType(): T | undefined {
    return this._customEventType;
  }
  set customEventType(value: T | undefined) {
    const isNewCustomEventTypeValueValid = value !== undefined && value !== null;
    if (!isNewCustomEventTypeValueValid) {
      throw new Error(Uk2HTMLElementMutationObserverErrors.customEventTypeCantBeNullishValue);
    }
    this._customEventType = value;
  }
  constructor(readonly element: HTMLElement | undefined, customEventType: T | undefined) {
    this._customEventType = customEventType;
  }
  /**
   * Listens to attribute changes of the given HTML element
   * by default behavior can be customized by using {@link MutationObserverInit} object
   * as parameter
   * @note this is a {@link Observable} wrapper for {@link MutationObserver} for more information
   * on emitted values please find {@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver documentation reference}
   *
   * @param observeOptions {@link MutationObserverInit}
   * @returns an {@link Observable}<{@link MutationRecord}[]>
   */
  mutationChanges(
    observeOptions: MutationObserverInit = {
      attributes: true,
      childList: false,
      subtree: false,
    }
  ): Observable<MutationRecord[]> {
    return new Observable((subscriber: Subscriber<MutationRecord[]>) => {
      if (!this.element) {
        subscriber.error(new Error(Uk2HTMLElementMutationObserverErrors.invalidHTMLElementReference));
      } else {
        const observer = new MutationObserver((mutations: MutationRecord[]) => {
          subscriber.next(mutations);
        });

        observer.observe(this.element!, observeOptions);

        const disposeMutationObserverAction: VoidFunction = () => {
          observer.disconnect();
        };

        subscriber.add(disposeMutationObserverAction);
      }
    });
  }

  /**
   * Creates a custom event wrapper for the mutation events registered on the given HTML element
   * @note
   * Useful when event type is required to filter out mutation events rather than actually filtering by
   * mutation record values
   *
   * @param observeOptions {@link MutationObserverInit}
   * @returns an {@link Observable}<{@link Uk2MutationEventsWrapper}<T>>
   */
  mutationChangesWithEventWrapper(
    observeOptions: MutationObserverInit = {
      attributes: true,
      childList: false,
      subtree: false,
    }
  ): Observable<Uk2MutationEventsWrapper<T>> {
    if (!this.customEventType) {
      throw new Error(Uk2HTMLElementMutationObserverErrors.customEventTypeRequiredForSet);
    }

    return new Observable((subscriber: Subscriber<Uk2MutationEventsWrapper<T>>) => {
      if (!this.element) {
        subscriber.error(new Error(Uk2HTMLElementMutationObserverErrors.invalidHTMLElementReference));
      } else {
        const observer = new MutationObserver((mutations: MutationRecord[]) => {
          if (!this.customEventType) {
            const error = new Error(Uk2HTMLElementMutationObserverErrors.customEventTypeRequiredForNext);
            subscriber.error(error);
          }

          const mutationsWithWrapper = {
            uk2EventType: this.customEventType,
            mutations,
          } as Uk2MutationEventsWrapper<T>;
          subscriber.next(mutationsWithWrapper);
        });

        observer.observe(this.element!, observeOptions);

        const disposeMutationObserverAction: VoidFunction = () => {
          observer.disconnect();
        };

        subscriber.add(disposeMutationObserverAction);
      }
    });
  }
}
