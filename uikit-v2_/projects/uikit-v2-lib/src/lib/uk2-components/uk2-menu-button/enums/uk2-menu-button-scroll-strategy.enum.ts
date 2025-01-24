/**
 * Options for how an overlay will handle scrolling.
 * @enum
 */
export enum Uk2MenuButtonScrollStrategy {
  /**
   * Strategy that will prevent the user from scrolling while the overlay is visible.
   */
  block = 'block',
  /**
   * Strategy that will close the overlay as soon as the user starts scrolling.
   */
  close = 'close',
  /**
   * Scroll strategy that doesn't do anything.
   */
  noop = 'noop',
  /**
   * Strategy that will update the element position as the user is scrolling.
   */
  reposition = 'reposition',
}
