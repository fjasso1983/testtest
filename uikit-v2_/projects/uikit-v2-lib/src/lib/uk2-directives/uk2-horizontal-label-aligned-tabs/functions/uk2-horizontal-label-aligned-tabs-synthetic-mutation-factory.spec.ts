import { uk2HorizontalLabelAlignedTabsSyntheticMutationFactory } from "./uk2-horizontal-label-aligned-tabs-synthetic-mutation-factory";

describe('uk2HorizontalLabelAlignedTabsSyntheticMutationFactory', () => {
  const element = document.createElement('div');
  it('should create a mutation record array with the given element', () => {
    const fakeMutationRecord =  {
      target: element,
      attributeName: 'style',
      previousSibling: element.previousSibling,
      nextSibling: element.nextSibling,
      oldValue: null,
      type: 'attributes',
    } as unknown as MutationRecord;
    const result = uk2HorizontalLabelAlignedTabsSyntheticMutationFactory(element);
    expect(result).toEqual([fakeMutationRecord]);
  });
});
