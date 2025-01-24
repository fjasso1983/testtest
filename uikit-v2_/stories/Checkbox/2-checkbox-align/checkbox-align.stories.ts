import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CheckboxAlignComponent } from './checkbox-align.component';
import CheckboxDocs from './checkbox-align.docs.mdx';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoriesCommonModule } from 'stories/stories-common.module';

export default {
  title: 'Components/Checkbox',
  component: CheckboxAlignComponent,
  argTypes: {
    align: {
      name: 'Alignment',
      description: 'Defines the alignment',
      table: { category: 'Alignment' },
      options: ['Left', 'Right'],
      control: { type: 'radio' },
      default: 'Left',
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    IsAlignRight: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: CheckboxDocs,
    },
  },
  decorators: [
    moduleMetadata({
      imports: [StoriesCommonModule, MatCheckboxModule],
    }),
  ],
} as unknown as Meta<CheckboxAlignComponent>;

const alignmentTemplate: Story<CheckboxAlignComponent> = (args: CheckboxAlignComponent) => ({
  component: CheckboxAlignComponent,
  props: {
    ...args,
  },
});
export const alignment = alignmentTemplate.bind({});
alignment.args = {};
alignment.storyName = 'Alignment';
