import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { ListItemChevronComponent } from './list-item-chevron.component';
import { Module } from './module';
import documentation from './list-item-chevron.doc.mdx';

export default {
  title: 'Components/Dropdown/List items/Chevron',
  component: ListItemChevronComponent,
  decorators: [
    moduleMetadata({
      imports: [Module],
    }),
  ],
  argTypes: {
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle skeleton view when this is true',
      table: { category: 'States' },
    },
    chevronIcon: {
      name: 'Chevron Icon',
      description: 'Toggle chevron icon when this is true',
      table: { category: 'States' },
    },
    imageUrl: {
      name: 'Image URL',
      description: 'Show given URL in the item',
      table: { category: 'States' },
    },
    moneyAmount: {
      name: 'Money Amount',
      description: 'Set the money amount in the item',
      table: { category: 'States' },
    },
    svgIconName: {
      name: 'SVG Icon Name',
      description: 'Set the SVG from tier 1 list logos',
      table: { category: 'States' },
    },
    bodyText: {
      name: 'Body Text',
      description: 'Set body text in the item',
      table: { category: 'States' },
    },
    headerLabelName: {
      name: 'Header Label Name',
      description: 'Set the header text in the item',
      table: { category: 'States' },
    },
    headerLabelIdentifier: {
      name: 'Header Identifier',
      description: 'Set the identifier (account ID) in the item',
      table: { category: 'States' },
    },
    disabled: {
      name: 'Is Disabled',
      description: 'Toggle list item disable state',
      table: { category: 'States' },
    },
    pending: {
      name: 'Is Pending',
      description: 'Toggle list item pending state',
      table: { category: 'States' },
    },
    showDivider: {
      name: 'Show Item Divider',
      description: 'Toggle the visibility of the line to divide items',
      table: { category: 'States' },
    },
    currencyOptions: {
      name: 'Currency Options',
      description: 'Control how the money amount will be displayed',
      table: { category: 'States' },
    },
  },
  parameters: {
    docs: {
      page: documentation,
    },
    controls: {
      exclude: [
        'ngOnChanges',
        'listItems',
        'updateCustomOption',
        'dropdownSize',
        'bottomSheetListHeader',
        'bottomSheetListDescription',
      ],
    },
  },
} as Meta;

const Template: Story<ListItemChevronComponent> = (args: ListItemChevronComponent) => ({
  props: args,
});

export const ListItemChevron = Template.bind({});
ListItemChevron.args = {
  currencyOptions: {
    currencyCode: 'USD',
    display: 'symbol',
    digitsInfo: '1.2-2',
  },
};
