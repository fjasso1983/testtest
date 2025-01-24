import { Component } from '@angular/core';
import { Uk2TableInlineAction, Uk2TableInlineActionOutput } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-table-inline-actions',
  templateUrl: './table-inline-actions.component.html',
  styleUrls: ['./table-inline-actions.component.scss'],
})
export class InlineTableComponent {
  testActions: Uk2TableInlineAction[] = [
    {
      actionId: 'approve',
      svgIcon: 'uk2-thumbs-up',
      description: 'Approve',
      showTooltip: true,
      displayOrder: 0,
    },
    {
      actionId: 'download',
      svgIcon: 'uk2-download',
      description: 'Download',
      showTooltip: true,
      displayOrder: 1,
    },
    {
      actionId: 'delete',
      svgIcon: 'uk2-trash',
      description: 'Delete',
      showTooltip: false,
      displayOrder: 2,
    },
  ];

  flyoutActions: Uk2TableInlineAction[] = [
    {
      actionId: 'reject',
      svgIcon: 'uk2-thumbs-down',
      description: 'Reject',
      showTooltip: true,
      displayOrder: 1,
    },
    {
      actionId: 'approve',
      svgIcon: 'uk2-thumbs-up',
      description: 'Approve',
      showTooltip: true,
      displayOrder: 0,
    },
    {
      actionId: 'download',
      svgIcon: 'uk2-thumbs-up',
      description: 'Download',
      showTooltip: true,
      displayOrder: 2,
    },
    {
      actionId: 'delete',
      svgIcon: 'uk2-trash',
      description: 'Delete',
      showTooltip: true,
      displayOrder: 3,
    },
  ];

  constructor() {}

  onActionClick(action: Uk2TableInlineActionOutput) {
    console.log('Action clicked', action);
  }
}
