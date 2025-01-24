import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Uk2InputSizeEnum, Uk2PasswordRulesModule, Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { PasswordRulesComponent } from './password-rules.component';
import passwordRulesDocumentation from './password-rules.docs.mdx';
import { HttpClientModule } from '@angular/common/http';
import { StoriesCommonModule } from 'stories/stories-common.module';

export default {
  title: 'Components/Input',
  component: PasswordRulesComponent,
  argTypes: {
    form: { table: { disable: true } },
    showPassword: { table: { disable: true } },
    pwdErrorMessage: { table: { disable: true } },
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
      page: passwordRulesDocumentation,
    },
    controls: {
      exclude: [
        'ngOnChanges',
        'ngOnInit',
        'processPassword',
        'toggleShowPassword',
        'listenInputPasswordBlurEvent',
        'inputPassword',
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
        Uk2PasswordRulesModule,
        HttpClientModule,
        Uk2ServicesModule,
      ],
    }),
  ],
} as unknown as Meta<PasswordRulesComponent>;

const passwordRulesTemplate: Story<PasswordRulesComponent> = (args: PasswordRulesComponent) => {
  const formGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  return {
    component: PasswordRulesComponent,
    props: {
      ...args,
      form: formGroup,
    },
  };
};

export const passwordStrength = passwordRulesTemplate.bind({});
passwordStrength.args = {
  inputSize: Uk2InputSizeEnum.large,
};
