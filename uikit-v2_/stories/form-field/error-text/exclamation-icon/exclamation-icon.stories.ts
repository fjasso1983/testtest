import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { ExclamationIconModule } from './exclamation-icon.module';
import { ExclamationIconComponent } from './exclamation-icon.component';
import Doc from './exclamation-icon.docs.mdx';

export default {
  title: 'Components/Form Field/Error Text',
  component: ExclamationIconComponent,
  argTypes: {
    helperText: {
      name: 'Helper Text',
      description: 'Customize helper text for the field',
      table: { category: 'Inputs' },
    },
    errorText: {
      name: 'Error Text',
      description: 'Customize error text for the field',
      table: { category: 'Inputs' },
    },
    isRequired: {
      name: 'Field Required',
      description: 'Toggle field to required to see the error message (true) or the helper text (false)',
      table: { category: 'Inputs' },
    },
  },
  parameters: {
    docs: {
      page: Doc,
    },
    controls: {
      exclude: ['nameInput', 'handleRequired', 'ngOnChanges', 'ngAfterViewInit'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ExclamationIconModule],
    }),
  ],
} as unknown as Meta<ExclamationIconComponent>;

const template: Story<ExclamationIconComponent> = (args: ExclamationIconComponent) => ({
  component: ExclamationIconComponent,
  props: {
    ...args,
  },
});

export const exclamationIcon = template.bind({});
exclamationIcon.args = {
  helperText: 'Customize helper text for the field',
  errorText: 'This field is required',
  isRequired: true,
};
