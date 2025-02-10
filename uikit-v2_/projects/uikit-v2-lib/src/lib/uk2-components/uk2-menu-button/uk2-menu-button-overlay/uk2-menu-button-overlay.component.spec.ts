import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  BlockScrollStrategy,
  CloseScrollStrategy,
  NoopScrollStrategy,
  OverlayModule,
  RepositionScrollStrategy,
} from '@angular/cdk/overlay';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { Uk2DirectivesModule, Uk2MenuListItemModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';

import { Uk2MenuButtonOverlayComponent } from './uk2-menu-button-overlay.component';
import { Uk2BottomSheetModule } from '../../uk2-bottom-sheet';
import { ElementRef, SimpleChange, SimpleChanges } from '@angular/core';
import { Uk2MenuButtonCSSProperty } from '../types';
import { Uk2MenuButtonScrollStrategy, Uk2MenuButtonSelectionTypeEnum } from '../enums';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('Uk2MenuButtonOverlayComponent', () => {
  let fixture: ComponentFixture<Uk2MenuButtonOverlayComponent>;
  let component: Uk2MenuButtonOverlayComponent;
  let menuButton: ElementRef;

  beforeAll(() => {
    menuButton = createButton();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2MenuButtonOverlayComponent],
      imports: [
        NoopAnimationsModule,
        OverlayModule,
        MatBottomSheetModule,
        MatRadioModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        Uk2BottomSheetModule,
        Uk2DirectivesModule,
        Uk2MenuListItemModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2MenuButtonOverlayComponent);
    component = fixture.componentInstance;
    component.menuButton = menuButton;

    fixture.detectChanges();
  });

  describe('mobile size - bottom sheet', () => {
    beforeEach(() => {
      component.isMobileSize = true;
      fixture.detectChanges();
    });

    it('should open bottom sheet calling open method', () => {
      component.open();
      fixture.detectChanges();

      expect(document.querySelector('mat-bottom-sheet-container')).toBeTruthy();
    });

    it('should close bottom sheet calling close method', () => {
      component.open();
      fixture.detectChanges();
      const dismissSpy = spyOn((component as any).matBottomSheetRef, 'dismiss');
      component.close();
      fixture.detectChanges();

      expect(dismissSpy).toHaveBeenCalled();
    });

    it('should emit multipleOptionsSelect when method handleBottomSheetApplyButton is called', () => {
      const spy = spyOn(component.multipleOptionsSelect, 'emit');
      component.handleBottomSheetApplyButton();

      expect(spy).toHaveBeenCalled();
    });

    it('should return true if some item in uk2ItemList is selected calling isAnyOptionSelected', () => {
      component.uk2ItemList = [
        {
          isSelected: false,
          text: 'Option 1',
          value: '1',
        },
        {
          isSelected: true,
          text: 'Option 2',
          value: '2',
        },
      ];

      expect(component.isAnyOptionSelected()).toBeTrue();
    });

    it('should return false if none of the items in uk2ItemList is selected calling isAnyOptionSelected', () => {
      component.uk2ItemList = [
        {
          isSelected: false,
          text: 'Option 1',
          value: '1',
        },
        {
          isSelected: false,
          text: 'Option 2',
          value: '2',
        },
      ];

      expect(component.isAnyOptionSelected()).toBeFalse();
    });

    it('should emit multipleOptionsSelected when you click on multiple option in bottom sheet', fakeAsync(() => {
      component.uk2ItemList = [
        {
          isSelected: false,
          text: 'Option 1',
          value: '1',
        },
        {
          isSelected: false,
          text: 'Option 2',
          value: '2',
        },
      ];
      component.isMobileSize = true;
      component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
      fixture.detectChanges();

      component.open();
      fixture.detectChanges();
      tick();

      const firstOption = document.querySelector('.uk2-menu-button-item.multiple-selection-item') as HTMLElement;
      firstOption.click();

      expect(component['localUk2ItemList'][0].isSelected).toBeTrue();
    }));

    it('should close overlay/bottom sheet if window resize', () => {
      const closeSpy = spyOn(component, 'close');

      component.ngOnInit();
      window.dispatchEvent(new Event('resize'));

      expect(closeSpy).toHaveBeenCalled();
    });
  });
  describe('desktop size - overlay', () => {
    beforeEach(() => {
      component.isMobileSize = false;
      fixture.detectChanges();
    });

    it('should open overlay calling open method', () => {
      component.open();
      fixture.detectChanges();

      expect(document.querySelector('.cdk-overlay-pane')).toBeTruthy();
    });

    it('should not re-open overlay if it is already open', () => {
      const createFlyoutContainerSpy = spyOn(component as any, 'createFlyoutContainer').and.callThrough();

      component.open();
      fixture.detectChanges();
      component.open();
      fixture.detectChanges();

      expect(document.querySelector('.cdk-overlay-pane')).toBeTruthy();
      expect(createFlyoutContainerSpy).toHaveBeenCalledTimes(1);
    });

    it('should call flyoutOverlayReference.overlayElement.style.setProperty to set portal outlet css properties', () => {
      const propertiesList: Uk2MenuButtonCSSProperty[] = [
        {
          name: '--black',
          value: '#000',
        },
      ];

      component.open();
      fixture.detectChanges();
      const setPropertySpy = spyOn((component as any).flyoutOverlayReference.overlayElement.style, 'setProperty');
      component['setPortalOutletCSSVariables'](propertiesList);

      expect(setPropertySpy).toHaveBeenCalled();
    });

    it('should not flyoutOverlayReference.overlayElement.style.setProperty to set portal outlet css properties', () => {
      const propertiesList: Uk2MenuButtonCSSProperty[] = [];

      component.open();
      fixture.detectChanges();
      const setPropertySpy = spyOn((component as any).flyoutOverlayReference.overlayElement.style, 'setProperty');
      component['setPortalOutletCSSVariables'](propertiesList);
      expect(setPropertySpy).not.toHaveBeenCalled();
    });

    it('should be called on ngOnChanges when change for uk2CSSPortalProperties is provided', () => {
      const uk2CSSPortalProperties = new SimpleChange(undefined, [], true);
      const simpleChanges: SimpleChanges = {
        uk2CSSPortalProperties,
      };
      const spy = spyOn(component as any, 'setPortalOutletCSSVariables');
      component.ngOnChanges(simpleChanges);
      expect(spy).toHaveBeenCalled();
    });

    it('should not be called on ngOnChanges when change for uk2CSSPortalProperties is provided', () => {
      const simpleChanges: SimpleChanges = {};
      const spy = spyOn(component as any, 'setPortalOutletCSSVariables');
      component.ngOnChanges(simpleChanges);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not prevent backdrop click event to close flyout if uk2BackdropIsEnabled is false', () => {
      component.uk2BackdropIsEnabled = false;

      const spy = spyOn(component as any, 'handleBackdropClickEventToPreventCloseFlyout');
      component.open();
      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not prevent backdrop click event to close flyout if uk2ButtonType is multiple', () => {
      component.uk2BackdropCanBeClosedWhenHasBeenClicked = false;
      component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;

      const spy = spyOn(component as any, 'handleBackdropClickEventToPreventCloseFlyout');
      component.open();
      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should prevent backdrop click event to close flyout if uk2ButtonType is single', () => {
      component.uk2BackdropCanBeClosedWhenHasBeenClicked = false;
      component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.single;

      const spy = spyOn(component as any, 'handleBackdropClickEventToPreventCloseFlyout').and.callThrough();
      component.open();
      fixture.detectChanges();
      component.flyoutOverlayReference?.backdropElement?.dispatchEvent(new MouseEvent('click'));

      expect(spy).toHaveBeenCalled();
    });

    it('should emit selectOptionIndex when you click on an option', () => {
      component.uk2ItemList = [
        {
          isSelected: false,
          text: 'Option 1',
          value: '1',
        },
        {
          isSelected: false,
          text: 'Option 2',
          value: '2',
        },
      ];

      const spy = spyOn(component.selectOptionIndex, 'emit');
      component.open();
      fixture.detectChanges();
      const option = document.querySelector('.uk2-menu-button-item');
      option?.dispatchEvent(new MouseEvent('click'));

      expect(spy).toHaveBeenCalled();
    });

    it('should emit selectOptionIndex when you click on an option in button type multiple', () => {
      component.uk2ItemList = [
        {
          isSelected: false,
          text: 'Option 1',
          value: '1',
        },
        {
          isSelected: false,
          text: 'Option 2',
          value: '2',
        },
      ];
      component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;

      const spy = spyOn(component.selectOptionIndex, 'emit');
      component.open();
      fixture.detectChanges();
      const option = document.querySelector('.uk2-menu-button-item');
      option?.dispatchEvent(new MouseEvent('click'));

      expect(spy).toHaveBeenCalled();
    });

    it('should return correct scroll strategy', () => {
      component.uk2ScrollStrategy = Uk2MenuButtonScrollStrategy.noop;
      expect(component['getScrollStrategy']()).toBeInstanceOf(NoopScrollStrategy);
      component.uk2ScrollStrategy = Uk2MenuButtonScrollStrategy.close;
      expect(component['getScrollStrategy']()).toBeInstanceOf(CloseScrollStrategy);
      component.uk2ScrollStrategy = Uk2MenuButtonScrollStrategy.block;
      expect(component['getScrollStrategy']()).toBeInstanceOf(BlockScrollStrategy);
      component.uk2ScrollStrategy = Uk2MenuButtonScrollStrategy.reposition;
      expect(component['getScrollStrategy']()).toBeInstanceOf(RepositionScrollStrategy);
      component.uk2ScrollStrategy = undefined as any;
      expect(component['getScrollStrategy']()).toBeInstanceOf(NoopScrollStrategy);
    });

    it('should close a flyout menu when clicking outside of the flyout menu', () => {
      component.open();
      fixture.detectChanges();
      const disposeSpy = spyOn((component as any).flyoutOverlayReference, 'dispose');
      document.dispatchEvent(new Event('click'));

      expect(disposeSpy).toHaveBeenCalled();
      expect(component.flyoutIsOpen).toBeFalse();
    });

    it('it should not listen to overlays backdrop click if overlayReference is undefined', () => {
      component['flyoutOverlayReference'] = undefined;

      component['handleBackdropClickEventToPreventCloseFlyout']();

      expect(component['flyoutOverlayReference']).toBeUndefined();
    });

    it('should emit listOrdered output when onItemsReordered() is called', () => {
      spyOn(component.listOrdered, 'emit');
      const eventMock: CdkDragDrop<string[]> = {
        previousIndex: 0,
        currentIndex: 1,
      } as CdkDragDrop<string[]>;
      component.localUk2ItemList = [...Array(12)].map((_, i) => ({
        text: `Lorem Ipsum ${i + 1}`,
        isSelected: true,
        value: 'test',
      }));
      component.onItemsReordered(eventMock);
      expect(component.listOrdered.emit).toHaveBeenCalled();
    });

    it('should set max-height styles when updateOverlayListMaxHeight() is called and enableListScrolling and listScrollingMaxHeight have proper values', () => {
      spyOn(component['renderer'], 'setStyle');
      const containerElementMock = document.createElement('div');
      containerElementMock.classList.add('uk2-menu-list-container');
      document.body.appendChild(containerElementMock);
      component.enableListScrolling = true;
      component.listScrollingMaxHeight = 360;
      component['updateOverlayListMaxHeight']();
      expect(component['renderer'].setStyle).toHaveBeenCalled();
    });
  });
});

function createButton(): ElementRef {
  const button = document.createElement('button');
  button.innerText = 'Menu Button';
  document.body.appendChild(button);
  return { nativeElement: button };
}
