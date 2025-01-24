import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { Uk2ButtonSizeEnum, Uk2TextButtonVariant } from '@axos/uikit-v2-lib';

import textButtonDocumentation from './text-button.docs.mdx';
import { TextButtonComponent } from './text-button.component';
import { TextButtonModule } from './text-button.module';

export default {
  title: 'Components/Buttons/Text Button',
  component: TextButtonComponent,
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
    uk2InlineLoading: {
      name: 'Is inline loading active',
      description: 'Toggle to switch from default state to inline loading state.',
      table: { category: 'States' },
    },
    isDisabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    text: {
      name: 'Text',
      description: 'Customize the text for button.',
      table: { category: 'Labels' },
    },
    uk2InlineLoadingText: {
      name: 'Inline loading text',
      description: 'Customize the text for inline loading button.',
      table: { category: 'Labels' },
    },
    uk2TextButtonVariant: {
      name: 'Text button variant',
      description: 'Control the styles for different text button variants',
      table: { category: 'Inputs' },
    },
  },
  parameters: {
    docs: {
      page: textButtonDocumentation,
    },
    controls: { exclude: 'ngOnChange' },
  },
  decorators: [
    moduleMetadata({
      imports: [TextButtonModule],
    }),
  ],
} as Meta<TextButtonComponent>;

const textButtonTemplate: Story<TextButtonComponent> = (args: TextButtonComponent) => ({
  component: TextButtonComponent,
  props: {
    ...args,
  },
});
export const textButton = textButtonTemplate.bind({});
textButton.args = {
  uk2ButtonSize: Uk2ButtonSizeEnum.large,
  uk2InlineLoading: false,
  uk2InlineLoadingText: 'Adding',
  uk2TextButtonVariant: Uk2TextButtonVariant.button,
};
