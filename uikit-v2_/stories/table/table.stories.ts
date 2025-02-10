import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import {
  Uk2TableBorderStyleEnum,
  Uk2TableDensityEnum,
  Uk2TableHeaderRowColorEnum,
  Uk2TableTextBehaviorEnum,
} from '@axos/uikit-v2-lib';

import documentation from './table.docs.mdx';
import { TableComponent } from './table.component';
import { TableModule } from './table.module';

export default {
  title: 'Components/Table',
  component: TableComponent,
  argTypes: {
    hideCheckboxColumn: {
      name: 'Hide checkbox column',
      description: 'Hide/show the checkbox column of the table.',
      defaultValue: false,
      table: { category: 'Inputs' },
    },
    tableDensity: {
      name: 'Table Density',
      description: 'Customize table rows density.',
      table: { category: 'Inputs' },
    },
    tableBorderType: {
      name: 'Table Border Type',
      description: 'Customize table border radius.',
      table: { category: 'Inputs' },
    },
    headerRowColorVariant: {
      name: 'Header Row Color Variant',
      description: 'Customize table header row color variant.',
      table: { category: 'Inputs' },
      defaultValue: Uk2TableHeaderRowColorEnum.grey,
    },
    tableTextBehavior: {
      name: 'Table Text Behavior',
      description: 'Set table rows text behavior to wrap/truncate.',
      table: { category: 'Inputs' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle skeleton view when this is true.',
      table: { category: 'States' },
    },
    isHeaderRowPressed: {
      name: 'Header Cells Pressed state',
      description: 'Toggle to active/deactivate the Pressed state in header cells.',
      table: { category: 'States' },
    },
    noData: {
      name: 'No Data',
      description: 'Clear all the rows of the table to show no data message.',
      table: { category: 'Scenario' },
    },
    isGroupedBy: {
      name: 'Grouped Records',
      description: 'Set the table view grouped by an specific column values.',
      table: { category: 'Inputs' },
    },
    overlapCellContent: {
      name: 'Overlap Cell Content',
      description:
        'Toggle if the element overlaps the first cell content or is displayed next to it when the row is selected and hovered.',
      table: { category: 'Inputs' },
      defaultValue: true,
    },
  },
  parameters: {
    docs: {
      page: documentation,
    },
    controls: {
      exclude: [
        'displayedColumns',
        'dataSource',
        'ellipsisIcon',
        'ngOnChanges',
        'setDataSource',
        'selection',
        'isAllSelected',
        'toggleAllRows',
        'checkboxLabel',
        'groupBy',
        'isGroup',
        'smallSize',
        'svgIconName',
        'tableActions',
        'handleCheckboxColumnVisibility',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TableModule],
    }),
  ],
} as Meta<TableComponent>;

const template: Story<TableComponent> = (args: TableComponent) => ({
  component: TableComponent,
  props: {
    ...args,
  },
});
export const basicUsage = template.bind({});
basicUsage.args = {
  isLoading: false,
  tableBorderType: Uk2TableBorderStyleEnum.borderRadius8,
  tableDensity: Uk2TableDensityEnum.medium,
  tableTextBehavior: Uk2TableTextBehaviorEnum.wrap,
  noData: false,
  isGroupedBy: false,
  overlapCellContent: true,
};
