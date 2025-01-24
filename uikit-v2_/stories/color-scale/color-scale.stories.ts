import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import colorScaleDocumentation from './color-scale.docs.mdx';
import { ColorScaleComponent } from './color-scale.component';
import { ColorScaleModule } from './color-scale.module';

export default {
  title: 'Color Scale',
  component: ColorScaleComponent,
  argTypes: {},
  parameters: {
    docs: {
      page: colorScaleDocumentation,
    },
    controls: {
      exclude: [],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ColorScaleModule],
    }),
  ],
} as Meta<ColorScaleComponent>;

const colorScaleTemplate: Story<ColorScaleComponent> = (args: ColorScaleComponent) => ({
  component: ColorScaleComponent,
  props: {
    ...args,
  },
});
export const colorScale = colorScaleTemplate.bind({});
colorScale.args = {};
