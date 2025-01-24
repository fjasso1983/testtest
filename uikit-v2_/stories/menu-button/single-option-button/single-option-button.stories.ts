import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import SingleOptionButtonDocumentation from './single-option-button.docs.mdx';
import { SingleOptionButtonComponent } from './single-option-button.component';
import { SingleOptionButtonModule } from './single-option-button.module';
import { Uk2MenuButtonScrollStrategy } from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Menu Button/Single option',
  component: SingleOptionButtonComponent,
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
    keepLastSelection: {
      name: 'Keep Last Selection',
      description:
        "When set to true, the sort option allows only one selection (maximum and minimum) Clicking the selected item won't unselect it; the event will be ignored.",
      table: {
        category: 'Inputs',
      },
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
      table: { category: 'Inputs' },
    },
    uk2BackdropIsEnabled: {
      name: 'Is Backdrop Enabled',
      description: 'Defines if the button will have an overlay backdrop.',
      table: { category: 'Inputs' },
    },
    uk2BackdropIsHidden: {
      name: 'Backdrop Is Hidden',
      description: 'Defines if the button will display the overlay backdrop.',
      table: { category: 'Inputs' },
    },
    uk2BackdropCanBeClosedWhenHasBeenClicked: {
      name: 'Backdrop Can Be Closed When Has Been Clicked',
      description: 'Defines if the button flayout can be closed by clicking on its overlay backdrop.',
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
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    isDisabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    defaultStateText: {
      name: 'Default State Text',
      description: 'Customize the text for default state button.',
      table: { category: 'Labels' },
    },
    activeStateText: {
      name: 'Active State Text',
      description: 'Customize the text for when the button has a selection and is on mobile size.',
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
      page: SingleOptionButtonDocumentation,
    },
    controls: {
      exclude: ['icon', 'buttonType', 'items', 'receivedItems', 'onItemSelected', 'isIconOnly', 'displayBorder'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [SingleOptionButtonModule],
    }),
  ],
} as Meta<SingleOptionButtonComponent>;

const basicUsageTemplate: Story<SingleOptionButtonComponent> = (args: SingleOptionButtonComponent) => ({
  component: SingleOptionButtonComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  iconOnlyCssClass: undefined,
  isLoading: false,
  isDisabled: false,
  defaultStateText: 'Sort',
  activeStateText: 'Sorted',
  keepLastSelection: true,
  isIconOnly: false,
  displayBorder: true,
  uk2BackdropIsEnabled: true,
  uk2BackdropIsHidden: true,
  uk2BackdropCanBeClosedWhenHasBeenClicked: true,
  uk2ScrollStrategy: Uk2MenuButtonScrollStrategy.block,
  uk2BottomSheetTitle: '',
  uk2BottomSheetDescription: '',
};
