import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Uk2ButtonSizeEnum } from '@axos/uikit-v2-lib';
import SecondaryButtonDocumentation from './secondary-button.docs.mdx';
import { SecondaryButtonComponent } from './secondary-button.component';
import { SecondaryButtonModule } from './secondary-button.module';

export default {
  title: 'Components/Buttons',
  component: SecondaryButtonComponent,
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
    uk2InlineLoading: {
      name: 'Is inline loading active',
      description: 'Toggle to switch from default state to inline loading state.',
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
  },
  parameters: {
    docs: {
      page: SecondaryButtonDocumentation,
    },
    controls: { exclude: 'ngOnChange' },
  },
  decorators: [
    moduleMetadata({
      imports: [SecondaryButtonModule],
    }),
  ],
} as Meta<SecondaryButtonComponent>;

const secondaryButtonTemplate: Story<SecondaryButtonComponent> = (args: SecondaryButtonComponent) => ({
  component: SecondaryButtonComponent,
  props: {
    ...args,
  },
});
export const secondaryButton = secondaryButtonTemplate.bind({});
secondaryButton.args = {
  uk2ButtonSize: Uk2ButtonSizeEnum.large,
  uk2InlineLoading: false,
  uk2InlineLoadingText: 'Adding',
};
