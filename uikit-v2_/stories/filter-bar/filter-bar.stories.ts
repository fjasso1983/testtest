import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { FilterBarComponent } from './filter-bar.component';
import { FilterBarModule } from './filter-bar.module';
import documentation from './filter-bar.doc.mdx';

export default {
  title: 'Components/Filter Bar',
  component: FilterBarComponent,
  decorators: [
    moduleMetadata({
      imports: [FilterBarModule],
    }),
  ],
  argTypes: {
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle skeleton view when this is true',
      table: { category: 'States' },
    },
    showAddFilterButton: {
      name: 'Show Add Filter Button By Default',
      description:
        'Toggle visibility for Add filter button. When "False" the Add filter button will be displayed when hovering over the touch target',
      table: { category: 'Controls' },
    },
    showClearFiltersButton: {
      name: 'Show Clear Filters Button',
      description: 'Show the clear filters button',
      table: { category: 'Controls' },
    },
    filterChanged: {
      action: 'filterChanged',
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      page: documentation,
    },
    controls: {
      exclude: [
        'columns',
        'items',
        'relatedContainer',
        'addFilter',
        'dropEvent',
        'columnOptions',
        'addFilterMenuOpen',
        'smallSize',
        'handleDropEvent',
        'removeFilter',
        'handleOptionClick',
      ],
    },
  },
} as Meta;

const Template: Story<FilterBarComponent> = (args: FilterBarComponent) => ({
  props: args,
});

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  isLoading: false,
  showClearFiltersButton: true,
  showAddFilterButton: true,
};
