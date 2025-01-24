import { Subject } from "rxjs";
import { uk2StartWithStyleSyntheticMutation } from "./uk2-start-with-style-synthetic-mutation";
import { take } from "rxjs/operators";
import { uk2HorizontalLabelAlignedTabsSyntheticMutationFactory } from "../functions";

describe('uk2StartWithStyleSyntheticMutation', () => {
  const source$ = new Subject<MutationRecord[]>();
  const element = document.createElement('div');

  it('should emit a default value on subscription', (done) => {
    let emitCounter = 1;
    source$.pipe(
      uk2StartWithStyleSyntheticMutation(element),
      take(2),
    ).subscribe({
      next: (mutations) => {
        if(emitCounter > 1) {
          expect(mutations).toEqual([]);
        } else {
          expect(mutations).toEqual(uk2HorizontalLabelAlignedTabsSyntheticMutationFactory(element));
        }
        emitCounter++;
      },
      complete: () => {
        done();
      }
  });

    source$.next([]);
  });


});
