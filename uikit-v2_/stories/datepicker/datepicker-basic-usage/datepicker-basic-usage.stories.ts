import { moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Meta, Story } from '@storybook/angular/types-6-0';

import { Uk2InputSizeEnum } from '@axos/uikit-v2-lib';

import { DatepickerBasicUsageComponent } from './datepicker-basic-usage.component';
import { DatepickerBasicUsageModule } from './datepicker-basic-usage.module';
import datepickerBasicUsageDocumentation from './datepicker-basic-usage.docs.mdx';

export default {
  title: 'Components/Datepicker',
  component: DatepickerBasicUsageComponent,
  argTypes: {
    isDisabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    isRequired: {
      name: 'Is Required',
      description: 'Toggle to required state when this is true',
      table: { category: 'States' },
    },
    labelText: {
      name: 'Label Text',
      description: 'Customize the label for the input',
      table: { category: 'Labels' },
    },
    helperText: {
      name: 'Helper Text',
      description: 'Customize the helper text for the input',
      table: { category: 'Labels' },
    },
    uk2IsLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    valueInput: { table: { disable: true } },
    uk2InputSize: {
      name: 'Input size',
      description: 'Customize size of input',
      control: { type: 'radio' },
      options: Uk2InputSizeEnum,
      table: { category: 'Inputs' },
    },
  },
  parameters: {
    docs: {
      page: datepickerBasicUsageDocumentation,
    },
    controls: {
      exclude: ['errorText', 'ngOnChanges', 'ngOnInit', 'form', 'placeholderText', 'svgIconHint', 'svgIconName'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DatepickerBasicUsageModule],
    }),
  ],
} as unknown as Meta<DatepickerBasicUsageComponent>;

const basicUsageTemplate: Story<DatepickerBasicUsageComponent> = (args: DatepickerBasicUsageComponent) => {
  const formGroup = new FormGroup({
    date1: new FormControl(
      {
        value: '',
        disabled: args.isDisabled,
      },
      [Validators.required]
    ),
  });

  return {
    component: DatepickerBasicUsageComponent,
    props: {
      ...args,
      form: formGroup,
    },
  };
};
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  uk2InputSize: Uk2InputSizeEnum.large,
};
