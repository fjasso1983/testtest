import { Meta, moduleMetadata, Story } from '@storybook/angular';
import TableInlineActionDocs from './table-inline-actions-basic-usage.docs.mdx';
import { TableInlineActionsComponent } from './table-inline-actions-basic-usage.component';
import { TableInlineActionBasicUsagenModule } from './table-inline-actions-basic-usage.module';

export default {
  title: 'Components/Table/Inline actions',
  component: TableInlineActionsComponent,
  argTypes: {
    maxAllowedOptions: {
      name: 'Maximum number of individual options',
      description: 'Sets the maximum number of options displayed individually on a cell.',
      control: {
        type: 'number',
        min: 0,
      },
      table: { category: 'Actions' },
    },
    actionShowTooltip: {
      name: 'Show tooltip on first action',
      table: { category: 'Action configuration' },
    },
    actionDescription: {
      name: 'Description label of the first action',
      table: { category: 'Action configuration' },
    },
    actionSvgIcon: {
      name: 'Icon of the first action',
      table: { category: 'Action configuration' },
    },
    actionClickEvent: {
      action: 'actionClickEvent',
      table: { disable: true },
    },
  },
  parameters: {
    actions: {
      handles: ['actionClickEvent'],
    },
    docs: {
      page: TableInlineActionDocs,
    },
    controls: {
      exclude: ['rowData', 'actionList', 'ngOnChanges'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TableInlineActionBasicUsagenModule],
    }),
  ],
} as unknown as Meta<TableInlineActionsComponent>;

const basicUsageTemplate: Story<TableInlineActionsComponent> = (args: TableInlineActionsComponent) => ({
  component: TableInlineActionsComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  maxAllowedOptions: 3,
  actionShowTooltip: false,
  actionDescription: 'Approve',
  actionSvgIcon: 'uk2-thumbs-up',
};
