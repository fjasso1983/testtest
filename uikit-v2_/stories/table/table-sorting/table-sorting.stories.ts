import { Uk2SortDirectionEnum } from '@axos/uikit-v2-lib';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { TableSortingComponent } from './table-sorting.component';
import Documentation from './table-sorting.docs.mdx';
import { TableSortingModule } from './table-sorting.module';

export default {
  title: 'Components/Table/Sorting',
  component: TableSortingComponent,
  argTypes: {
    disableTableSorting: {
      name: 'Disable table sorting',
      description: 'Disables the sorting on the table.',
      table: { category: 'Inputs' },
    },
    disableFirstColumnSorting: {
      name: 'Disable first column sorting',
      description: 'Disables the sorting on the first column.',
      table: { category: 'Inputs' },
    },
    initSortFirstColumn: {
      name: 'Init sort first column',
      description:
        'Sort the first column when the table is initialized (it needs to re-mount the component because it is executed all at once at the start of the component).',
      table: { category: 'Inputs' },
    },
    initSortDirection: {
      name: 'Init sort direction',
      description:
        'The initial sorting direction of the table. (it needs to re-mount the component because it is executed all at once at the start of the component).',
      table: { category: 'Inputs' },
    },
  },
  parameters: {
    docs: {
      page: Documentation,
    },
    controls: {
      exclude: ['displayedColumns', 'dataSource', 'onSortHeaderChange'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TableSortingModule],
    }),
  ],
} as Meta<TableSortingComponent>;

const template: Story<TableSortingComponent> = (args: TableSortingComponent) => ({
  component: TableSortingComponent,
  props: {
    ...args,
  },
});

export const basicUsage = template.bind({});
basicUsage.args = {
  disableTableSorting: false,
  disableFirstColumnSorting: false,
  initSortFirstColumn: true,
  initSortDirection: Uk2SortDirectionEnum.ascending,
};
