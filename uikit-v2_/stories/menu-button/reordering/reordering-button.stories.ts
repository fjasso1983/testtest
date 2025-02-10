import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import ReorderingButtonDocumentation from './reordering-button.docs.mdx';
import { ReorderingButtonComponent } from './reordering-button.component';
import { MultipleOptionButtonModule } from './reordering-button.module';
import { Uk2MenuButtonScrollStrategy } from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Menu Button/Reordering and scrolling',
  component: ReorderingButtonComponent,
  argTypes: {
    iconOnlyCssClass: {
      name: 'Icon Only CSS Class',
      description:
        'CSS class to apply when the button is icon only variant, this can be defined by the end developer depending on the use case.',
      control: 'select',
      options: [
        'uk2-menu-icon-button__custom-size-24',
        'uk2-menu-icon-button__custom-size-28',
        'uk2-menu-icon-button__custom-size-32',
        undefined,
      ],
      table: { category: 'Inputs' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    isIconOnly: {
      name: 'Is Icon Only',
      description: 'Defines if the button will contain both text and icon or just icon',
      table: {
        category: 'Inputs',
      },
    },
    displayBorder: {
      name: 'Display Border',
      description: 'Toggle borders on button',
      table: {
        category: 'Inputs',
      },
    },
    displayBadge: {
      name: 'Display Badge',
      description: 'Toggle the badge on the button',
      table: {
        category: 'Inputs',
      },
    },
    uk2BackdropIsEnabled: {
      name: 'Is Backdrop Enabled',
      description: 'When true, the user will not be able to interact with the content behind the flyout when opened.',
      table: { category: 'Inputs' },
    },
    uk2BackdropIsHidden: {
      name: 'Backdrop Is Hidden',
      description:
        'When true, the backdrop color will be transparent. Otherwise will apply the default color or custom if specified.',
      table: { category: 'Inputs' },
    },
    uk2ScrollStrategy: {
      name: 'Scroll Strategy',
      description:
        'Determines the behavior of the flyout when opened while the user scrolls through the page. (Block strategy prevent scrolling while the flayout is opened. Close strategy close the flayout as soon as the user starts scrolling. Noop strategy do not follow the flayout while scrolling. Reposition strategy update the flayout position as the user is scrolling)',
      table: { category: 'Inputs' },
      control: 'select',
      options: Uk2MenuButtonScrollStrategy,
    },
    enableListScrolling: {
      name: 'Enable list scrolling',
      description: 'Enable/disable the scrolling of the list of items. If the list is too long, it will be scrollable.',
      table: { category: 'Inputs' },
    },
    listScrollingMaxHeight: {
      name: 'List scrolling max height',
      description:
        'The max height of the list of items when scrolling is enabled. If the list elements exceed this height, it will be scrollable.',
      table: { category: 'Inputs' },
    },
    enableListFooter: {
      name: 'Enable overlay list footer',
      description: 'Enable/disable the footer of the overlay list of items.',
      table: { category: 'Inputs' },
    },
    isDisabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    defaultStateText: {
      name: 'Default State Text',
      description: 'Customize the text for the button default state.',
      table: { category: 'Labels' },
    },
    activeStateText: {
      name: 'Active State Text',
      description: 'Customize the text for when multiple options are selected or button is on mobile size.',
      table: { category: 'Labels' },
    },
    uk2BottomSheetTitle: {
      name: 'Bottom Sheet Title',
      description: 'Title for the bottom sheet',
      table: { category: 'Labels' },
    },
    uk2BottomSheetDescription: {
      name: 'Bottom Sheet Description',
      description: 'Description for the bottom sheet',
      table: { category: 'Labels' },
    },
  },
  parameters: {
    docs: {
      page: ReorderingButtonDocumentation,
    },
    controls: {
      exclude: [
        'icon',
        'buttonType',
        'items',
        'receivedItems',
        'onItemSelected',
        'handleApplyButton',
        'menuButton',
        'uk2ButtonSize',
        'disableApplyButton',
        'onItemsReordered',
        'enableListOrdering',
        'resetColumns',
        'originalItems',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MultipleOptionButtonModule],
    }),
  ],
} as Meta<ReorderingButtonComponent>;

const basicUsageTemplate: Story<ReorderingButtonComponent> = (args: ReorderingButtonComponent) => ({
  component: ReorderingButtonComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  iconOnlyCssClass: 'uk2-menu-icon-button__custom-size-32',
  isIconOnly: false,
  displayBorder: true,
  displayBadge: false,
  isLoading: false,
  isDisabled: false,
  defaultStateText: 'Filter',
  activeStateText: 'Filtered',
  uk2BackdropIsEnabled: true,
  uk2BackdropIsHidden: true,
  uk2ScrollStrategy: Uk2MenuButtonScrollStrategy.block,
  uk2BottomSheetTitle: '',
  uk2BottomSheetDescription: '',
};
