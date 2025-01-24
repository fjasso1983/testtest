import { PanelComponent } from './panel.component';
import { moduleMetadata } from '@storybook/angular';
import { PanelModule } from './panel.component.module';
import panelDocumentation from './panel.component.docs.mdx';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Uk2ButtonSizeEnum, Uk2PanelHeaderTextBehaviorEnum } from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Panel',
  component: PanelComponent,
  parameters: {
    docs: {
      page: panelDocumentation,
    },
    controls: {
      exclude: ['buttonSize', 'closePanel', 'openPanel', 'sidePanelRef', 'ngOnChanges'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [PanelModule],
    }),
  ],
  argTypes: {
    contentTemplate: {
      name: 'Body Text',
      description:
        'The content of the panel is an ng-template that can receive components with custom styles. For this example a customizable text component is created',
      table: { category: 'Content' },
    },
    panelWidth: {
      name: 'Panel width',
      description:
        "Width of the panel, numeric values represent width in pixels, string values represent a valid CSS unit (e.g. '80%' or '80vh'), 'auto' value adjusts the panel width to the inner content.",
      table: { category: 'Size' },
    },
    panelMinWidth: {
      name: 'Panel min width',
      description: "Minimum width of the panel, numeric values represents width in pixels (e.g. '496')",
      table: { category: 'Size' },
    },
    panelMaxWidth: {
      name: 'Panel max width',
      description: "Maximum width of the panel, numeric values represents width in pixels (e.g. '1280')",
      table: { category: 'Size' },
    },
    headerTitle: {
      name: 'Header title',
      description: 'Header title text',
      table: { category: 'Header' },
    },
    headerBehavior: {
      name: 'Header title text behavior',
      description: 'Toggle text behavior of tile header from "truncate" to "wrap"',
      table: { category: 'Header' },
      options: [Uk2PanelHeaderTextBehaviorEnum.wrap, Uk2PanelHeaderTextBehaviorEnum.truncate],
      control: { type: 'radio' },
    },
    headerLeftActions: {
      name: 'Header Left Actions Template',
      description: 'Customize the header left buttons',
      table: { category: 'Header' },
    },
    headerRightActions: {
      name: 'Header Right Actions Template',
      description: 'Customize the header right buttons',
      table: { category: 'Header' },
    },
    showFooter: {
      name: 'Show footer',
      description: 'Shows the panel footer',
      table: { category: 'Footer' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
      control: 'boolean',
    },
    isPanelResizable: {
      name: 'Is Panel Resizable',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
      control: 'boolean',
    },
    closeOnBackdropClick: {
      name: 'Close panel on backdrop click',
      description: 'Closes the panel when clicking on the backdrop',
      table: { category: 'States' },
      control: 'boolean',
    },
    primaryButtonSize: {
      name: 'Primary Button size',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
      options: Uk2ButtonSizeEnum,
      control: { type: 'radio' },
    },
    secondaryButtonSize: {
      name: 'Secondary Button size',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
      options: Uk2ButtonSizeEnum,
      control: { type: 'radio' },
    },
    textButtonSize: {
      name: 'Text Button size',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
      options: Uk2ButtonSizeEnum,
      control: { type: 'radio' },
    },
    primaryButtonLabel: {
      name: 'Primary Button text',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    primaryButtonVisible: {
      name: 'Primary Button is visible',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    primaryButtonClosePanel: {
      name: 'Primary Button closes panel',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    secondaryButtonLabel: {
      name: 'Secondary Button text',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    secondaryButtonVisible: {
      name: 'Secondary Button is visible',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    secondaryButtonClosePanel: {
      name: 'Secondary Button closes panel',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    textButtonLabel: {
      name: 'Text Button text',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    textButtonVisible: {
      name: 'Text Button is visible',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },
    textButtonClosePanel: {
      name: 'Text Button closes panel',
      description: 'Customize the actions buttons',
      table: { category: 'Buttons' },
    },

    clickEvent: {
      action: 'clickEvent',
      table: { disable: true },
    },
    headerClickEvent: {
      action: 'headerClickEvent',
      table: { disable: true },
    },
  },
} as Meta<PanelComponent>;

const panelTemplate: Story<PanelComponent> = (args: PanelComponent) => ({
  component: PanelComponent,
  props: {
    ...args,
  },
});

export const basicUsage = panelTemplate.bind({});
basicUsage.args = {
  contentTemplate:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  panelWidth: '80%',
  headerBehavior: Uk2PanelHeaderTextBehaviorEnum.truncate,
  headerTitle: 'Lorem ipsum dolor sit amet',
  showFooter: true,
  isLoading: false,
  isPanelResizable: false,
  closeOnBackdropClick: false,
  primaryButtonLabel: 'Lorem Ipsum',
  primaryButtonVisible: true,
  primaryButtonClosePanel: false,
  primaryButtonSize: Uk2ButtonSizeEnum.large,
  secondaryButtonLabel: 'Lorem Ipsum',
  secondaryButtonVisible: true,
  secondaryButtonClosePanel: false,
  secondaryButtonSize: Uk2ButtonSizeEnum.large,
  textButtonLabel: 'Lorem Ipsum',
  textButtonVisible: true,
  textButtonClosePanel: false,
  textButtonSize: Uk2ButtonSizeEnum.large,
};
basicUsage.storyName = 'Basic Usage';
