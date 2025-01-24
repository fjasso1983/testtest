import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { Uk2FormFieldHintDisplayPatternEnum } from '@axos/uikit-v2-lib';

import { DisplayPatternComponent } from './display-pattern.component';
import { DisplayPatternModule } from './display-pattern.module';
import displayPatternDocumentation from './display-pattern.docs.mdx';

export default {
  title: 'Components/Form Field/Helper Text',
  component: DisplayPatternComponent,
  argTypes: {
    helperText: {
      name: 'Helper Text',
      description: 'Text for hint',
      table: { category: 'Inputs' },
    },
    errorText: {
      name: 'Error Text',
      description: 'Text for validation text',
      table: { category: 'Inputs' },
    },
    isRequired: {
      name: 'Field Required',
      description: 'Toggle field to required',
      table: { category: 'Inputs' },
    },
  },
  parameters: {
    docs: {
      page: displayPatternDocumentation,
    },
    controls: {
      exclude: ['nameInput', 'handleRequired', 'ngOnChanges', 'ngAfterViewInit'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DisplayPatternModule],
    }),
  ],
} as Meta;

const displayPatternTemplate: Story<DisplayPatternComponent> = (args: DisplayPatternComponent) => ({
  component: DisplayPatternComponent,
  props: {
    ...args,
  },
});

export const displayPattern = displayPatternTemplate.bind({});
displayPattern.args = {
  behavior: Uk2FormFieldHintDisplayPatternEnum.alwaysVisible,
};
