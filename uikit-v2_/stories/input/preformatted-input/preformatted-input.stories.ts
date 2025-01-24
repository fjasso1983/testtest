import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Uk2InputSizeEnum, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import inputDocumentation from './preformatted-input.docs.mdx';
import { PreformattedInputComponent } from './preformatted-input.component';
import { HttpClientModule } from '@angular/common/http';
import { StoriesCommonModule } from 'stories/stories-common.module';

export default {
  title: 'Components/Input/PreformattedInput',
  component: PreformattedInputComponent,
  argTypes: {
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
    controls: {
      exclude: [
        'maskConfig',
        'hide',
        'form',
        'onInputChange',
        'clearField',
        'ngOnInit',
        'onKeydown',
        'setCursor',
        'onBlur',
        'showClearButton',
        'setPercentageFieldWidth',
        'clearPercentageField',
        'percentageInput',
        'ssnMaskConfig',
        'phoneMaskConfig',
        'clearPhoneField',
        'handleSelectPhone',
        'handleSelectSSN',
        'setCursorPhone',
        'setCursorSSN',
        'toggleShowSSN',
        'phoneInput',
        'showSSN',
        'ssnInput',
      ],
    },
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
        HttpClientModule,
        Uk2ServicesModule,
        NgxMaskDirective,
        NgxMaskPipe,
      ],
      providers: [provideNgxMask()],
    }),
  ],
} as unknown as Meta<PreformattedInputComponent>;

const preformattedInputTemplate: Story<PreformattedInputComponent> = (args: PreformattedInputComponent) => ({
  component: PreformattedInputComponent,
  props: {
    ...args,
  },
});
export const preformattedInput = preformattedInputTemplate.bind({});
preformattedInput.args = {
  inputSize: Uk2InputSizeEnum.large,
};
