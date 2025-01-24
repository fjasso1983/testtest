import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { Uk2ButtonSizeEnum, Uk2TextButtonVariant } from '@axos/uikit-v2-lib';

import TextIconButtonDocumentation from './text-icon-button.docs.mdx';
import { TextIconButtonComponent } from './text-icon-button.component';
import { TextIconButtonModule } from './text-icon-button.module';

export default {
  title: 'Components/Buttons',
  component: TextIconButtonComponent,
  argTypes: {
    uk2ButtonSize: {
      name: 'Button size',
      description: 'Size of the button. It could be large, medium or small.',
      table: { category: 'Inputs' },
    },
    uk2IsLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    isDisabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    uk2NeutralColor: {
      name: 'Neutral color',
      description: 'Toggle to display the icon on neutral colors.',
      table: { category: 'Inputs' },
    },
    svgIconName: {
      name: 'Icon name',
      description: 'Icon name from Uk2 Icon library.',
      control: 'text',
      table: { category: 'Icon' },
    },
    uk2TextButtonVariant: {
      name: 'Text button variant',
      description: 'Control the styles for different text button variants',
      table: { category: 'Inputs' },
    },
  },
  parameters: {
    docs: {
      page: TextIconButtonDocumentation,
    },
    controls: { exclude: ['icon'] },
  },
  decorators: [
    moduleMetadata({
      imports: [TextIconButtonModule],
    }),
  ],
} as Meta<TextIconButtonComponent>;

const textIconButtonTemplate: Story<TextIconButtonComponent> = (args: TextIconButtonComponent) => ({
  component: TextIconButtonComponent,
  props: {
    ...args,
  },
});
export const textIconButton = textIconButtonTemplate.bind({});
textIconButton.args = {
  uk2ButtonSize: Uk2ButtonSizeEnum.large,
  svgIconName: 'uk2-printer',
  uk2TextButtonVariant: Uk2TextButtonVariant.button,
};
