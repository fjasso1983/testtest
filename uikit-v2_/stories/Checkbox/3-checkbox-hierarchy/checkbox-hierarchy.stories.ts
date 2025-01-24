import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CheckboxHierarchyComponent } from './checkbox-hierarchy.component';
import CheckboxDocs from './checkbox-hierarchy.docs.mdx';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoriesCommonModule } from 'stories/stories-common.module';

export default {
  title: 'Components/Checkbox',
  component: CheckboxHierarchyComponent,
  argTypes: {
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    task: {
      table: {
        disable: true,
      },
    },
    allComplete: {
      table: {
        disable: true,
      },
    },
    updateAllComplete: {
      table: {
        disable: true,
      },
    },
    someComplete: {
      table: {
        disable: true,
      },
    },
    setAll: {
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
        CommonModule,
        MatCheckboxModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
      ],
    }),
  ],
} as unknown as Meta<CheckboxHierarchyComponent>;

const hierarchyTemplate: Story<CheckboxHierarchyComponent> = (args: CheckboxHierarchyComponent) => ({
  component: CheckboxHierarchyComponent,
  props: {
    ...args,
  },
});
export const hierarchy = hierarchyTemplate.bind({});
hierarchy.args = {};
hierarchy.storyName = 'Hierarchy';
