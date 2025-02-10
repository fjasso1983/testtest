import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import TableScrollDocs from './table-scrolling.component.docs.mdx';
import { TableScrollingModule } from './table-scrolling.component.module';
import { TableScrollingComponent } from './table-scrolling.component';

export default {
  title: 'Components/Table/Scrolling',
  component: TableScrollingComponent,
  argTypes: {},
  parameters: {
    docs: {
      page: TableScrollDocs,
    },
    controls: {
      exclude: ['displayedColumns', 'tableData', 'dataSource', 'fillTableData', 'ellipsisIcon', 'borderRadius'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TableScrollingModule],
    }),
  ],
} as Meta<TableScrollingComponent>;

const template: Story<TableScrollingComponent> = (args: TableScrollingComponent) => ({
  component: TableScrollingComponent,
  props: {
    ...args,
  },
});
export const basicUsage = template.bind({});
basicUsage.args = {};
