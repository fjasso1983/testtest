import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Uk2InputSizeEnum, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { InputFormsIntegrationComponent } from './input-forms-integration.component';
import inputDocumentation from './input-forms-integration.docs.mdx';
import { HttpClientModule } from '@angular/common/http';
import { StoriesCommonModule } from 'stories/stories-common.module';

export default {
  title: 'Components/Input',
  component: InputFormsIntegrationComponent,
  argTypes: {
    form: { table: { disable: true } },
    emailIsFocused: { table: { disable: true } },
    firstNameIsFocused: { table: { disable: true } },
    phoneIsFocused: { table: { disable: true } },
    onFieldBlured: { table: { disable: true } },
    uk2IsLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    inputSize: {
      name: 'Input size',
      description: 'Customize size of the input.',
      control: { type: 'radio' },
      options: Uk2InputSizeEnum,
      table: { category: 'Labels' },
    },
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
} as unknown as Meta<InputFormsIntegrationComponent>;

const reactiveFormControlTemplate: Story<InputFormsIntegrationComponent> = (args: InputFormsIntegrationComponent) => {
  const formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9 ]{10}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  return {
    component: InputFormsIntegrationComponent,
    props: {
      ...args,
      form: formGroup,
    },
  };
};

export const formsIntegration = reactiveFormControlTemplate.bind({});
formsIntegration.args = {
  inputSize: Uk2InputSizeEnum.large,
};
