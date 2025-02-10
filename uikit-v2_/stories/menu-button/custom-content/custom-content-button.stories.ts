import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import CustomContentButtonDocumentation from './custom-content-button.docs.mdx';
import { CustomContentButtonComponent } from './custom-content-button.component';
import { CustomContentButtonModule } from './custom-content-button.module';
import { Uk2FlyoutMenuXPosition, Uk2FlyoutMenuYPosition, Uk2MenuButtonScrollStrategy } from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Menu Button/Custom content',
  component: CustomContentButtonComponent,
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
    isPressed: {
      name: 'Is Pressed',
      description: 'Toggle to switch from default state to pressed state.',
      table: { category: 'States' },
    },
    isActive: {
      name: 'Is Active',
      description: 'Toggle to switch from default state to active state.',
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
    badgeText: {
      name: 'Badge text',
      description: 'Text to be displayed on the badge',
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
    customContentOriginXPosition: {
      name: 'Custom Content Horizontal Origin Position',
      description: 'The x position of the custom content origin.',
      table: { category: 'Inputs' },
    },
    customContentOverlayXPosition: {
      name: 'Custom Content Horizontal Overlay Position',
      description: 'The x position of the custom content overlay.',
      table: { category: 'Inputs' },
    },
    customContentOriginYPosition: {
      name: 'Custom Content Vertical Origin Position',
      description: 'The y position of the custom content origin.',
      table: { category: 'Inputs' },
    },
    customContentOverlayYPosition: {
      name: 'Custom Content Vertical Overlay Position',
      description: 'The y position of the custom content overlay.',
      table: { category: 'Inputs' },
    },
    customContentOverlayYOffset: {
      name: 'Custom Content Vertical Offset',
      description: 'The y offset of the custom content overlay.',
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
  },
  parameters: {
    docs: {
      page: CustomContentButtonDocumentation,
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
        'onCustomContentsSelected',
        'timePeriodOptions',
        'documentTypeOptions',
        'selectedTimePeriod',
        'selectedDocumentType',
        'onOverlayClosed',
        'onOverlayOpened'
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [CustomContentButtonModule],
    }),
  ],
} as Meta<CustomContentButtonComponent>;

const basicUsageTemplate: Story<CustomContentButtonComponent> = (args: CustomContentButtonComponent) => ({
  component: CustomContentButtonComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  iconOnlyCssClass: 'uk2-menu-icon-button__custom-size-32',
  isIconOnly: true,
  displayBorder: false,
  displayBadge: false,
  isLoading: false,
  isPressed: false,
  isActive: false,
  isDisabled: false,
  defaultStateText: 'Open',
  activeStateText: 'Opened',
  badgeText: '2',
  uk2BackdropIsEnabled: true,
  uk2BackdropIsHidden: true,
  uk2ScrollStrategy: Uk2MenuButtonScrollStrategy.block,
  customContentOriginXPosition: Uk2FlyoutMenuXPosition.start,
  customContentOverlayXPosition: Uk2FlyoutMenuXPosition.start,
  customContentOriginYPosition: Uk2FlyoutMenuYPosition.bottom,
  customContentOverlayYPosition: Uk2FlyoutMenuYPosition.top,
  customContentOverlayYOffset: 4,
};
