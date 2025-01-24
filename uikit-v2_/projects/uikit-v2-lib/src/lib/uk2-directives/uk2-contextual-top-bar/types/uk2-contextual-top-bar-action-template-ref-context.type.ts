import { TemplateRef } from '@angular/core';
/**
 * Context object that holds a references to a given template ref created for a button
 * and the index in which it was inserted on the embedded view either to removed it or update it
 * @note index it's only used for removal to avoid any change detection issues.
 */
export type Uk2ContextualTopBarActionTemplateRefContext = {
  templateRef: TemplateRef<unknown>;
  index: number;
};
