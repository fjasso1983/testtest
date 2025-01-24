import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Uk2InputSizeEnum, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { InputBasicUsageComponent } from './input-basic-usage.component';
import inputDocumentation from './input-basic-usage.docs.mdx';
import { HttpClientModule } from '@angular/common/http';
import { StoriesCommonModule } from 'stories/stories-common.module';

export default {
  title: 'Components/Input',
  component: InputBasicUsageComponent,
  argTypes: {
    isDisabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    inputSize: {
      name: 'Input size',
      description: 'Customize size of the input.',
      control: { type: 'radio' },
      options: Uk2InputSizeEnum,
      table: { category: 'Labels' },
    },
    labelText: {
      name: 'Label Text',
      description: 'Customize the label for the input',
      table: { category: 'Labels' },
    },
    placeholderText: {
      name: 'Placeholder Text',
      description: 'Customize the placeholder text for the input',
      table: { category: 'Labels' },
    },
    helperText: {
      name: 'Helper Text',
      description: 'Customize the helper text for the input',
      table: { category: 'Labels' },
    },
    errorText: {
      name: 'Error Text',
      description: 'Customize the error message for required input',
      table: { category: 'Labels' },
    },
    uk2IsLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    valueInput: { table: { disable: true } },
  },
  parameters: {
    docs: {
      page: inputDocumentation,
    },
    controls: { exclude: ['ngOnChange', 'ngOnInit'] },
  },
  decorators: [
    moduleMetadata({
      imports: [
        StoriesCommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        Uk2ServicesModule,
        HttpClientModule,
      ],
    }),
  ],
} as unknown as Meta<InputBasicUsageComponent>;

const basicUsageTemplate: Story<InputBasicUsageComponent> = (args: InputBasicUsageComponent) => ({
  component: InputBasicUsageComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  inputSize: Uk2InputSizeEnum.large,
};
