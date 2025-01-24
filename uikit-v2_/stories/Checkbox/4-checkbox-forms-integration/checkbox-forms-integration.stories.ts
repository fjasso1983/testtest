import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CheckboxExampleFormComponent } from './checkbox-forms-integration.component';
import CheckboxDocs from './checkbox-forms-integration.docs.mdx';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { StoriesCommonModule } from 'stories/stories-common.module';

export default {
  title: 'Components/Checkbox',
  component: CheckboxExampleFormComponent,
  argTypes: {
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    ngOnInit: {
      table: {
        disable: true,
      },
    },
    form: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: CheckboxDocs,
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
        MatCheckboxModule,
      ],
    }),
  ],
} as unknown as Meta<CheckboxExampleFormComponent>;

const formIntegrationTemplate: Story<CheckboxExampleFormComponent> = (args: CheckboxExampleFormComponent) => ({
  component: CheckboxExampleFormComponent,
  props: {
    ...args,
  },
});
export const formIntegration = formIntegrationTemplate.bind({});
formIntegration.args = {};
formIntegration.storyName = 'Forms integration';
