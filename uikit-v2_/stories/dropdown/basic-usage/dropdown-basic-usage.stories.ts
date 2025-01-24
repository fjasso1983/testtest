import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { DropdownComponent } from './dropdown-basic-usage.component';
import { Module } from './module';
import documentation from './dropdown-basic-usage.doc.mdx';
import { Uk2DropdownSizeEnum } from '@axos/uikit-v2-lib';

export default {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [Module],
    }),
  ],
  argTypes: {
    disabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    isRequired: {
      name: 'Is Required',
      description: 'Toggle required attribute when this is true',
      table: { category: 'States' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle skeleton view when this is true',
      table: { category: 'States' },
    },
    hintText: {
      name: 'Helper Text',
      description: 'Customize helper text',
      table: { category: 'Labels' },
    },
    placeholderText: {
      name: 'Placeholder Text',
      description: 'Customize placeholder text',
      table: { category: 'Labels' },
    },
    labelText: {
      name: 'Label Text',
      description: 'Customize label',
      table: { category: 'Labels' },
    },
    dropdownSize: {
      name: 'Input size',
      description: 'Customize size of the input',
      control: { type: 'radio' },
      options: Uk2DropdownSizeEnum,
      table: { category: 'Inputs' },
    },
    bottomSheetListHeader: {
      name: 'Header Text',
      description: 'Customize header text for bottom sheet when flyout is opened on mobile screens',
      table: { category: 'Bottom Sheet - Responsive' },
    },
    bottomSheetListDescription: {
      name: 'Body Text',
      description: 'Customize body text for bottom sheet when flyout is opened on mobile screens',
      table: { category: 'Bottom Sheet - Responsive' },
    },
  },
  parameters: {
    docs: {
      page: documentation,
    },
    controls: {
      exclude: [
        'behavior',
        'control',
        'controlRequired',
        'handleError',
        'handleIsLoading',
        'markAsError',
        'markAsNormal',
        'ngOnChanges',
        'handleDisabled',
        'ngOnInit',
      ],
    },
  },
} as Meta;

const Template: Story<DropdownComponent> = (args: DropdownComponent) => ({
  props: args,
});

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  dropdownSize: Uk2DropdownSizeEnum.large,
};
