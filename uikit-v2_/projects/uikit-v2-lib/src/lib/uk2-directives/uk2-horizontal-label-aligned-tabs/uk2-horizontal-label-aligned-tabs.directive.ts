import {
  ComponentRef,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  ViewContainerRef,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, delay, filter, map, startWith, takeUntil } from 'rxjs/operators';
import {
  IUk2IsLoading,
  MATERIAL_CLASSES,
  UK2_BREAKPOINTS,
  Uk2DestroyService,
  Uk2HTMLElementMutationObserver,
  Uk2TypedChange,
  Uk2TypedChanges,
} from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2Icon, Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import {
  Uk2MatNavigationButtons,
  Uk2HorizontalLabelTabsSizeConstrains,
  Uk2TabsRenderSafeZone,
  Uk2MatTabLinks,
} from './types';
import { IUk2HorizontalLabelTabsButtonIconsConfig, Uk2KeyofHorizontalLabelTabsButtonIconsConfig } from './interfaces';
import { MatTabLink } from '@angular/material/tabs';
import { Uk2HorizontalLabelAlignedTabsEventType } from './enums';
import { uk2MapEventToElement, uk2StartWithStyleSyntheticMutation } from './operators';
import { uk2HorizontalLabelAlignedTabsSyntheticMutationFactory } from './functions';

@Directive({
  selector:
    'mat-tab-group[uk2HorizontalLabelAlignedTabs][mat-tab-nav-bar][disableRipple][dynamicHeight], [uk2HorizontalLabelAlignedTabs][mat-tab-nav-bar]',
  providers: [Uk2DestroyService],
})
// eslint-disable-next-line prettier/prettier
export class Uk2HorizontalLabelAlignedTabsDirective implements IUk2IsLoading, IUk2HorizontalLabelTabsButtonIconsConfig, OnInit, OnChanges
{
  @ContentChildren(MatTabLink) childTabs!: QueryList<MatTabLink>;
  @Input() uk2IsLoading = false;
  readonly uk2LeftButtonIcon: Uk2Icon = Uk2Tier1NavigationEnum.chevronLeft;
  readonly uk2RightButtonIcon: Uk2Icon = Uk2Tier1NavigationEnum.chevronRight;

  private _stretchedTabs = false;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('mat-stretch-tabs')
  set stretchedTabs(value: boolean) {
    this._stretchedTabs = value;
  }

  private readonly windowResize$ = fromEvent(window, 'resize');

  private readonly uk2MatIconButtonElements = new Map<
    Uk2KeyofHorizontalLabelTabsButtonIconsConfig,
    ComponentRef<MatIcon> | null
  >([
    ['uk2LeftButtonIcon', null],
    ['uk2RightButtonIcon', null],
  ]);

  private readonly uk2skeletonTabSizeConstrains = new Map<string, Uk2HorizontalLabelTabsSizeConstrains>([
    [
      'xs',
      {
        breakpoint: UK2_BREAKPOINTS.sm,
        tabsToRender: 3,
      },
    ],
    [
      'md',
      {
        breakpoint: UK2_BREAKPOINTS.md,
        tabsToRender: 5,
      },
    ],
  ]);

  private readonly animationValues = {
    hide: 150,
    show: 50,
  };

  constructor(
    readonly elementRef: ElementRef<HTMLElement>,
    readonly viewContainerRef: ViewContainerRef,
    private readonly destroy$: Uk2DestroyService
  ) {}

  ngOnChanges(changes: Uk2TypedChanges<IUk2IsLoading>): void {
    if (changes.uk2IsLoading && !this._stretchedTabs) {
      this.setLoadingState(changes.uk2IsLoading);
    }
  }

  ngOnInit(): void {
    if (!this._stretchedTabs) {
      this.attachUk2LookAndFeel();
      this.listenToResizeEvents();
      this.updateNavigationButtonIconsLookAndFeel();
      this.handleNavigationButtonVisibility(this.queryHorizontalScrollElement()!);
    }
  }

  /**
   * attaches ui kit 2 look and feel to the material horizontal tabs
   */
  attachUk2LookAndFeel(): void {
    const { nativeElement } = this.elementRef;
    nativeElement.classList.add('uk2-horizontal-tabs');
  }

  /**
   * Updates loading state of the horizontal tabs
   * and adds or removes skeleton tab nodes based on the loading state
   * @param uk2IsLoadingChange {@link Uk2TypedChange}<boolean>
   */
  setLoadingState(uk2IsLoadingChange: Uk2TypedChange<boolean>): void {
    // do early return if the new ukIsLoading value is the same as the current one to avoid unnecessary DOM manipulations
    if (uk2IsLoadingChange.currentValue === uk2IsLoadingChange.previousValue) return;

    const { nativeElement } = this.elementRef;
    if (uk2IsLoadingChange.currentValue) {
      nativeElement.classList.add('uk2-horizontal-tabs__loading');
      const tabNodesToRender = this.calculateTabNodesToRender(nativeElement.clientWidth);
      this.createLoadingTabNodes(nativeElement, tabNodesToRender);
    } else {
      nativeElement.classList.remove('uk2-horizontal-tabs__loading');
      this.removeLoadingTabNodes(nativeElement);
    }
  }

  /**
   * adds skeleton tab nodes to the element provided
   * @param element {@link HTMLElement} element to append tab skeleton nodes
   * @param amount number of elements to add
   */
  createLoadingTabNodes(element: HTMLElement, amount: number): void {
    for (let i = 0; i < amount; i++) {
      element.appendChild(this.createLoadingTabNode(i + 1));
    }
  }

  /**
   * removes extra skeleton tab nodes from the element
   * @param element {@link HTMLElement}
   */
  removeLoadingTabNodes(element: HTMLElement): void {
    const loadingTabNodes = element.querySelectorAll('.uk2-horizontal-skeleton-tab');
    loadingTabNodes.forEach(node => node.remove());
  }

  /**
   * Removes angular material "chevron icons"
   */
  searchAndDestroyFakeIcons(): void {
    const { nativeElement } = this.elementRef;
    const fakeNavigationIconElements = nativeElement.querySelectorAll(
      MATERIAL_CLASSES.matTabNavBarFakeNavigationIconSelector
    );
    fakeNavigationIconElements.forEach(fakeIcon => {
      fakeIcon.remove();
    });
  }

  /**
   * Updates the look and feel of the navigation buttons by adding custom icons to buttons if they exist
   * and removing any fake icons created by the mat-tab-nav-bar default behavior
   */
  private updateNavigationButtonIconsLookAndFeel(): void {
    this.searchAndDestroyFakeIcons();
    const { leftButton, rightButton } = this.queryNavigationButtonElements();
    if (leftButton) {
      let uk2MatIcon = this.uk2MatIconButtonElements.get('uk2LeftButtonIcon');
      // create mat-icon if it doesn't exist
      if (!uk2MatIcon) {
        const leftButtonMatIconRef = this.uk2MatIconFactory(this.uk2LeftButtonIcon);
        this.uk2MatIconButtonElements.set('uk2LeftButtonIcon', leftButtonMatIconRef);
        uk2MatIcon = leftButtonMatIconRef;
        uk2MatIcon.location.nativeElement.classList.add('uk2-horizontal-tabs__navigation-button-icon', 'uk2-show');
        this.updateButtonIcon('uk2LeftButtonIcon', this.uk2LeftButtonIcon);
      }
      // append mat-icon to the left side button
      leftButton.appendChild(uk2MatIcon.location.nativeElement);
      leftButton.classList.add('uk2-navigation-button', 'uk2-show');
    }

    if (rightButton) {
      let uk2MatIcon = this.uk2MatIconButtonElements.get('uk2RightButtonIcon');
      // create mat-icon if it doesn't exist
      if (!uk2MatIcon) {
        const rightButtonMatIconRef = this.uk2MatIconFactory(this.uk2RightButtonIcon);
        this.uk2MatIconButtonElements.set('uk2RightButtonIcon', rightButtonMatIconRef);
        uk2MatIcon = rightButtonMatIconRef;
        uk2MatIcon.location.nativeElement.classList.add('uk2-horizontal-tabs__navigation-button-icon', 'uk2-show');
        this.updateButtonIcon('uk2RightButtonIcon', this.uk2RightButtonIcon);
      }
      // append mat-icon to the right side button
      rightButton.appendChild(uk2MatIcon.location.nativeElement);
      rightButton.classList.add('uk2-navigation-button', 'uk2-show');
    }
  }

  /**
   * Updates the icon of a given button store in {@link uk2MatIconButtonElements}
   *
   * @param iconToUpdate {@link keyof Uk2HorizontalLabelButtonIconsConfig} key of the icon to be updated
   * @param newIcon {@link Uk2Icon} new icon to be set
   */

  private updateButtonIcon(iconToUpdate: keyof IUk2HorizontalLabelTabsButtonIconsConfig, newIcon: Uk2Icon): void {
    const uk2MatIcon = this.uk2MatIconButtonElements.get(iconToUpdate);
    if (uk2MatIcon) {
      uk2MatIcon.setInput('svgIcon', newIcon);
    }
  }

  /**
   * Resize event listener that listens to window resize events and updates the loading tabs if the loading state is active
   */
  private listenToResizeEvents(): void {
    this.windowResize$
      .pipe(
        debounceTime(300),
        startWith(null),
        map(() => this.elementRef.nativeElement.clientWidth),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: tabContainerWidth => {
          // update the loading tabs if the loading state is active
          if (this.uk2IsLoading) {
            const tabNodesToRender = this.calculateTabNodesToRender(tabContainerWidth);
            this.removeLoadingTabNodes(this.elementRef.nativeElement);
            this.createLoadingTabNodes(this.elementRef.nativeElement, tabNodesToRender);
          }
        },
      });
  }

  /**
   * selects the number of tabs to render based on the width of the tab container
   * @param tabContainerWidth number
   * @returns number of nodes that can be fit into element
   */
  private calculateTabNodesToRender(tabContainerWidth: number): number {
    const smallDeviceConfig = this.uk2skeletonTabSizeConstrains.get('xs');
    let tabNodesToRender = smallDeviceConfig?.tabsToRender ?? 3;
    const mdConstrains = this.uk2skeletonTabSizeConstrains.get('md');
    if (tabContainerWidth >= mdConstrains!.breakpoint) {
      tabNodesToRender = mdConstrains?.tabsToRender ?? 5;
    }

    return tabNodesToRender;
  }

  /**
   * creates a loading tab node
   * @param id number
   * @returns {@link HTMLElement}
   */
  private createLoadingTabNode(id: number): HTMLElement {
    const tabSkeletonNode = document.createElement('span');
    tabSkeletonNode.id = id.toString();
    tabSkeletonNode.classList.add('uk2-horizontal-skeleton-tab');

    return tabSkeletonNode;
  }

  /**
   * queries the navigation buttons of the mat-tab-nav-bar (left and right buttons)
   * @returns an object containing the left and right navigation buttons of type {@link MatNavigationButtons}
   */
  private queryNavigationButtonElements(): Uk2MatNavigationButtons {
    const { nativeElement } = this.elementRef;
    const leftButton = nativeElement.querySelector(MATERIAL_CLASSES.matTabNavBarNavigationLeftButton);
    const rightButton = nativeElement.querySelector(MATERIAL_CLASSES.matTabNavBarNavigationRightButton);

    return {
      leftButton,
      rightButton,
    };
  }

  /**
   * creates an instance of {@link MatIcon} and sets the svgIcon input to the provided {@link Uk2Icon}
   *
   * @param icon {@link Uk2Icon} custom uk2 icon to be added as svg source for mat-icon
   * @returns an instance of {@link ComponentRef} of {@link MatIcon}
   */
  private uk2MatIconFactory(icon: Uk2Icon): ComponentRef<MatIcon> {
    const uk2MatIcon = this.viewContainerRef.createComponent(MatIcon);
    uk2MatIcon.setInput('svgIcon', icon);

    return uk2MatIcon;
  }

  /**
   * queries the html element that contains all the mat tab links
   * @returns {@link HTMLElement} | undefined
   */
  private queryHorizontalScrollElement(): HTMLElement | undefined {
    let tabListScrollableTrailElement: HTMLElement | undefined = undefined;
    const queriedTabListScrollableTrailElement = this.elementRef.nativeElement.getElementsByClassName(
      MATERIAL_CLASSES.matTabNavBarListScrollableTrail
    );
    if (queriedTabListScrollableTrailElement) {
      tabListScrollableTrailElement = queriedTabListScrollableTrailElement[0] as HTMLElement;
    }

    return tabListScrollableTrailElement;
  }

  /**
   * Creates a listener for mutation changes on a given element
   * @note
   * Used to track whenever the amount of mat tab links are added or removed from the tab link container
   * Required to calculate if the first item left edge or last item right edge are within
   * the navigation buttons constrains and define if the button should be visible after the a mat tab link element
   * has been added or removed.
   * This mutation observable will strictly emit when a mat tab link is added or removed; it won't be listening for style changes.
   *
   * @param virtualTabsScrollableElement {@link HTMLElement} - component that will be observed for mutation changes
   * @returns an {@link Observable}<{@link MutationRecord}[]>
   */
  private getVirtualTabsScrollMutationChanges(virtualTabsScrollableElement: HTMLElement): Observable<MutationRecord[]> {
    const virtualScrollMutations = new Uk2HTMLElementMutationObserver<Uk2HorizontalLabelAlignedTabsEventType>(
      virtualTabsScrollableElement,
      Uk2HorizontalLabelAlignedTabsEventType.onRenderedTabsChange
    );

    return virtualScrollMutations
      .mutationChanges({
        attributes: false,
        childList: true,
        subtree: true,
      })
      .pipe(
        // delay added to await the 500ms transition animation to finish before calculating the new position of the tab links
        // once a new tab link is added or removed
        // its required since we are filtering "transitionend" events from child elements to avoid miscalculations
        // when child element has an internal transition animation may trigger transition events.
        delay(550),
        uk2MapEventToElement(virtualTabsScrollableElement)
      );
  }

  /**
   * Creates a listener for transitionEnd events
   * @note
   * Used to track transition end changes when mat tab list container animates translate X styles.
   * Required to calculate if the first item left edge or last item right edge are within at the end of the
   * animated transition to avoid miscalculations while elements are still moving.
   * This event observable will observe any transition end event from top element to last child element
   * in order to perform correct calculation when any mutation could change the translate x of the tab link container
   * or sizes of any mat tab link elements within the tab link container.
   *
   * @param virtualTabsScrollableElement {@link HTMLElement} - component that will be observed for mutation changes
   * @returns an {@link Observable}<{@link MutationRecord}[]>
   */
  private getVirtualTabsScrollTransitionEndChanges(
    virtualTabsScrollableElement: HTMLElement
  ): Observable<MutationRecord[]> {
    return fromEvent<TransitionEvent>(virtualTabsScrollableElement, 'transitionend').pipe(
      // we need to filter the event to avoid any other transition end events from other child elements
      // since fromEvent will listen to any transition end event from the top element to the last child element
      filter(event => event.target === virtualTabsScrollableElement),
      // creates a synthetic mutation with the latest target reference data since this event filters only events from the top element.
      map(event => uk2HorizontalLabelAlignedTabsSyntheticMutationFactory(event.target as HTMLElement))
    );
  }

  /**
   * Creates a listener for window resize events
   * @note
   * Used to track window resize changes when the window is resized.
   * Required to calculate if the first item left edge or last item right edge are within the constrains of the navigation buttons
   * when the window is resized as the render safe zone can be bigger or smaller depending on the window size.
   *
   * @param virtualTabsScrollableElement {@link HTMLElement} - component that will be observed for mutation changes
   * @returns an {@link Observable}<{@link MutationRecord}[]>
   */
  private getVirtualTabsScrollWindowResizeChanges(
    virtualTabsScrollableElement: HTMLElement
  ): Observable<MutationRecord[]> {
    return this.windowResize$.pipe(
      debounceTime(100),
      // creates a synthetic mutation event since window resizing event target is not the actual observed element.
      uk2MapEventToElement(virtualTabsScrollableElement)
    );
  }

  /**
   * Sets a listener that merges to any events that may change the width of the tab list container
   * and calculates if the first or last tab link is within the constrains of the navigation buttons
   * to hide or show the navigation buttons depending of the current transitionX style of the tab list container
   * and the position of the first and last tab links within the constrains of the navigation buttons safe zone render area.
   *
   * @param virtualTabsScrollableElement {@link HTMLElement} - component that will be observed for mutation changes
   */
  private handleNavigationButtonVisibility(virtualTabsScrollableElement: HTMLElement): void {
    const transitionEndChanges$ = this.getVirtualTabsScrollTransitionEndChanges(virtualTabsScrollableElement);
    const tabListMutationChanges$ = this.getVirtualTabsScrollMutationChanges(virtualTabsScrollableElement);
    const windowResizeChanges$ = this.getVirtualTabsScrollWindowResizeChanges(virtualTabsScrollableElement);
    const changes$ = merge(tabListMutationChanges$, transitionEndChanges$, windowResizeChanges$);
    changes$
      .pipe(uk2StartWithStyleSyntheticMutation(virtualTabsScrollableElement), takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          const { leftButton, rightButton } = this.queryNavigationButtonElements();
          const { left, right } = this.calculateTabRenderConstrains(leftButton, rightButton);
          const { first, last } = this.getFirstAndLastTabLinks();
          const firstElement = first?.elementRef.nativeElement as HTMLElement;
          const lastElement = last?.elementRef.nativeElement as HTMLElement;
          const firstElementRect = firstElement?.getBoundingClientRect();
          const lastElementRect = lastElement?.getBoundingClientRect();
          // left side for first needs to be within left constrain for left button to hide
          // - 2px is used as tolerance measure due to the way different browsers include borders on bounded rects
          const hideLeftButton = firstElementRect?.left >= left - 2;
          // - 2px is used as tolerance measure due to the way different browsers include borders on bounded rects
          // right side of last needs to be within right constrain for right button to hide
          const hideRightButton = right >= lastElementRect?.right - 2;
          this.toggleNavigationButtonVisibility(hideLeftButton, leftButton, first);
          this.toggleNavigationButtonVisibility(hideRightButton, rightButton, last);
        },
      });
  }

  /**
   * Toggles the visibility for a given navigation button.
   *
   * @param hide boolean
   * @param button {@link Element} | null
   * @param siblingMatTabListElement {@link MatTabLink}
   */
  private toggleNavigationButtonVisibility(
    hide: boolean,
    button: Element | null,
    siblingMatTabListElement: MatTabLink
  ): void {
    if (!button || !siblingMatTabListElement) {
      return;
    }
    const htmlElementRef = button as HTMLElement;
    const matTabListElement = siblingMatTabListElement.elementRef.nativeElement as HTMLElement;

    if (this.elementRef.nativeElement.classList.contains(MATERIAL_CLASSES.matTabNavBarNavigationControlsEnabled)) {
      if (hide) {
        matTabListElement.classList.add('uk2-no-spacing');
        htmlElementRef.classList.add('uk2-hide');
        setTimeout(() => {
          htmlElementRef.classList.remove('uk2-show');
        }, this.animationValues.hide);
      } else {
        htmlElementRef.classList.remove('uk2-hide');
        matTabListElement.classList.remove('uk2-no-spacing');
        setTimeout(() => {
          htmlElementRef.classList.add('uk2-show');
        }, this.animationValues.show);
      }
    }
  }

  /**
   * queries the first and last tab links of the mat-tab-nav-bar references
   * to later be used to check if the first and last tab links are within the render constrains
   * to either hide or show a navigation button
   * @returns an object of type {@link Uk2MatTabLinks}
   */
  private getFirstAndLastTabLinks(): Uk2MatTabLinks {
    const first = this.childTabs?.first;
    const last = this.childTabs?.last;

    return {
      first,
      last,
    };
  }

  /**
   * Returns the left and right constrains for the tab render area
   * since the left and right buttons are not part of the tab list on it self but are siblings
   * which are positioned on top of the tab list to create the effect of the tabs being behind them
   * with transparency background the actual width of the tab bar where the tab link items are being rendered
   * is the space between the central edges of left and right buttons
   *
   * @param leftButton {@link Element}
   * @param rightButton {@link Element}
   * @returns an object of type{@link Uk2TabsRenderSafeZone}
   */
  private calculateTabRenderConstrains(leftButton: Element | null, rightButton: Element | null): Uk2TabsRenderSafeZone {
    const left = leftButton?.getBoundingClientRect().right ?? 0;
    const right = rightButton?.getBoundingClientRect().left ?? 0;

    return {
      left,
      right,
    };
  }
}
