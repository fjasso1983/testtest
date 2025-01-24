import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Overlay } from '@angular/cdk/overlay';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { of } from 'rxjs';

import { Uk2MenuButtonComponent } from './uk2-menu-button.component';
import { Uk2DirectivesModule } from '../../uk2-directives';
import { Uk2Tier1UtilityEnum } from '../../uk2-services';
import { MATERIAL_CLASSES } from '../../uk2-internal-utils';
import { Uk2MenuButtonScrollStrategy, Uk2MenuButtonSelectionTypeEnum } from './enums';
import { Uk2MenuButtonItem } from './types';
import { uk2MenuButtonConstants } from './constants';
import { Uk2MenuButtonOverlayComponent } from './uk2-menu-button-overlay/uk2-menu-button-overlay.component';

const mockItems: Uk2MenuButtonItem[] = [
  {
    text: 'Lorem Ipsum 1',
    isSelected: false,
    value: '1',
  },
  {
    text: 'Lorem Ipsum 2',
    isSelected: false,
    value: '2',
  },
  {
    text: 'Lorem Ipsum 3',
    isSelected: false,
    value: '3',
  },
  {
    text: 'Lorem Ipsum 4',
    isSelected: false,
    value: '4',
  },
];

let mockOverlayPositionBuilder = {
  flexibleConnectedTo: () => {
    return {
      withPositions: () => {},
    };
  },
};

let mockOverlayCreate = {
  dispose: () => {},
  attach: () => {},
};

let mockOverlay = jasmine.createSpyObj('Overlay', ['position', 'scrollStrategies', 'create', 'dispose']);
mockOverlay.position.and.returnValue(mockOverlayPositionBuilder);
mockOverlay.create.and.returnValue(mockOverlayCreate);
mockOverlay.scrollStrategies = {
  block: () => {},
  close: () => {},
  noop: () => {},
  reposition: () => {},
};

@Component({
  template: `
    <uk2-menu-button>
      <mat-icon [svgIcon]="filterIcon"></mat-icon>
    </uk2-menu-button>
  `,
})
class MenuButtonTestComponent {
  filterIcon: any = Uk2Tier1UtilityEnum.filterFunnel;
}
describe('Uk2MenuButtonComponent', () => {
  let fixture: ComponentFixture<MenuButtonTestComponent>;
  let component: Uk2MenuButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatIconTestingModule,
        MatButtonModule,
        MatBadgeModule,
        Uk2DirectivesModule,
        MatBottomSheetModule,
      ],
      declarations: [Uk2MenuButtonComponent, MenuButtonTestComponent, Uk2MenuButtonOverlayComponent],
      providers: [{ provide: Overlay, useValue: mockOverlay }, BreakpointObserver],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuButtonTestComponent);
    component = fixture.debugElement.children[0].componentInstance;

    component.uk2ItemList = mockItems.map((item: Uk2MenuButtonItem) => {
      return { ...item, isSelected: false };
    });
    component.ngOnChanges({
      uk2ItemList: new SimpleChange([], mockItems, true),
    });
    component.ngAfterContentInit();
    fixture.detectChanges();
  });

  describe('[setPortalOutletCSSVariables]', () => {
    let overLayElementStyleSpy;
    beforeEach(() => {
      overLayElementStyleSpy = {
        overlayElement: {
          style: {
            setProperty: jasmine.createSpy('setPropertySpy'),
          },
        },
      };
      // component['flyoutOverlayReference'] = overLayElementStyleSpy as unknown as OverlayRef;
    });
  });

  it('should have menu item content class set as "uk2-custom-menu-item-content__16-16" by default', () => {
    const element = fixture.debugElement.query(By.css('.uk2-custom-menu-item-content__16-16'));
    expect(element).toBeDefined();
  });

  it('should have menu item content divider class set as "uk2-custom-menu-item-content-divider__16-16" by default', () => {
    const element = fixture.debugElement.query(By.css('.uk2-custom-menu-item-content-divider__16-16'));
    expect(element).toBeDefined();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have isIconOnly defined as false by default', () => {
    expect(component.uk2IsIconOnly).toBeFalse();
  });

  it('should have displayBorder defined as true by default', () => {
    expect(component.uk2DisplayBorder).toBeTrue();
  });

  it('should change the label of the menu button to the selected item', () => {
    const closeFlyoutSpy = spyOn(component.uk2MenuButtonOverlayComponent, 'close');
    const labelElement = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.buttonLabel}`)).nativeElement;
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.single;

    component.selectOption(1);
    fixture.detectChanges();

    const labelText = labelElement.innerText.trim();
    expect(closeFlyoutSpy).toHaveBeenCalled();
    expect(labelText).toBe(mockItems[1].text);
  });

  it('should change the label of the menu button to the uk2ActiveStateText text when selecting multiple items', () => {
    const labelElement = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.buttonLabel}`)).nativeElement;
    const pluralText = 'Filtered';
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
    component.uk2ActiveStateText = pluralText;

    component.selectOption(1);
    component.selectOption(2);
    component.selectOption(3);
    fixture.detectChanges();

    const labelText = labelElement.innerText.trim();
    expect(labelText).toBe(pluralText);
  });

  it('should change the label of the menu button back to the intial label when deselecting items', () => {
    const defaultText = 'Filter';
    const labelElement = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.buttonLabel}`)).nativeElement;
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
    component.uk2DefaultStateText = defaultText;
    component.selectOption(1);
    fixture.detectChanges();

    expect(labelElement.innerText.trim()).not.toBe(defaultText);
    component.selectOption(1);
    fixture.detectChanges();
    expect(labelElement.innerText.trim()).toBe(defaultText);
  });

  it('should emit a selected single item', () => {
    spyOn(component.uk2OnItemSelected, 'emit');
    const closeFlyoutSpy = spyOn(component.uk2MenuButtonOverlayComponent, 'close');
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.single;
    component.selectOption(1);
    const expectedSelection = [
      {
        ...mockItems[1],
        isSelected: true,
      },
    ];
    expect(closeFlyoutSpy).toHaveBeenCalled();
    expect(component.uk2OnItemSelected.emit).toHaveBeenCalledWith(expectedSelection);
  });

  it('should emit the selected multiple items', () => {
    spyOn(component.uk2OnItemSelected, 'emit');
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
    const expectedSelection = [
      { ...mockItems[1], isSelected: true },
      { ...mockItems[2], isSelected: true },
    ];

    component.selectOption(1);
    component.selectOption(2);

    expect(component.uk2OnItemSelected.emit).toHaveBeenCalledWith(expectedSelection);
  });

  it("should add an 'active' class to the button when a single item is selected", () => {
    const closeFlyoutSpy = spyOn(component.uk2MenuButtonOverlayComponent, 'close');
    const buttonElement = component.button!.nativeElement;
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.single;

    expect(buttonElement.classList.contains('active')).toBeFalse();
    component.selectOption(1);
    fixture.detectChanges();
    expect(closeFlyoutSpy).toHaveBeenCalled();
    expect(buttonElement.classList.contains('active')).toBeTrue();
  });

  it("should add an 'active' class to the button when multiple items are selected", () => {
    const buttonElement = component.button!.nativeElement;
    const closeFlyoutSpy = spyOn(component.uk2MenuButtonOverlayComponent, 'close');
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.single;

    expect(buttonElement.classList.contains('active')).toBeFalse();
    component.selectOption(1);
    component.selectOption(2);
    component.selectOption(3);
    fixture.detectChanges();
    expect(closeFlyoutSpy).toHaveBeenCalledTimes(3);
    expect(buttonElement.classList.contains('active')).toBeTrue();
  });

  it("should remove an 'active' class to the button when a single item is deselected when [uk2KeepLastSelection] is set to false", () => {
    const closeFlyoutSpy = spyOn(component.uk2MenuButtonOverlayComponent, 'close');
    const buttonElement = component.button!.nativeElement;
    component.uk2KeepLastSelection = false;
    buttonElement.classList.add('active');
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.single;
    // select option
    component.selectOption(1);
    fixture.detectChanges();
    expect(buttonElement.classList.contains('active')).toBeTrue();
    // un-select option
    component.selectOption(1);
    fixture.detectChanges();
    expect(closeFlyoutSpy).toHaveBeenCalledTimes(2);
    expect(buttonElement.classList.contains('active')).toBeFalse();
  });

  it('should not remove "active" class to the button when single item is deselected when [uk2KeepLastSelection] is set to true', () => {
    const closeFlyoutSpy = spyOn(component.uk2MenuButtonOverlayComponent, 'close');
    const buttonElement = component.button!.nativeElement;
    component.uk2KeepLastSelection = true;
    buttonElement.classList.add('active');
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.single;

    component.selectOption(1);
    fixture.detectChanges();
    expect(closeFlyoutSpy).toHaveBeenCalled();
    expect(buttonElement.classList.contains('active')).not.toBeFalse();
  });

  it("should remove an 'active' class to the button when all multiple item are deselected", () => {
    const buttonElement: HTMLElement = component.button!.nativeElement;
    buttonElement.classList.add('active');
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
    // select items
    component.selectOption(1);
    component.selectOption(2);
    fixture.detectChanges();
    expect(buttonElement.classList.contains('active')).toBeTrue();
    // un-select items
    component.selectOption(1);
    component.selectOption(2);
    fixture.detectChanges();
    expect(buttonElement.classList.contains('active')).toBeFalse();
  });

  it('should update Label button when single Option, No Items selected and Input uk2DefaultStateText change', () => {
    const labelElement = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.buttonLabel}`)).nativeElement;
    const buttonElement = component.button!.nativeElement;
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.single;
    const testItems = [
      {
        text: 'Test item 1',
        isSelected: false,
        value: 'test1',
      },
      {
        text: 'Test item 2',
        isSelected: false,
        value: 'test2',
      },
      {
        text: 'Test item 3',
        isSelected: false,
        value: 'test3',
      },
    ];

    component.uk2ItemList = testItems;
    component.ngAfterViewInit();
    component.ngOnChanges({
      uk2DefaultStateText: new SimpleChange('', 'hello', false),
    });
    const labelText = labelElement.innerText.trim();
    expect(labelText).toBe('hello');
    expect(buttonElement.classList.contains('active')).toBeFalse();
  });

  it('should update Label button when multiple Option, No Items selected and Input uk2DefaultStateText change', () => {
    const labelElement = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.buttonLabel}`)).nativeElement;
    const buttonElement = component.button!.nativeElement;
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
    const testItems = [
      {
        text: 'Test item 1',
        isSelected: false,
        value: 'test1',
      },
      {
        text: 'Test item 2',
        isSelected: false,
        value: 'test2',
      },
      {
        text: 'Test item 3',
        isSelected: false,
        value: 'test3',
      },
    ];

    component.uk2ItemList = testItems;
    component.ngAfterViewInit();
    component.ngOnChanges({
      uk2DefaultStateText: new SimpleChange('', 'hello 2', false),
    });

    const labelText = labelElement.innerText.trim();
    expect(labelText).toBe('hello 2');
    expect(buttonElement.classList.contains('active')).toBeFalse();
  });

  it('should update Label button when multiple Option, 2 or more items selected and Input uk2ActiveStateText change', () => {
    const labelElement = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.buttonLabel}`)).nativeElement;
    const buttonElement = component.button!.nativeElement;
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
    const testItems = [
      {
        text: 'Test item 1',
        isSelected: false,
        value: 'test1',
      },
      {
        text: 'Test item 2',
        isSelected: false,
        value: 'test2',
      },
      {
        text: 'Test item 3',
        isSelected: false,
        value: 'test3',
      },
    ];

    component.uk2ItemList = testItems;
    component.ngAfterViewInit();
    component.selectOption(1);
    component.selectOption(2);
    component.ngOnChanges({
      uk2ActiveStateText: new SimpleChange('', 'hello 3', false),
    });

    const labelText = labelElement.innerText.trim();
    expect(labelText).toBe('hello 3');
    expect(buttonElement.classList.contains('active')).toBeTrue();
  });

  it('should open a flyout menu with the min height style based on the items received on changes', () => {
    const defaultItemMenuHeight = 56;
    const testItems = [
      {
        text: 'Test item 1',
        isSelected: false,
        value: 'test1',
      },
      {
        text: 'Test item 2',
        isSelected: true,
        value: 'test2',
      },
      {
        text: 'Test item 3',
        isSelected: false,
        value: 'test3',
      },
    ];
    const uk2BottomSheetOpenedSpy = spyOn(component.uk2BottomSheetOpened, 'emit');

    component.uk2ItemList = testItems;
    component.ngAfterViewInit();
    component.selectOption(1);
    component.selectOption(2);
    component.ngOnChanges({
      uk2ItemList: new SimpleChange([], testItems, true),
    });

    component.toggleFlyout();

    expect(mockOverlay.create).toHaveBeenCalled();
    expect(component.menuItemsContainerMinHeight).toEqual(defaultItemMenuHeight * testItems.length);
    expect(uk2BottomSheetOpenedSpy).toHaveBeenCalled();
  });

  it('should not render any label when uk2IsIconOnly is true', () => {
    const labelElement = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.buttonLabel}`)).nativeElement;
    const buttonElement = component.button!.nativeElement;
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.single;
    const testItems = [
      {
        text: 'Test item 1',
        isSelected: false,
        value: 'test1',
      },
      {
        text: 'Test item 2',
        isSelected: false,
        value: 'test2',
      },
      {
        text: 'Test item 3',
        isSelected: false,
        value: 'test3',
      },
    ];

    component.uk2ItemList = testItems;
    component.ngAfterViewInit();
    component.ngOnChanges({
      uk2DefaultStateText: new SimpleChange('', 'hello', false),
      uk2IsIconOnly: new SimpleChange(false, true, false),
    });
    const labelText = labelElement.innerText.trim();
    expect(labelText).toBe('');
    expect(buttonElement.classList.contains('active')).toBeFalse();
  });

  it('should not deselect current selected item if uk2KeepLastSelection is set to true', () => {
    component.uk2KeepLastSelection = true;
    // selecting option
    component.selectOption(0);
    // unselect option (expected behavior: should not unselect)
    component.selectOption(0);
    expect(component.selectedOptions.length).toBe(1);
    expect(component.selectedOptions[0]).toEqual(component.uk2ItemList[0]);
  });
  it('should unselect last option if uk2KeepLastSelection is set to false', () => {
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
    component.uk2KeepLastSelection = false;
    // selecting option
    component.selectOption(0);
    expect(component.selectedOptions.length).toBe(1);
    // unselect option (expected behavior: should not unselect)
    component.selectOption(0);
    expect(component.selectedOptions.length).toBe(0);
  });

  it('should not perform any action if uk2ButtonType is not single nor multiple type', () => {
    component.uk2ButtonType = 'undefined type' as Uk2MenuButtonSelectionTypeEnum;
    component.selectOption(0);
    expect(component.selectedOptions.length).toBe(0);
  });

  it('should set label text as empty string if uk2IsIconOnly is defined as true', () => {
    component.uk2IsIconOnly = true;
    component.buttonLabel = document.createElement('div');
    component.buttonLabel.innerText = 'text to remove';
    // @ts-ignore
    component.setMultipleTypeLabel();
    expect(component.buttonLabel.innerText).toBe('');
  });

  it('should display a badge on multiple type if uk2DisplayBadge is set to true and an element was selected', () => {
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
    component.uk2DisplayBadge = true;

    component.selectOption(0);
    fixture.detectChanges();
    const badgeElement = fixture.debugElement.query(By.css('.uk2-menu-button-badge'));

    expect(badgeElement).toBeDefined();
  });

  it('should update the badge based on the number of selected elements', async () => {
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
    component.uk2DisplayBadge = true;
    component.selectOption(1);
    component.selectOption(2);
    component.selectOption(3);

    fixture.detectChanges();
    await fixture.whenStable();

    const badgeElement = fixture.debugElement.query(By.css('.uk2-menu-button-badge'));
    const contentElement = badgeElement.query(By.css('.mat-badge-content'));

    expect(badgeElement).toBeDefined();
    expect(contentElement).toBeDefined();
    expect(contentElement.nativeElement.innerText.trim()).toEqual(`${component.selectedOptions.length}`);
  });

  it('should emit the selected multiple items', () => {
    const uk2OnItemSelectedSpy = spyOn(component.uk2OnItemSelected, 'emit');
    const options = [
      {
        text: 'Lorem Ipsum 1',
        isSelected: true,
        value: '1',
      },
      {
        text: 'Lorem Ipsum 2',
        isSelected: false,
        value: '2',
      },
    ];

    component.multipleOptionsSelect(options);

    expect(uk2OnItemSelectedSpy).toHaveBeenCalledWith([options[0]]);
  });
});

describe('Uk2MenuButtonComponent desktop size', () => {
  let fixture: ComponentFixture<MenuButtonTestComponent>;
  let component: Uk2MenuButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, MatIconTestingModule, MatButtonModule, Uk2DirectivesModule],
      declarations: [Uk2MenuButtonComponent, MenuButtonTestComponent],
      providers: [{ provide: Overlay, useValue: mockOverlay }, BreakpointObserver],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuButtonTestComponent);
    component = fixture.debugElement.children[0].componentInstance;

    component.uk2ItemList = mockItems.map((item: Uk2MenuButtonItem) => {
      return { ...item, isSelected: false };
    });
    component.ngOnChanges({
      uk2ItemList: new SimpleChange([], mockItems, true),
    });
    component.ngAfterContentInit();
    fixture.detectChanges();

    const breakpointObserver: BreakpointObserver = TestBed.inject(BreakpointObserver);
    spyOn(breakpointObserver, 'observe').and.returnValue(
      of({
        matches: false,
      } as any)
    );
  });

  it('should set the "uk2ActiveStateText" text not set the truncation class for the button when the input items are set for multiple items', () => {
    const labelElement = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.buttonLabel}`)).nativeElement;
    const buttonElement = component.button!.nativeElement;
    const pluralText = 'Filtered';
    const testItems = [
      {
        text: 'Test item 1',
        isSelected: false,
        value: 'test1',
      },
      {
        text: 'Test item 2',
        isSelected: true,
        value: 'test2',
      },
      {
        text: 'Test item 3',
        isSelected: true,
        value: 'test3',
      },
    ];
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
    component.uk2ActiveStateText = pluralText;
    component.uk2ItemList = testItems;

    component.ngOnChanges({
      uk2ItemList: new SimpleChange([], testItems, true),
    });
    component.ngAfterViewInit();
    fixture.detectChanges();

    const labelText = labelElement.innerText.trim();
    expect(labelText).toBe(pluralText);
    expect(buttonElement.classList.contains('label-truncate')).toBeFalse();
  });

  it('should set the selected item text and add a truncation class for the button when the input items are set for single items', () => {
    const labelElement = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.buttonLabel}`)).nativeElement;
    const buttonElement = component.button!.nativeElement;
    const testItems = [
      {
        text: 'Test item 1',
        isSelected: false,
        value: 'test1',
      },
      {
        text: 'Test item 2',
        isSelected: false,
        value: 'test2',
      },
      {
        text: 'Test item 3',
        isSelected: true,
        value: 'test3',
      },
    ];
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.single;
    component.uk2ItemList = testItems;

    component.ngOnChanges({
      uk2ItemList: new SimpleChange([], testItems, true),
    });
    component.ngAfterViewInit();
    fixture.detectChanges();

    const labelText = labelElement.innerText.trim();
    expect(labelText).toBe(testItems[2].text);
    expect(buttonElement.classList.contains('label-truncate')).toBeTrue();
  });
});

describe('Uk2MenuButtonComponent mobile size', () => {
  let fixture: ComponentFixture<MenuButtonTestComponent>;
  let component: Uk2MenuButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatIconTestingModule,
        MatButtonModule,
        MatBottomSheetModule,
        Uk2DirectivesModule,
      ],
      declarations: [Uk2MenuButtonComponent, Uk2MenuButtonOverlayComponent, MenuButtonTestComponent],
      providers: [{ provide: Overlay, useValue: mockOverlay }, BreakpointObserver],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuButtonTestComponent);
    component = fixture.debugElement.children[0].componentInstance;

    component.uk2ItemList = mockItems.map((item: Uk2MenuButtonItem) => {
      return { ...item, isSelected: false };
    });
    component.ngOnChanges({
      uk2ItemList: new SimpleChange([], mockItems, true),
    });
    component.ngAfterContentInit();
    fixture.detectChanges();

    const breakpointObserver: BreakpointObserver = TestBed.inject(BreakpointObserver);
    spyOn(breakpointObserver, 'observe').and.returnValue(
      of({
        matches: true,
      } as any)
    );
  });

  it('should set the "uk2ActiveStateText" text for the button a single items is selected for multiple type', () => {
    const labelElement = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.buttonLabel}`)).nativeElement;
    const buttonElement = component.button!.nativeElement;
    const pluralText = 'Filtered';
    const testItems = [
      {
        text: 'Test item 1',
        isSelected: false,
        value: 'test1',
      },
      {
        text: 'Test item 2',
        isSelected: true,
        value: 'test2',
      },
      {
        text: 'Test item 3',
        isSelected: false,
        value: 'test3',
      },
    ];
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
    component.uk2ActiveStateText = pluralText;
    component.uk2ItemList = testItems;

    component.ngOnChanges({
      uk2ItemList: new SimpleChange([], testItems, true),
    });
    component.ngAfterViewInit();
    fixture.detectChanges();

    const labelText = labelElement.innerText.trim();
    expect(labelText).toBe(pluralText);
    expect(buttonElement.classList.contains('label-truncate')).toBeFalse();
  });

  it('should set the "uk2ActiveStateText" text for the button when multiple items are selected for multiple type', () => {
    const labelElement = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.buttonLabel}`)).nativeElement;
    const buttonElement = component.button!.nativeElement;
    const pluralText = 'Filtered';
    const testItems = [
      {
        text: 'Test item 1',
        isSelected: false,
        value: 'test1',
      },
      {
        text: 'Test item 2',
        isSelected: true,
        value: 'test2',
      },
      {
        text: 'Test item 3',
        isSelected: true,
        value: 'test3',
      },
    ];
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.multiple;
    component.uk2ActiveStateText = pluralText;
    component.uk2ItemList = testItems;

    component.ngOnChanges({
      uk2ItemList: new SimpleChange([], testItems, true),
    });
    component.ngAfterViewInit();
    fixture.detectChanges();

    const labelText = labelElement.innerText.trim();
    expect(labelText).toBe(pluralText);
    expect(buttonElement.classList.contains('label-truncate')).toBeFalse();
  });

  it('should set the "uk2ActiveStateText" text for the button when an item is selected for single type', () => {
    const labelElement = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.buttonLabel}`)).nativeElement;
    const buttonElement = component.button!.nativeElement;
    const pluralText = 'Sorted';
    const testItems = [
      {
        text: 'Test item 1',
        isSelected: false,
        value: 'test1',
      },
      {
        text: 'Test item 2',
        isSelected: false,
        value: 'test2',
      },
      {
        text: 'Test item 3',
        isSelected: true,
        value: 'test3',
      },
    ];
    component.uk2ButtonType = Uk2MenuButtonSelectionTypeEnum.single;
    component.uk2ItemList = testItems;
    component.uk2ActiveStateText = pluralText;

    component.ngOnChanges({
      uk2ItemList: new SimpleChange([], testItems, true),
    });
    component.ngAfterViewInit();
    fixture.detectChanges();

    const labelText = labelElement.innerText.trim();
    expect(labelText).toBe(pluralText);
    expect(buttonElement.classList.contains('label-truncate')).toBeFalse();
  });

  it('should delegate close method to uk2MenuButtonOverlayComponent.close calling close method', () => {
    const closeFlyoutSpy = spyOn(component.uk2MenuButtonOverlayComponent, 'close');

    component.close();

    expect(closeFlyoutSpy).toHaveBeenCalled();
  });

  it('should delegate applySelectedOptions method to uk2MenuButtonOverlayComponent.handleBottomSheetApplyButton calling applySelectedOptions method', () => {
    const handleBottomSheetApplyButtonSpy = spyOn(
      component.uk2MenuButtonOverlayComponent,
      'handleBottomSheetApplyButton'
    );

    component.applySelectedOptions();

    expect(handleBottomSheetApplyButtonSpy).toHaveBeenCalled();
  });

  it('should delegate isAnyOptionSelected method to uk2MenuButtonOverlayComponent.isAnyOptionSelected calling isAnyOptionSelected method', () => {
    const isAnyOptionSelectedSpy = spyOn(component.uk2MenuButtonOverlayComponent, 'isAnyOptionSelected');

    component.isAnyOptionSelected();

    expect(isAnyOptionSelectedSpy).toHaveBeenCalled();
  });
});

describe('Uk2MenuButtonComponent initial state', () => {
  let fixture: ComponentFixture<MenuButtonTestComponent>;
  let component: Uk2MenuButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, MatIconTestingModule, MatButtonModule, Uk2DirectivesModule],
      declarations: [Uk2MenuButtonComponent, MenuButtonTestComponent],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuButtonTestComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should have uk2ButtonType property default value', () => {
    expect(component.uk2ButtonType).toEqual(Uk2MenuButtonSelectionTypeEnum.single);
  });

  it('should have uk2KeepLastSelection property default value', () => {
    expect(component.uk2KeepLastSelection).toBeTrue();
  });

  it('should have uk2ItemList property default value', () => {
    expect(component.uk2ItemList).toEqual([]);
  });

  it('should have uk2ActiveStateText property default value', () => {
    expect(component.uk2ActiveStateText).toEqual('');
  });

  it('should have uk2IsDisabled property default value', () => {
    expect(component.uk2IsDisabled).toBeFalse();
  });

  it('should have uk2IsLoading property default value', () => {
    expect(component.uk2IsLoading).toBeFalse();
  });

  it('should have uk2DefaultStateText property default value', () => {
    expect(component.uk2DefaultStateText).toEqual('');
  });

  it('should have uk2SvgIconName property default value', () => {
    expect(component.uk2SvgIconName).toEqual('');
  });

  it('should have uk2CSSPortalProperties property default value', () => {
    expect(component.uk2CSSPortalProperties).toEqual([]);
  });

  it('should have uk2IconButtonSizeClass property default value', () => {
    expect(component.uk2IconButtonSizeClass).toBeUndefined();
  });

  it('should have uk2ContentClass property default value', () => {
    expect(component.uk2ContentClass).toEqual(uk2MenuButtonConstants.defaultContentClass);
  });

  it('should have uk2DividerLineClass property default value', () => {
    expect(component.uk2DividerLineClass).toEqual(uk2MenuButtonConstants.defaultDividerLineClass);
  });

  it('should have uk2IsIconOnly property default value', () => {
    expect(component.uk2IsIconOnly).toBeFalse();
  });

  it('should have uk2DisplayBorder property default value', () => {
    expect(component.uk2DisplayBorder).toBeTrue();
  });

  it('should have uk2BackdropIsEnabled property default value', () => {
    expect(component.uk2BackdropIsEnabled).toBeTrue();
  });

  it('should have uk2BackdropIsHidden property default value', () => {
    expect(component.uk2BackdropIsHidden).toBeTrue();
  });

  it('should have uk2BackdropCanBeClosedWhenHasBeenClicked property default value', () => {
    expect(component.uk2BackdropCanBeClosedWhenHasBeenClicked).toBeTrue();
  });

  it('should have uk2BackdropClass property default value', () => {
    expect(component.uk2BackdropClass).toEqual(uk2MenuButtonConstants.defaultBackdropClass);
  });

  it('should have uk2ScrollStrategy property default value', () => {
    expect(component.uk2ScrollStrategy).toEqual(Uk2MenuButtonScrollStrategy.block);
  });
});
