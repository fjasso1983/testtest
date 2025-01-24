import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChange,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Uk2TableInlineAction, Uk2TableInlineActionOutput } from './types';
import { Uk2ButtonSizeEnum, Uk2FlyoutMenuDirective } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { Uk2ListItem } from '../uk2-list-item';
import { MatButton } from '@angular/material/button';
import { Uk2TooltipArrowEnum, Uk2TooltipPlacementEnum } from '../uk2-tooltip';
import tippy from 'tippy.js';
import { uk2TableInlineActionsConstants } from './constants';

@Component({
  selector: 'uk2-table-inline-actions',
  templateUrl: './uk2-table-inline-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2TableInlineActionsComponent implements OnChanges, AfterViewInit, AfterViewChecked, OnInit {
  @ViewChild('flyoutMenu') flyoutMenu: Uk2FlyoutMenuDirective | undefined;
  @ViewChildren('actionButton') actionButtonList!: QueryList<MatButton>;

  @Input() uk2ActionList: Uk2TableInlineAction[] = [];
  @Input() uk2MaxInlineActions = 2;
  @Input() uk2RowValue: any = undefined;
  @Output() uk2OnActionSelect: EventEmitter<Uk2TableInlineActionOutput> =
    new EventEmitter<Uk2TableInlineActionOutput>();

  orderedActionList: Uk2TableInlineAction[] = [];
  buttonSize = Uk2ButtonSizeEnum;
  ellipsisIcon = Uk2Tier1NavigationEnum.ellipsesVertical;

  private updateTooltip = false;

  constructor() {}

  ngOnInit(): void {
    if (this.uk2ActionList.length === 0) {
      throw new Error(uk2TableInlineActionsConstants.errorMessages.missingOptions);
    }
  }

  ngAfterViewInit(): void {
    this.setTooltipInstances();
  }

  ngAfterViewChecked(): void {
    if (this.updateTooltip) {
      this.setTooltipInstances();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reorderActionList(changes.uk2ActionList);
  }

  onActionSelected(actionId: string) {
    this.uk2OnActionSelect.emit({
      actionId: actionId,
      rowValue: this.uk2RowValue,
    });
    if (this.flyoutMenu) {
      this.flyoutMenu.close();
    }
  }

  getActionListItem(action: Uk2TableInlineAction): Uk2ListItem {
    return {
      bodyText: action.description,
      svgIconName: action.svgIcon,
      value: action.actionId,
      showControl: false,
    } as Uk2ListItem;
  }

  private setTooltipInstances() {
    this.actionButtonList.forEach((button, index) => {
      if (button._elementRef.nativeElement && this.orderedActionList[index].showTooltip) {
        tippy(button._elementRef.nativeElement, {
          appendTo: 'parent',
          role: 'tooltip',
          theme: 'Uk2TableActionTooltip',
          placement: Uk2TooltipPlacementEnum.top,
          arrow: Uk2TooltipArrowEnum.table,
          content: this.orderedActionList[index].description,
          delay: [300, null],
        });
      }
    });
    this.updateTooltip = false;
  }

  private reorderActionList(uk2ActionListChange: SimpleChange | undefined) {
    if (uk2ActionListChange) {
      this.orderedActionList = (uk2ActionListChange.currentValue as Uk2TableInlineAction[]).sort(
        (actionA, actionB) => actionA.displayOrder - actionB.displayOrder
      );
      this.updateTooltip = true;
    }
  }
}
