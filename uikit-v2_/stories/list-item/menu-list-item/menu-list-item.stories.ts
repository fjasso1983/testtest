import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MenuListItemComponent } from './menu-list-item.component';
import { StoriesCommonModule } from 'stories/stories-common.module';
import MenuLitemDocs from './menu-list-item.docs.mdx';
import { MenuListItemModule } from './menu-list-item.module';

export default {
  title: 'Components/List Item',
  component: MenuListItemComponent,
  argTypes: {
    isLoading: {
      name: 'Is Loading',
      description: 'Toggles the item skeleton state',
      table: { category: 'States' },
    },
    isDisabled: {
      name: 'Is Disabled',
      description: 'Toggle to disable the item',
      table: { category: 'States' },
    },
    item1Text: {
      name: 'First item text',
      description: 'Customize the text shown on the first item',
      table: { category: 'Inputs' },
    },
    item1Icon: {
      name: 'First item icon',
      description: 'Customize the icon shown on the first item',
      table: { category: 'Inputs' },
    },
    hasDivider: {
      name: 'Show divider',
      description: 'Shows the divider line at the bottom',
      table: { category: 'Inputs' },
    },
    toggleIconDisplay: {
      name: 'Show icons',
      description: 'Shows the icons of the items',
      table: { category: 'Inputs' },
    },
    toggleChipDisplay: {
      name: 'Show content as chip',
      description: 'Shows the item content as chips',
      table: { category: 'Inputs' },
    },
    toggleInputDisplay: {
      name: 'Display input',
      control: 'radio',
      description: 'Displays an input on the menu list items',
      options: ['none', 'radio', 'checkbox'],
    },
    itemClickEvent: {
      action: 'itemClickEvent',
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      page: MenuLitemDocs,
    },
    controls: {
      exclude: [
        'firstItem',
        'secondItem',
        'thirdItem',
        'radioSelection',
        'ngOnChanges',
        'resetSelections',
        'onActionClicked',
        'chipSize',
        'chipType',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MenuListItemModule],
    }),
  ],
} as unknown as Meta<MenuListItemComponent>;

const template: Story<MenuListItemComponent> = (args: MenuListItemComponent) => ({
  component: MenuListItemComponent,
  props: args,
});

export const menuListItem = template.bind({});
menuListItem.args = {
  isLoading: false,
  isDisabled: false,
  hasDivider: false,
  item1Text: 'Lorem ipsum dolor sit amet',
  item1Icon: 'uk2-download',
  toggleIconDisplay: true,
  toggleChipDisplay: false,
  toggleInputDisplay: 'none',
};
