import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Uk2ContextualTopBarActionTemplateRef } from '../../enums';
import { Uk2ContextualTopBarActionTemplateRefContext } from '../../types';

@Directive({
  selector: 'mat-toolbar-row[uk2ContextualTopBarActionsRow]',
})
export class Uk2ContextualTopBarActionRowDirective {
  @Input() uk2IsAxos = false;
  /**
   * will automatically inject the reference to the template in the first position of the top bar
   */
  @Input() set uk2BackButton(templateRef: TemplateRef<unknown> | undefined) {
    this.handleButtonTemplateRef(templateRef, Uk2ContextualTopBarActionTemplateRef.backButton);
  }
  /**
   * will automatically inject the reference to the template in the last position of the top bar
   */
  @Input() set uk2CloseButton(templateRef: TemplateRef<unknown> | undefined) {
    this.handleButtonTemplateRef(templateRef, Uk2ContextualTopBarActionTemplateRef.closeButton);
  }
  private uk2ButtonNodes = new Map<Uk2ContextualTopBarActionTemplateRef, Uk2ContextualTopBarActionTemplateRefContext>();
  private readonly uk2ContextualTopBarButtonClass = 'uk2-contextual-top-bar-row-action-button';
  constructor(readonly viewContainerRef: ViewContainerRef, private readonly elementRef: ElementRef<Element>) {}
  /**
   * Attaches the template ref to the row container and removes the previous template ref if exists
   * Destroy previous template ref if exists when the input is undefined
   *
   * @param templateRef {@link TemplateRef}<unknown> | undefined template reference for button
   * @param actionType {@link Uk2ContextualTopBarActionTemplateRef} action type (backButton or closeButton)
   */
  private handleButtonTemplateRef(
    templateRef: TemplateRef<unknown> | undefined,
    actionType: Uk2ContextualTopBarActionTemplateRef
  ): void {
    const previousButtonTemplateRef = this.uk2ButtonNodes.get(actionType);
    if (templateRef) {
      if (previousButtonTemplateRef?.templateRef !== templateRef) {
        // remove previous template ref
        if (previousButtonTemplateRef) {
          this.viewContainerRef.remove(previousButtonTemplateRef.index);
          this.uk2ButtonNodes.delete(actionType);
        }
        // add new template ref
        const embeddedView = this.viewContainerRef.createEmbeddedView(templateRef);
        this.bindUk2ButtonClassToRootNode(embeddedView.rootNodes[0]);
        if (actionType === Uk2ContextualTopBarActionTemplateRef.backButton) {
          this.elementRef.nativeElement.insertBefore(
            embeddedView.rootNodes[0],
            this.elementRef.nativeElement.firstChild
          );
        } else if (actionType === Uk2ContextualTopBarActionTemplateRef.closeButton) {
          this.elementRef.nativeElement.appendChild(embeddedView.rootNodes[0]);
        }
        const index = this.viewContainerRef.length === 0 ? 0 : this.viewContainerRef.length - 1;
        // update template ref on map reference
        this.uk2ButtonNodes.set(actionType, {
          templateRef,
          index,
        });
      }
    } else {
      // remove previous template ref
      if (previousButtonTemplateRef) {
        this.viewContainerRef.remove(previousButtonTemplateRef.index);
        this.uk2ButtonNodes.delete(actionType);
      }
    }
  }
  /**
   * Appends a class to the root node of the template ref (button node)
   * which will append all required styles for spacings and shared behavior with top bar if this exists
   * @param rootNode {@link HTMLElement} root node of the template ref
   */
  private bindUk2ButtonClassToRootNode(rootNode: HTMLElement): void {
    rootNode.classList.add(this.uk2ContextualTopBarButtonClass);
  }
}
