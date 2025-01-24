import { Observable, pipe, UnaryFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { uk2HorizontalLabelAlignedTabsSyntheticMutationFactory } from '../functions';

/**
 * Maps an observable output to a constant element reference
 *
 * @param element {@link HTMLElement}
 * @returns {@link UnaryFunction}<{@link Observable}, {@link Observable}<{@link MutationRecord}[]>>
 */
export function uk2MapEventToElement(
  element: HTMLElement
): UnaryFunction<Observable<unknown>, Observable<MutationRecord[]>> {
  return pipe(map(() => uk2HorizontalLabelAlignedTabsSyntheticMutationFactory(element)));
}
