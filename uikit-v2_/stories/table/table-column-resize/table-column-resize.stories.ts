import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import TableResizeDocs from './table-column-resize.docs.mdx';
import { TableColumnResizeComponent } from './table-column-resize.component';
import { TableColumnResizeModule } from './table-column-resize.module';

export default {
  title: 'Components/Table/Column Resize',
  component: TableColumnResizeComponent,
  argTypes: {
    firstColumnWidth: {
      name: 'First column width',
      description: 'Customize the default width on the first column.',
      table: { category: 'Inputs' },
    },
    disableFirstColumnResize: {
      name: 'Disable first column resize',
      description: 'Disables the resizing on the first column',
      table: { category: 'Inputs' },
    },
    onColumnResize: {
      action: 'onColumnResize',
      table: { disable: true },
    },
    onColumnReset: {
      action: 'onColumnReset',
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      page: TableResizeDocs,
    },
    controls: {
      exclude: ['displayedColumns', 'dataSource', 'columnWidths'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TableColumnResizeModule],
    }),
  ],
} as Meta<TableColumnResizeComponent>;

const template: Story<TableColumnResizeComponent> = (args: TableColumnResizeComponent) => ({
  component: TableColumnResizeComponent,
  props: {
    ...args,
  },
});
export const basicUsage = template.bind({});
basicUsage.args = {
  firstColumnWidth: '95px',
  disableFirstColumnResize: false,
};
