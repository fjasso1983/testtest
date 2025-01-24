import { Observable, pipe, UnaryFunction } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { uk2HorizontalLabelAlignedTabsSyntheticMutationFactory } from '../functions';

/**
 * Maps a synthetic {@link MutationRecord} array with with the element provided as target element of the record.
 *
 * @param targetElement {@link HTMLElement}
 * @returns an {@link UnaryFunction}<{@link Observable}<{@link MutationRecord}[]>,{@link Observable}<{@link MutationRecord}[]>>
 */
export function uk2StartWithStyleSyntheticMutation(
  targetElement: HTMLElement
): UnaryFunction<Observable<MutationRecord[]>, Observable<MutationRecord[]>> {
  const mutationWrapper = uk2HorizontalLabelAlignedTabsSyntheticMutationFactory(targetElement);

  return pipe(startWith(mutationWrapper));
}
