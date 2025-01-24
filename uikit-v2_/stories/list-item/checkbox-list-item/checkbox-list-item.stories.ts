import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CheckListItemComponent } from './checkbox-list-item.component';
import { ListItemCheckboxModule } from './checkbox-list-item.module';
import documentation from './checkbox-list-item.doc.mdx';

export default {
  title: 'Components/List Item',
  component: CheckListItemComponent,
  decorators: [
    moduleMetadata({
      imports: [ListItemCheckboxModule],
    }),
  ],
  argTypes: {
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle skeleton view when this is true',
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
  },
  parameters: {
    docs: {
      page: documentation,
    },
    controls: {
      exclude: ['ngOnChanges', 'listItem', 'updateCustomOption', 'currencyOptions', 'secondListItem'],
    },
  },
} as Meta;

const template: Story<CheckListItemComponent> = (args: CheckListItemComponent) => ({
  props: args,
});

export const checkboxListItem = template.bind({});
checkboxListItem.args = {
  svgIconName: 'uk2-payment-due',
  headerLabelName: 'Receive calendar notifications',
  bodyText: 'Including external account',
};
