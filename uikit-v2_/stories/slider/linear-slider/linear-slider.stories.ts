import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { Uk2SliderVariantEnum } from '@axos/uikit-v2-lib';

import { LinearSliderComponent } from './linear-slider.component';
import LinearSliderDocumentation from './linear-slider.docs.mdx';
import { LinearSliderModule } from './linear-slider.module';

export default {
  title: 'Components/Slider',
  component: LinearSliderComponent,
  argTypes: {
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to skeleton state',
      table: { category: 'Inputs' },
    },
    maxText: {
      name: 'Max Text',
      description: 'Customize the max value text of slider',
      table: { category: 'Labels' },
    },
    minText: {
      name: 'Min Text',
      description: 'Customize the min value text of slider',
      table: { category: 'Labels' },
    },
    maxValue: {
      name: 'Max Value',
      description: 'Max value of slider',
      table: { category: 'Inputs' },
    },
    minValue: {
      name: 'Min Value',
      description: 'Min value of slider',
      table: { category: 'Inputs' },
    },
    step: {
      name: 'Step',
      description: 'Value used to increment/decrement slider',
      table: { category: 'Inputs' },
    },
    variant: {
      name: 'Variant',
      description: 'Enum to set slider style solid/gradient',
      table: { category: 'Inputs' },
    },
    value: {
      name: 'Slider value',
      description: 'Set slider initial value',
      table: { category: 'Inputs' },
    },
  },
  parameters: {
    docs: {
      page: LinearSliderDocumentation,
    },
  },
  decorators: [
    moduleMetadata({
      imports: [LinearSliderModule],
    }),
  ],
} as Meta<LinearSliderComponent>;

const linearSliderTemplate: Story<LinearSliderComponent> = (args: LinearSliderComponent) => ({
  component: LinearSliderComponent,
  props: {
    ...args,
  },
});

export const linearSlider = linearSliderTemplate.bind({});
linearSlider.args = {
  variant: Uk2SliderVariantEnum.solid,
};
