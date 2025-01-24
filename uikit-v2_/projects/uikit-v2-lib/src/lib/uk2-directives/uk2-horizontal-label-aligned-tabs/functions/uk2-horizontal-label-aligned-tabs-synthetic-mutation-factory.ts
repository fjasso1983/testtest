export function uk2HorizontalLabelAlignedTabsSyntheticMutationFactory(
  element: HTMLElement,
  attributeName: string = 'style',
  type: string = 'attributes'
): MutationRecord[] {
  return [
    {
      target: element,
      attributeName,
      previousSibling: element.previousSibling,
      nextSibling: element.nextSibling,
      oldValue: null,
      type,
    },
  ] as unknown as MutationRecord[];
}
