import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Uk2ButtonSizeEnum } from '@axos/uikit-v2-lib';
import SecondaryButtonDocumentation from './secondary-icon-button.docs.mdx';
import { SecondaryIconButtonComponent } from './secondary-icon-button.component';
import { SecondaryIconButtonModule } from './secondary-icon-button.module';

export default {
  title: 'Components/Buttons',
  component: SecondaryIconButtonComponent,
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
    svgIconName: {
      name: 'Icon name',
      description: 'Icon name from Uk2 Icon library.',
      control: 'text',
      table: { category: 'Icon' },
    },
  },
  parameters: {
    docs: {
      page: SecondaryButtonDocumentation,
    },
    controls: { exclude: 'icon' },
  },
  decorators: [
    moduleMetadata({
      imports: [SecondaryIconButtonModule],
    }),
  ],
} as Meta<SecondaryIconButtonComponent>;

const secondaryIconButtonTemplate: Story<SecondaryIconButtonComponent> = (args: SecondaryIconButtonComponent) => ({
  component: SecondaryIconButtonComponent,
  props: {
    ...args,
  },
});
export const secondaryIconButton = secondaryIconButtonTemplate.bind({});
secondaryIconButton.args = {
  uk2ButtonSize: Uk2ButtonSizeEnum.large,
  svgIconName: 'uk2-printer',
};
