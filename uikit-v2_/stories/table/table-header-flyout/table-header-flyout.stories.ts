import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TableHeaderFlyoutComponent } from './table-header-flyout.component';
import { TableHeaderFlyoutModule } from './table-header-flyout.module';
import TableHeaderFlyoutDocs from './table-header-flyout.docs.mdx';

export default {
  title: 'Components/Table/Header Flyout',
  components: TableHeaderFlyoutComponent,
  argTypes: {
    onFlyoutItemClicked: {
      action: 'onFlyoutItemClicked',
      table: { disable: true },
    },
  },
  parameters: {
    docs: { page: TableHeaderFlyoutDocs },
    controls: {
      exclude: [
        'displayedColumns',
        'activeColumnIndex',
        'flyoutListItems',
        'flyoutIsOpen',
        'tableData',
        'currentFlyoutInstance',
        'getActiveFlyout',
        'onFlyoutClose',
        'onFlyoutItemClick',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TableHeaderFlyoutModule],
    }),
  ],
} as Meta<TableHeaderFlyoutComponent>;

const template: Story<TableHeaderFlyoutComponent> = (args: TableHeaderFlyoutComponent) => ({
  component: TableHeaderFlyoutComponent,
  props: {
    ...args,
  },
});

export const basicUsage = template.bind({});
basicUsage.args = {};
