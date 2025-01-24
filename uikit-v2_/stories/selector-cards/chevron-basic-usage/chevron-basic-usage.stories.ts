import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Uk2ServicesModule } from '@axos/uikit-v2-lib';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { ChevronBasicUsageComponent } from './chevron-basic-usage.component';
import chevronDocumentation from './chevron-basic-usage.docs.mdx';
import { HttpClientModule } from '@angular/common/http';
import { StoriesCommonModule } from 'stories/stories-common.module';

export default {
  title: 'Components/Selector Cards/Single Option',
  component: ChevronBasicUsageComponent,
  argTypes: {
    uk2IsLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state.',
      table: { category: 'States' },
    },
    uk2IsRadio: {
      name: 'Is Radio',
      description: 'Toggle to switch selector icon from radio button to chevron',
      table: { category: 'States' },
    },
    isDisabled: {
      name: 'Is Disabled',
      description: 'Toggle to disabled state when this is true.',
      table: { category: 'States' },
    },
    headerText: {
      name: 'Header text',
      description: 'Customize the header text for the selector cards.',
      table: { category: 'Labels' },
    },
    bodyText: {
      name: 'Body text',
      description: 'Customize the body text for the selector cards.',
      table: { category: 'Labels' },
    },
    svgIconName: {
      name: 'Icon name',
      description: 'Icon name from Uk2 Icon library.',
      control: 'text',
      table: { category: 'Icon' },
    },
    svgIconTier: {
      name: 'Icon tier',
      description: 'Icon tier size.',
      options: {
        'Is Tier 1 icon (24px x 24px)': '1',
        'Is Tier 2 icon (32px x 32px)': '2',
        'Is Tier 3 icon (40px x 40px)': '3',
      },
      control: 'radio',
      table: { category: 'Icon' },
    },
    showIcon: {
      name: 'Show Left Icon',
      description: 'Show/Hide left Icon',
      table: { category: 'Icon' },
    },
  },
  parameters: {
    docs: {
      page: chevronDocumentation,
    },
    controls: { exclude: ['ngOnChange', 'ngOnInit'] },
  },
  decorators: [
    moduleMetadata({
      imports: [
        StoriesCommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        Uk2ServicesModule,
        HttpClientModule,
        MatCheckboxModule,
      ],
    }),
  ],
} as unknown as Meta<ChevronBasicUsageComponent>;

const basicUsageTemplate: Story<ChevronBasicUsageComponent> = (args: ChevronBasicUsageComponent) => ({
  component: ChevronBasicUsageComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {};
