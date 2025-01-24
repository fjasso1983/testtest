/**
 * Required events to track when calculating if the navigation buttons are needed to be rendered on the view
 * as per figma specs.
 * - The left navigation button should not be visible if the left edge of the tabs trail is visible.
 * - The right navigation button should not be visible if the right edge of the tabs trail is visible.
 */
export enum Uk2HorizontalLabelAlignedTabsEventType {
  /**
   * use when setting first event for directive in combination with angular component/directive lifecycle
   */
  onInitObserverChange,
  /**
   * use to track resize events
   */
  onWindowResizeChange,
  /**
   * use to track transition end event to calculate positions when element has completed animation/movement on window
   */
  onTransitionEnd,
  /**
   * use to track addition or removal of child nodes from parent element
   */
  onRenderedTabsChange,
}
