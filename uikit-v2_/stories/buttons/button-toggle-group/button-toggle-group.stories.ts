import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import Documentation from './button-toggle-group.docs.mdx';
import { ButtonToggleGroupComponent } from './button-toggle-group.component';
import { ButtonToggleGroupModule } from './button-toggle-group.module';
import { Uk2ButtonToggleGroupSizeEnum } from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Buttons',
  component: ButtonToggleGroupComponent,
  argTypes: {
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'Inputs' },
    },
    size: {
      name: 'Button size',
      description: 'Size of the button. It could be large or small.',
      options: [Uk2ButtonToggleGroupSizeEnum.small, Uk2ButtonToggleGroupSizeEnum.medium],
      control: { type: 'radio' },
      table: { category: 'Inputs' },
    },
    clickEvent: {
      action: 'clickEvent',
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      page: Documentation,
    },
    controls: {
      exclude: ['onValueChange'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ButtonToggleGroupModule],
    }),
  ],
} as Meta<ButtonToggleGroupComponent>;

const buttonToggleTemplate: Story<ButtonToggleGroupComponent> = (args: ButtonToggleGroupComponent) => ({
  component: ButtonToggleGroupComponent,
  props: {
    ...args,
  },
});
export const toggleButton = buttonToggleTemplate.bind({});
toggleButton.args = {
  size: Uk2ButtonToggleGroupSizeEnum.small,
};
