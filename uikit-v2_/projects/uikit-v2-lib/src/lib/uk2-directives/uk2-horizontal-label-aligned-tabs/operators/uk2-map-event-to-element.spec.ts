import { PartialObserver, timer } from "rxjs";
import { uk2MapEventToElement } from "./uk2-map-event-to-element";
import { finalize, take } from "rxjs/operators";
import { uk2HorizontalLabelAlignedTabsSyntheticMutationFactory } from "../functions";

describe('uk2MapEventToElement', () => {
  const source$ = timer(0, 10);
  const element = document.createElement('div');
  let subscriberSpies: PartialObserver<MutationRecord[]>;
  beforeEach(() => {
    subscriberSpies = jasmine.createSpyObj<PartialObserver<MutationRecord[]>>('subscriberSpies', ['next', 'error', 'complete']);
  })
  it('should map all emissions of observable to provided element reference', (done) => {
    source$.pipe(
      take(3),
      uk2MapEventToElement(element),
      finalize(() => {
        expect(subscriberSpies.next).toHaveBeenCalledTimes(3);
        expect(subscriberSpies.next).toHaveBeenCalledWith(uk2HorizontalLabelAlignedTabsSyntheticMutationFactory(element));
        done();
      })
    ).subscribe(subscriberSpies);
  });
});
