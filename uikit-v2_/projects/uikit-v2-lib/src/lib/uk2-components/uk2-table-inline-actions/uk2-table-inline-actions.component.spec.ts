import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2TableInlineActionsComponent } from './uk2-table-inline-actions.component';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import {
  Uk2DirectivesModule,
  Uk2FlyoutMenuDirective,
  Uk2FlyoutMenuModule,
  uk2TableInlineActionsConstants,
} from '@axos/uikit-v2-lib';

const mockActions = [
  {
    actionId: 'edit',
    svgIcon: 'edit-svg',
    description: 'Edit item',
    showTooltip: true,
    displayOrder: 1,
  },
  {
    actionId: 'delete',
    svgIcon: 'delete-svg',
    description: 'Delete item',
    showTooltip: true,
    displayOrder: 2,
  },
  {
    actionId: 'view',
    svgIcon: 'view-svg',
    description: 'View item',
    showTooltip: false,
    displayOrder: 3,
  },
];

describe('Uk2TableInlineActionsComponent', () => {
  let component: Uk2TableInlineActionsComponent;
  let fixture: ComponentFixture<Uk2TableInlineActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2TableInlineActionsComponent],
      imports: [CommonModule, MatIconTestingModule, MatButtonModule, Uk2DirectivesModule, Uk2FlyoutMenuModule],
      providers: [{ provide: Uk2FlyoutMenuDirective, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2TableInlineActionsComponent);
    component = fixture.componentInstance;
    component.uk2ActionList = mockActions;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should order the actions based on the displayOrder property', () => {
    const intialActions = [mockActions[0], mockActions[2], mockActions[1]];
    fixture.detectChanges();

    component.ngOnChanges({
      uk2ActionList: new SimpleChange(mockActions, intialActions, false),
    });
    fixture.detectChanges();

    expect(component.orderedActionList).toEqual(mockActions);
  });

  it('should display all the buttons individually if the number of actions is less or equal to uk2MaxInlineActions', () => {
    component.uk2MaxInlineActions = 3;
    component.orderedActionList = mockActions;

    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('.uk2-inline-table-button'));

    expect(buttons.length).toBe(3);
  });

  it('should initialize a tooltip for each action with showTooltip set to true', () => {
    component.uk2MaxInlineActions = 3;
    component.orderedActionList = mockActions;

    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('.uk2-inline-table-button'));

    expect(buttons.length).toEqual(3);
    expect(buttons[0].nativeElement._tippy).toBeDefined();
    expect(buttons[1].nativeElement._tippy).toBeDefined();
    expect(buttons[2].nativeElement._tippy).toBeUndefined();
  });

  it('should display a button with a menu directive if the number of actions is greater to uk2MaxInlineActions', () => {
    component.uk2MaxInlineActions = 2;
    component.orderedActionList = mockActions;

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.uk2-inline-table-button'));
    const flyoutDirective = button.injector.get(Uk2FlyoutMenuDirective);

    expect(button).toBeTruthy();
    expect(flyoutDirective).toBeTruthy();
  });

  it('should emit an Uk2TableInlineActionOutput object with the action and row data', () => {
    const selectedActionSpy = spyOn(component.uk2OnActionSelect, 'emit');
    const rowData = { rowId: 1 };
    component.uk2RowValue = rowData;
    component.orderedActionList = mockActions;
    fixture.detectChanges();

    component.onActionSelected(mockActions[0].actionId);

    expect(selectedActionSpy).toHaveBeenCalledWith({
      actionId: mockActions[0].actionId,
      rowValue: rowData,
    });
  });

  it('should return an Uk2TableInlineAction as a valid Uk2ListItem', () => {
    const listItem = component.getActionListItem(mockActions[0]);

    expect(listItem).toEqual({
      bodyText: mockActions[0].description,
      svgIconName: mockActions[0].svgIcon,
      value: mockActions[0].actionId,
      showControl: false,
    });
  });

  it('should throw an error if no actions were provided', () => {
    component.uk2ActionList = [];

    expect(() => {
      fixture.detectChanges();
    }).toThrowError(uk2TableInlineActionsConstants.errorMessages.missingOptions);
  });
});
