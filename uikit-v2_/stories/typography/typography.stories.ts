import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { TypographyComponent } from './typography.component';
import { TypographyModule } from './typography.module';
import TypographyDocumentation from './typography.docs.mdx';

export default {
  title: 'Typography',
  component: TypographyComponent,
  argTypes: {},
  parameters: {
    docs: {
      page: TypographyDocumentation,
    },
    controls: {
      exclude: [
        'fontWeights',
        'fontNumbers',
        'displayFontVariants',
        'bodyFontVariants',
        'getCssClass',
        'displayTexts',
        'bodyTexts',
        'ngAfterViewInit',
        'getComputedClasses',
        'insertComputedStyles',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TypographyModule],
    }),
  ],
} as unknown as Meta<TypographyComponent>;

const typographyTemplate: Story<TypographyComponent> = (args: TypographyComponent) => ({
  component: TypographyComponent,
  props: {
    ...args,
  },
});
export const typography = typographyTemplate.bind({});
typography.args = {};
