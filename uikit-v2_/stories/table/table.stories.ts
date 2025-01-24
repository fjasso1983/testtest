import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { Uk2TableBorderStyleEnum, Uk2TableDensityEnum, Uk2TableTextBehaviorEnum } from '@axos/uikit-v2-lib';

import documentation from './table.docs.mdx';
import { TableComponent } from './table.component';
import { TableModule } from './table.module';

export default {
  title: 'Components/Table',
  component: TableComponent,
  argTypes: {
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
        'isGroup'
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
};
