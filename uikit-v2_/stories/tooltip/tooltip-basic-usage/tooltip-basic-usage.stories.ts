import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { TooltipBasicUsageComponent } from './tooltip-basic-usage.component';
import tooltipDocumentation from './tooltip-basic-usage.docs.mdx';
import { TooltipBasicUsageModule } from './tooltip-basic-usage.module';
import { Uk2TooltipPlacementEnum, Uk2TooltipSizeEnum, Uk2TooltipTriggerEnum } from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Tooltip',
  component: TooltipBasicUsageComponent,
  argTypes: {
    uk2IsLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'Tooltip component' },
    },
    labelText: {
      name: 'Text label',
      description: 'Text label of component',
      control: 'text',
      table: { category: 'Tooltip component' },
    },
    size: {
      name: 'Size',
      description: 'Determines the size of label text and icon.',
      options: Uk2TooltipSizeEnum,
      control: { type: 'radio' },
      table: { category: 'Tooltip component' },
    },
    bodyText: {
      name: 'Body text',
      description: 'Tooltip box body text',
      control: 'text',
      table: { category: 'Tooltip box' },
    },
    svgIconName: {
      name: 'Icon',
      description: 'Icon name from Uk2 Icon library.',
      control: 'text',
      table: { category: 'Tooltip component' },
    },
    displayCloseButton: {
      name: 'Close button visible',
      description: 'Add button action to tooltip box.',
      control: 'boolean',
      table: { category: 'Tooltip box' },
    },
    arrowOffset: {
      name: 'Arrow offset position',
      description: 'Add offset to arrow tooltip box position.',
      control: 'number',
      table: { category: 'Tooltip box' },
    },
    placement: {
      name: 'Placement Box',
      description:
        "The <strong>preferred</strong> placement of the Tooltip box. Note that Tooltip's flip modifier can change this to the opposite placement if it has more space.",
      options: Uk2TooltipPlacementEnum,
      control: { type: 'radio' },
      table: { category: 'Tooltip box' },
    },
    desktopOpenMode: {
      name: 'Desktop open mode',
      description: 'Determines the events that cause the tippy to show in desktop and tablet (display > 576px)',
      options: Uk2TooltipTriggerEnum,
      control: { type: 'radio' },
      table: { category: 'Tooltip component' },
    },
  },
  parameters: {
    docs: {
      page: tooltipDocumentation,
    },
    controls: {
      exclude: ['closeButtonClick', 'ngOnInit'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TooltipBasicUsageModule],
    }),
  ],
} as unknown as Meta<TooltipBasicUsageComponent>;

const basicUsageTemplate: Story<TooltipBasicUsageComponent> = (args: TooltipBasicUsageComponent) => ({
  component: TooltipBasicUsageComponent,
  props: {
    ...args,
  },
});

export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  placement: Uk2TooltipPlacementEnum.auto,
  desktopOpenMode: Uk2TooltipTriggerEnum.hover,
  labelText: "Didn't receive the code?",
  size: Uk2TooltipSizeEnum.large,
};
