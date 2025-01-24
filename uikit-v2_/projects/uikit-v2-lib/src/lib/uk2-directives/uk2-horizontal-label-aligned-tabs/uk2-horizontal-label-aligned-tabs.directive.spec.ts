import { ComponentRef, ElementRef, SimpleChange, ViewContainerRef } from "@angular/core";
import { Uk2HorizontalLabelAlignedTabsDirective } from "./uk2-horizontal-label-aligned-tabs.directive";
import { fakeAsync, tick } from "@angular/core/testing";
import { MatIcon } from "@angular/material/icon";
import { Uk2Tier1AlertsEnum } from "../../uk2-services";
import { Uk2HorizontalLabelTabsSizeConstrains } from "./types";
import { UK2_BREAKPOINTS, Uk2DestroyService } from "../../uk2-internal-utils";
import { MatTabLink } from "@angular/material/tabs";
import { fromEvent, of, PartialObserver } from "rxjs";
import { uk2HorizontalLabelAlignedTabsSyntheticMutationFactory } from "./functions";


describe('Uk2HorizontalLabelAlignedTabsDirective', () => {
  let uk2HorizontalLabelAlignedTabsDirective: Uk2HorizontalLabelAlignedTabsDirective;
  let elementRef: ElementRef<HTMLDivElement>;
  let mockedViewContainerRefInstance: jasmine.SpyObj<ViewContainerRef>;
  let subscriberSpies: PartialObserver<MutationRecord[]>;
  beforeEach(() => {
    subscriberSpies = jasmine.createSpyObj<PartialObserver<MutationRecord[]>>('subscriberSpies',['next', 'error', 'complete']);

    // create a ViewContainerRef instance
    mockedViewContainerRefInstance = jasmine.createSpyObj('ViewContainerRef', ['createComponent']);
    elementRef = new ElementRef(document.createElement('div'));
    uk2HorizontalLabelAlignedTabsDirective = new Uk2HorizontalLabelAlignedTabsDirective(
      elementRef,
      mockedViewContainerRefInstance,
      new Uk2DestroyService(),
    );
    uk2HorizontalLabelAlignedTabsDirective.stretchedTabs = false;
  })

  it('should create an instance', () => {
    expect(uk2HorizontalLabelAlignedTabsDirective).toBeTruthy();
  });

  it('should attach uk2 look and feel on initialization', () => {
    // @ts-ignore
    spyOn(uk2HorizontalLabelAlignedTabsDirective, 'queryHorizontalScrollElement').and.returnValue(document.createElement('div'));
    spyOn(uk2HorizontalLabelAlignedTabsDirective, 'attachUk2LookAndFeel');
    uk2HorizontalLabelAlignedTabsDirective.ngOnInit();
    expect(uk2HorizontalLabelAlignedTabsDirective.attachUk2LookAndFeel).toHaveBeenCalled();
  });

  it('should validate loading state on initialization', () => {
    // @ts-ignore
    spyOn(uk2HorizontalLabelAlignedTabsDirective, 'queryHorizontalScrollElement').and.returnValue(document.createElement('div'));
    // @ts-ignore
    spyOn(uk2HorizontalLabelAlignedTabsDirective, 'listenToResizeEvents');
    uk2HorizontalLabelAlignedTabsDirective.ngOnInit();
    // @ts-ignore
    expect(uk2HorizontalLabelAlignedTabsDirective.listenToResizeEvents).toHaveBeenCalled();
  });

  it('should add loading state css class when uk2IsLoading is updated to true',() => {
    spyOn(uk2HorizontalLabelAlignedTabsDirective, 'setLoadingState').and.callThrough();
    const changes = {
      uk2IsLoading: new SimpleChange(false, true, true),
    };
    uk2HorizontalLabelAlignedTabsDirective.ngOnChanges(changes);
    expect(uk2HorizontalLabelAlignedTabsDirective.setLoadingState).toHaveBeenCalledWith(changes.uk2IsLoading);
    expect(elementRef.nativeElement.classList).toContain('uk2-horizontal-tabs__loading');
  });

  it('should have uk2IsLoading value set as false by default', () => {
    expect(uk2HorizontalLabelAlignedTabsDirective.uk2IsLoading).toBeFalse();
  });

  it('should set uk2 look and feel', () => {
    uk2HorizontalLabelAlignedTabsDirective.attachUk2LookAndFeel();
    expect(elementRef.nativeElement.classList).toContain('uk2-horizontal-tabs');
  });

  it('should add the loading state css class to the element', () => {
    const uk2IsLoading = new SimpleChange(false, true, true);
    uk2HorizontalLabelAlignedTabsDirective.setLoadingState(uk2IsLoading);
    expect(elementRef.nativeElement.classList).toContain('uk2-horizontal-tabs__loading');
  });

  it('should remove the loading state css class to the element', () => {
    const uk2IsLoading = new SimpleChange(true, false, true);
    uk2HorizontalLabelAlignedTabsDirective.setLoadingState(uk2IsLoading);
    expect(elementRef.nativeElement.classList).not.toContain('uk2-horizontal-tabs__loading');
  });

  it('should not update skeleton state of the previous value and the current value are the same', () => {
    const uk2IsLoading = new SimpleChange(false, false, false);
    uk2HorizontalLabelAlignedTabsDirective.setLoadingState(uk2IsLoading);
    expect(elementRef.nativeElement.classList).not.toContain('uk2-horizontal-tabs__loading');
  })

  it('should add a given number of skeleton tab nodes to element', () => {
    const element = document.createElement('div');
    const amount = 3;
    uk2HorizontalLabelAlignedTabsDirective.createLoadingTabNodes(element, amount);
    expect(element.querySelectorAll('.uk2-horizontal-skeleton-tab').length).toBe(amount);
  });

  it('should remove all the skeleton tab nodes from an element element', () => {
    const element = document.createElement('div');
    const amount = 3;
    uk2HorizontalLabelAlignedTabsDirective.createLoadingTabNodes(element, amount);
    expect(element.querySelectorAll('.uk2-horizontal-skeleton-tab').length).toBe(amount);
    uk2HorizontalLabelAlignedTabsDirective.removeLoadingTabNodes(element);
    expect(element.querySelectorAll('.uk2-horizontal-skeleton-tab').length).toBe(0);
  });

  it('should update the number of tab skeleton nodes rendered on the view [xs]', fakeAsync(() => {
    // @ts-ignore
    spyOn(uk2HorizontalLabelAlignedTabsDirective, 'calculateTabNodesToRender');
    spyOn(uk2HorizontalLabelAlignedTabsDirective, 'removeLoadingTabNodes');
    spyOn(uk2HorizontalLabelAlignedTabsDirective, 'createLoadingTabNodes');

    const elementSpy = jasmine.createSpyObj('elementSpy', ['clientWidth', 'querySelectorAll', 'appendChild'], {
      clientWidth: 100,
      querySelectorAll: () => new Set(),
    })
    // @ts-ignore
    uk2HorizontalLabelAlignedTabsDirective.elementRef.nativeElement = elementSpy
    expect(uk2HorizontalLabelAlignedTabsDirective.elementRef.nativeElement.clientWidth).toBe(100);
    // @ts-ignore
    uk2HorizontalLabelAlignedTabsDirective.listenToResizeEvents();
    uk2HorizontalLabelAlignedTabsDirective.uk2IsLoading = true;
    window.dispatchEvent(new Event('resize'));
    tick(400);
    // @ts-ignore
    expect(uk2HorizontalLabelAlignedTabsDirective.calculateTabNodesToRender).toHaveBeenCalled();
    expect(uk2HorizontalLabelAlignedTabsDirective.removeLoadingTabNodes).toHaveBeenCalled();
    expect(uk2HorizontalLabelAlignedTabsDirective.createLoadingTabNodes).toHaveBeenCalled();

  }));

  it('should return the number of tab skeleton nodes to render based on the width of the element [md-breakpoint]', () => {
    const containerWidth = 1000;
    // @ts-ignore
    const mdConstrains = uk2HorizontalLabelAlignedTabsDirective.uk2skeletonTabSizeConstrains.get('md')!;
    // @ts-ignore
    const nodesToRender = uk2HorizontalLabelAlignedTabsDirective.calculateTabNodesToRender(containerWidth);
    expect(nodesToRender).toBe(mdConstrains.tabsToRender);
  });

  it('should return the number of tab skeleton 5 nodes to render based on the width of the element [md-breakpoint] even if md breakpoint has nullish number of nodes to render', () => {
    // @ts-ignore
    uk2HorizontalLabelAlignedTabsDirective.uk2skeletonTabSizeConstrains = new Map<string, Uk2HorizontalLabelTabsSizeConstrains>([
      [
        'xs',
        {
          breakpoint: UK2_BREAKPOINTS.xs,
          tabsToRender: null as unknown as number,
        },
      ],
      [
        'md',
        {
          breakpoint: UK2_BREAKPOINTS.md,
          tabsToRender: null as unknown as number,
        },
      ],
    ]);
    const containerWidth = 1000;
    // @ts-ignore
    const nodesToRender = uk2HorizontalLabelAlignedTabsDirective.calculateTabNodesToRender(containerWidth);
    expect(nodesToRender).toBe(5);
  });

  it('should emit MutationRecord[] on transitionend event', (done) => {
    const mockElement = document.createElement('div');
    spyOn(fromEvent as any, 'call').and.returnValue(of({ target: mockElement } as unknown as TransitionEvent));
    // @ts-ignore
    uk2HorizontalLabelAlignedTabsDirective.getVirtualTabsScrollTransitionEndChanges(mockElement).subscribe((result) => {
      expect(result).toEqual(uk2HorizontalLabelAlignedTabsSyntheticMutationFactory(mockElement));
      done();
    });

    // Simulate transitionend event
    const event = new Event('transitionend');
    mockElement.dispatchEvent(event);
  });

  it('should return the number of tab skeleton nodes to render based on the width of the element [xs-breakpoint]', () => {
    const containerWidth = 300;
    // @ts-ignore
    const xsConstrains = uk2HorizontalLabelAlignedTabsDirective.uk2skeletonTabSizeConstrains.get('xs')!;
    // @ts-ignore
    const nodesToRender = uk2HorizontalLabelAlignedTabsDirective.calculateTabNodesToRender(containerWidth);
    expect(nodesToRender).toBe(xsConstrains.tabsToRender);
  });

  it('should return the number of tab skeleton 3 nodes to render based on the width of the element [xs-breakpoint] even if xs breakpoint has nullish number of nodes to render', () => {
    // @ts-ignore
    uk2HorizontalLabelAlignedTabsDirective.uk2skeletonTabSizeConstrains = new Map<string, Uk2HorizontalLabelTabsSizeConstrains>([
      [
        'xs',
        {
          breakpoint: UK2_BREAKPOINTS.xs,
          tabsToRender: null as unknown as number,
        },
      ],
      [
        'md',
        {
          breakpoint: UK2_BREAKPOINTS.md,
          tabsToRender: null as unknown as number,
        },
      ],
    ]);
    const containerWidth = 300;
    // @ts-ignore
    const nodesToRender = uk2HorizontalLabelAlignedTabsDirective.calculateTabNodesToRender(containerWidth);
    expect(nodesToRender).toBe(3);
  });

  it('should create a ComponentRef<MatIcon>', () => {
    const iconComponentSpy = jasmine.createSpyObj<ComponentRef<MatIcon>>('ComponentRefIconSpy', [
      'setInput',
    ]);
    mockedViewContainerRefInstance.createComponent.and.returnValue(iconComponentSpy);
    // @ts-ignore
    const result = uk2HorizontalLabelAlignedTabsDirective.uk2MatIconFactory(Uk2Tier1AlertsEnum.checkCircle);
    expect(mockedViewContainerRefInstance.createComponent).toHaveBeenCalled();
    expect(iconComponentSpy.setInput).toHaveBeenCalledWith('svgIcon',Uk2Tier1AlertsEnum.checkCircle);
    expect(result).toBeDefined();
  });

  it('should retrieve an icon component if exists and update the icon', () => {
    const iconToUpdate = 'uk2LeftButtonIcon';
    const iconComponentSpy = jasmine.createSpyObj<ComponentRef<MatIcon>>('ComponentRefIconSpy', [
      'setInput',
    ]);
    // @ts-ignore
    uk2HorizontalLabelAlignedTabsDirective.uk2MatIconButtonElements.set('uk2LeftButtonIcon', iconComponentSpy);
    // @ts-ignore
    uk2HorizontalLabelAlignedTabsDirective.updateButtonIcon(iconToUpdate, Uk2Tier1AlertsEnum.checkCircle);
    expect(iconComponentSpy.setInput).toHaveBeenCalledWith('svgIcon', Uk2Tier1AlertsEnum.checkCircle);
  })

  it('should create icon component for both left and right navigation buttons', () => {
    // mocks for creating mocked mat-icon components that will be added to the buttons
    const iconComponentSpy = jasmine.createSpyObj<ComponentRef<MatIcon>>('ComponentRefIconSpy', [
      'setInput',
      'location',
    ], {
      location: {
        nativeElement: document.createElement('div')
      }
    });
    mockedViewContainerRefInstance.createComponent.and.returnValue(iconComponentSpy);
    const leftButton = createHorizontalButtonWithOGIcon('mat-mdc-tab-header-pagination-before');
    const rightButton = createHorizontalButtonWithOGIcon('mat-mdc-tab-header-pagination-after');
    uk2HorizontalLabelAlignedTabsDirective.elementRef.nativeElement.appendChild(leftButton);
    uk2HorizontalLabelAlignedTabsDirective.elementRef.nativeElement.appendChild(rightButton);
    // @ts-ignore
    const leftUk2MatIconRef = uk2HorizontalLabelAlignedTabsDirective.uk2MatIconButtonElements.get('uk2LeftButtonIcon');
    // @ts-ignore
    const rightUk2MatIconRef = uk2HorizontalLabelAlignedTabsDirective.uk2MatIconButtonElements.get('uk2RightButtonIcon');
    // @ts-ignore
    const getUk2MatIconSpy = spyOn(uk2HorizontalLabelAlignedTabsDirective.uk2MatIconButtonElements, 'get').and.callThrough();
    // @ts-ignore
    uk2HorizontalLabelAlignedTabsDirective.updateNavigationButtonIconsLookAndFeel();
    expect(leftUk2MatIconRef).toBeDefined();
    expect(rightUk2MatIconRef).toBeDefined();
    // while updating the look and feel we need to look for both buttons left and right and update their icons
    expect(getUk2MatIconSpy).toHaveBeenCalledTimes(4);
  });

  it('should remove original fake icons provided by mat-icon', () => {
    // add fake buttons to mocked elementRef
    const mockedLeftButton = createHorizontalButtonWithOGIcon('mat-mdc-tab-header-pagination-before');
    const mockedRightButton = createHorizontalButtonWithOGIcon('mat-mdc-tab-header-pagination-after');
    uk2HorizontalLabelAlignedTabsDirective.elementRef.nativeElement.appendChild(mockedLeftButton);
    uk2HorizontalLabelAlignedTabsDirective.elementRef.nativeElement.appendChild(mockedRightButton);
    // remove fake icon nodes from buttons
    uk2HorizontalLabelAlignedTabsDirective.searchAndDestroyFakeIcons();

    // buttons should not be removed but the icons on them
    const buttons = uk2HorizontalLabelAlignedTabsDirective.elementRef.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    // original icons should be removed
    const icons = uk2HorizontalLabelAlignedTabsDirective.elementRef.nativeElement.querySelectorAll('.mat-mdc-tab-header-pagination-chevron');
    expect(icons.length).toBe(0);
  });

  it('should return null if no horizontal scroll trail element is found', () => {
    // @ts-ignore
    const result = uk2HorizontalLabelAlignedTabsDirective.queryHorizontalScrollElement();
    expect(result).toBeUndefined();
  });

  it('should do early return if no button is provided', () => {
    // @ts-ignore
    const toggleAction = () => uk2HorizontalLabelAlignedTabsDirective.toggleNavigationButtonVisibility(
      false,
      null,
      {} as MatTabLink,
    );
    expect(toggleAction).not.toThrow();
  });

  it('should do early return if no mat tab link is provided with a truthy value', () => {
    const mockedElement = document.createElement('button');
    // @ts-ignore
    const toggleAction = () => uk2HorizontalLabelAlignedTabsDirective.toggleNavigationButtonVisibility(
      false,
      mockedElement,
      undefined as unknown as MatTabLink,
    );
    expect(toggleAction).not.toThrow();
  });

  it('should toggle button make visible', (done) => {
    spyOn(uk2HorizontalLabelAlignedTabsDirective.elementRef.nativeElement.classList, 'contains').and.returnValue(true);
    const hide = false;
    const button = document.createElement('button');
    const matTabLink = {
      elementRef: new ElementRef(document.createElement('div')),
    };
    // @ts-ignore
    uk2HorizontalLabelAlignedTabsDirective.toggleNavigationButtonVisibility(hide, button, matTabLink);
    setTimeout(() => {
      const buttonIsVisible = button.classList.contains('uk2-show');
      const buttonIsNotVisible = button.classList.contains('uk2-hide');
      const matTabLinkHasNoSpacing = matTabLink.elementRef.nativeElement.classList.contains('uk2-no-spacing');
      expect(buttonIsVisible).toBeTrue();
      expect(buttonIsNotVisible).toBeFalse();
      expect(matTabLinkHasNoSpacing).toBeFalse();
      done();
    }, 100)
  });

  it('should toggle button make invisible', (done) => {
    spyOn(uk2HorizontalLabelAlignedTabsDirective.elementRef.nativeElement.classList, 'contains').and.returnValue(true);
    const hide = true;
    const button = document.createElement('button');
    const matTabLink = {
      elementRef: new ElementRef(document.createElement('div')),
    };
    // @ts-ignore
    uk2HorizontalLabelAlignedTabsDirective.toggleNavigationButtonVisibility(hide, button, matTabLink);
    setTimeout(() => {
      const buttonIsVisible = button.classList.contains('uk2-show');
      const buttonIsNotVisible = button.classList.contains('uk2-hide');
      const matTabLinkHasNoSpacing = matTabLink.elementRef.nativeElement.classList.contains('uk2-no-spacing');
      expect(buttonIsVisible).toBeFalse();
      expect(buttonIsNotVisible).toBeTrue();
      expect(matTabLinkHasNoSpacing).toBeTrue();
      done();
    }, 100)
  });


});
/**
 * Creates a horizontal button with the original icon icon class from angular material
 *
 * @param buttonClass string
 * @returns a {@link HTMLButtonElement}
 */
function createHorizontalButtonWithOGIcon(buttonClass: 'mat-mdc-tab-header-pagination-before' | 'mat-mdc-tab-header-pagination-after'): HTMLButtonElement {
  const button = document.createElement('button');
  button.classList.add(buttonClass)
  const icon = document.createElement('div');
  icon.classList.add('mat-mdc-tab-header-pagination-chevron');
  button.appendChild(icon);
  return button;
}
