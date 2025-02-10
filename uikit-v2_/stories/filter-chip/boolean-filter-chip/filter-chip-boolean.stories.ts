import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { FilterChipBooleanComponent } from './filter-chip-boolean.component';
import docs from './filter-chip-boolean.docs.mdx';
import { FilterChipBooleanModule } from './filter-chip-boolean.module';

export default {
  title: 'Components/Filter Chip/Boolean Filter Chip',
  component: FilterChipBooleanComponent,
  argTypes: {
    identifier: {
      name: 'Identifier',
      description: 'Identifier for the filter chip',
      table: { category: 'Inputs' },
    },
    isMultiple: {
      name: 'Is Multiple',
      description: 'Whether the filter chip allows multiple selections',
      table: { category: 'Inputs' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Whether the filter chip is in a loading state',
      table: { category: 'Inputs' },
    },
    overlayMinWidth: {
      name: 'Overlay Minimum Width',
      description: 'Set the minimum width of overlay',
      table: { category: 'Inputs' },
    },
    removeFilter: {
      action: 'removeFilter',
      table: { disable: true },
    },
    filterChanged: {
      action: 'filterChanged',
      table: { disable: true },
    },
    closeOverlayAfterClearSelection: {
      name: 'Close Overlay After Clear Selection',
      description: 'Whether to close the overlay after clearing the selection',
      table: { category: 'Inputs' },
    },
    filterChipMaxWidth: {
      name: 'Filter Chip Max Width',
      description: 'Maximum width of the filter chip button before applying truncation to selection',
      table: { category: 'Inputs' },
    },
    showClearSelection: {
      name: 'Show Clear Selection',
      description: 'Whether to show the clear selection button',
      table: { category: 'Inputs' },
    },
  },
  parameters: {
    actions: {
      handles: ['removeFilter', 'filterChanged'],
    },
    docs: {
      page: docs,
    },
    controls: {
      exclude: ['options', 'conditions', 'handleOptionClick', 'filterChipBooleanComponent'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FilterChipBooleanModule],
    }),
  ],
} as Meta<FilterChipBooleanComponent>;

const basicUsageTemplate: Story<FilterChipBooleanComponent> = (args: FilterChipBooleanComponent) => ({
  component: FilterChipBooleanComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  identifier: 'Name',
  isLoading: false,
  isMultiple: false,
  overlayMinWidth: 'auto',
  closeOverlayAfterClearSelection: false,
  filterChipMaxWidth: 327,
  showClearSelection: true,
};
