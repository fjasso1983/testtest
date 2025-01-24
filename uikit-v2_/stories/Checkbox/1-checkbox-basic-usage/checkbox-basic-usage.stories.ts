import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CheckboxComponent } from './checkbox-basic-usage.component';
import CheckboxDocs from './checkbox-basic-usage.docs.mdx';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoriesCommonModule } from 'stories/stories-common.module';

export default {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  argTypes: {
    indeterminate: {
      name: 'Is indeterminate',
      description: 'Toggle to indeterminate state when this is true.',
      table: { category: 'States' },
    },
    isChecked: {
      name: 'Is Checked',
      description: 'Toggle to checked state when this is true.',
      table: { category: 'States' },
    },
    disabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    text: {
      name: 'Label Text',
      description: 'Customize the label for the checkbox',
      table: { category: 'Labels' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    hasHyperlink: {
      name: 'Has Hyperlink',
      description: 'Flag to indicate if the checkbox has hyperlink or not.',
      table: { category: 'Hyperlink' },
    },
    hyperlinkText: {
      name: 'Hyperlink text',
      description: 'Customize the text for the hyperlink.',
      table: { category: 'Hyperlink' },
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
} as unknown as Meta<CheckboxComponent>;

const basicUsageTemplate: Story<CheckboxComponent> = (args: CheckboxComponent) => ({
  component: CheckboxComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {};
