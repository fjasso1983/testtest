import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import tagInputDocumentation from './tag-input.docs.mdx';
import { TagInputComponent } from './tag-input.component';
import { TagInputModule } from './tag-input.module';
import { Uk2DropdownSizeEnum } from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Tag Input',
  component: TagInputComponent,
  argTypes: {
    disabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    isRequired: {
      name: 'Is Required',
      description: 'Toggle required attribute when this is true.',
      table: { category: 'States' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle skeleton view when this is true.',
      table: { category: 'States' },
    },
    dropdownSize: {
      name: 'Input size',
      description: 'Customize size of the input.',
      control: { type: 'radio' },
      options: Uk2DropdownSizeEnum,
      table: { category: 'Inputs' },
    },
    hintText: {
      name: 'Helper Text',
      description: 'Customize helper text.',
      table: { category: 'Labels' },
    },
    placeholderText: {
      name: 'Placeholder Text',
      description: 'Customize placeholder text.',
      table: { category: 'Labels' },
    },
    labelText: {
      name: 'Label Text',
      description: 'Customize label.',
      table: { category: 'Labels' },
    },
  },
  parameters: {
    docs: {
      page: tagInputDocumentation,
    },
    controls: {
      exclude: [
        'behavior',
        'control',
        'controlRequired',
        'optionList',
        'handleError',
        'handleIsLoading',
        'markAsError',
        'markAsNormal',
        'onItemRemoved',
        'removeFirst',
        'ngOnChanges',
        'handleDisabled',
        'ngOnInit',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [TagInputModule],
    }),
  ],
} as Meta<TagInputComponent>;

const template: Story<TagInputComponent> = (args: TagInputComponent) => ({
  component: TagInputComponent,
  props: {
    ...args,
  },
});
export const basicUsage = template.bind({});
basicUsage.args = {
  dropdownSize: Uk2DropdownSizeEnum.large,
};
