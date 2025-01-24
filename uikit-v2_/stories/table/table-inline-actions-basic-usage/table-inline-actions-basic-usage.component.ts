import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Uk2IconRegistryService, Uk2TableInlineAction, Uk2TableInlineActionOutput } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-table-inline-actions',
  templateUrl: './table-inline-actions-basic-usage.component.html',
  styleUrls: ['./table-inline-actions-basic-usage.component.scss'],
})
export class TableInlineActionsComponent implements OnChanges {
  @Input() maxAllowedOptions = 3;
  @Input() actionShowTooltip = false;
  @Input() actionDescription = 'Approve';
  @Input() actionSvgIcon = 'uk2-thumbs-up';

  rowData = { itemId: 1 };
  actionList: Uk2TableInlineAction[] = [
    {
      actionId: 'custom-action',
      svgIcon: 'uk2-thumbs-up',
      description: 'Approve',
      showTooltip: true,
      displayOrder: 1,
    },
    {
      actionId: 'download-action',
      svgIcon: 'uk2-download',
      description: 'Download',
      showTooltip: false,
      displayOrder: 2,
    },
    {
      actionId: 'upload-action',
      svgIcon: 'uk2-upload',
      description: 'Upload',
      showTooltip: false,
      displayOrder: 3,
    },
    {
      actionId: 'share-action',
      svgIcon: 'uk2-share',
      description: 'Share',
      showTooltip: false,
      displayOrder: 4,
    },
    {
      actionId: 'delete-action',
      svgIcon: 'uk2-trash',
      description: 'Delete',
      showTooltip: false,
      displayOrder: 5,
    },
  ];

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.actionShowTooltip || changes.actionDescription || changes.actionSvgIcon || changes.displayOrder) {
      const _actionList = [...this.actionList];
      const action = {
        ..._actionList[0],
      };
      action.showTooltip = changes.actionShowTooltip ? changes.actionShowTooltip.currentValue : action.showTooltip;
      action.description = changes.actionDescription ? changes.actionDescription.currentValue : action.description;
      action.svgIcon = changes.actionSvgIcon ? changes.actionSvgIcon.currentValue : action.svgIcon;

      _actionList[0] = action;

      this.actionList = _actionList;
    }
  }

  actionClickEvent(actionData: Uk2TableInlineActionOutput) {}
}
