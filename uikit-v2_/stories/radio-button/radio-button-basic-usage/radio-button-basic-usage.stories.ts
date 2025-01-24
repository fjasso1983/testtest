import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { RadioButtonBasicUsageComponent } from './radio-button-basic-usage.component';
import radioButtonBasicUsageDocumentation from './radio-button-basic-usage.docs.mdx';
import { RadioButtonBasicUsageModule } from './radio-button-basic-usage.module';
import { Uk2RadioButtonAlignmentEnum, Uk2RadioButtonSizeEnum } from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Radio Button',
  component: RadioButtonBasicUsageComponent,
  argTypes: {
    isDisabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    labelText: {
      name: 'Text',
      description: 'Customize the label for the input',
      table: { category: 'Label' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    size: {
      name: 'Text Size',
      description: 'Toggle from small to medium text density',
      table: { category: 'Inputs' },
    },
    alignment: {
      name: 'Toggle Alignment',
      description: 'Toggle alignment from left to right',
      table: { category: 'Inputs' },
    },
    linkText: {
      name: 'Text',
      description: 'Change link text',
      table: { category: 'Hyperlink' },
    },
    linkVisible: {
      name: 'Is Visible',
      description: 'Shows/Hide link',
      table: { category: 'Hyperlink' },
    },
    isHorizontalLayout: {
      name: 'Horizontal Layout',
      description: 'Toggle to horizontal layout',
      table: { category: 'Layout' },
    },
    spaceBetweenRadios: {
      name: 'Space Between Radios',
      description: 'Set space in pixels between radio buttons',
      table: { category: 'Layout' },
    },
  },
  parameters: {
    docs: {
      page: radioButtonBasicUsageDocumentation,
    },
    controls: {
      exclude: ['linkClicked', 'calculateGap'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [RadioButtonBasicUsageModule],
    }),
  ],
} as unknown as Meta<RadioButtonBasicUsageComponent>;

const basicUsageTemplate: Story<RadioButtonBasicUsageComponent> = (args: RadioButtonBasicUsageComponent) => ({
  component: RadioButtonBasicUsageComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  size: Uk2RadioButtonSizeEnum.small,
  alignment: Uk2RadioButtonAlignmentEnum.left,
  isHorizontalLayout: false,
  spaceBetweenRadios: 0,
};
