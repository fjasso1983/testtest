import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { Uk2InputSizeEnum } from '@axos/uikit-v2-lib';

import { SearchInputBasicUsageComponent } from './search-input-basic-usage.component';
import basicUsageDocumentation from './search-input-basic-usage.docs.mdx';
import { SearchInputBasicUsageModule } from './search-input-basic-usage.module';

export default {
  title: 'Components/Search Input',
  component: SearchInputBasicUsageComponent,
  argTypes: {
    filterDelay: {
      name: 'Filter Delay',
      description: 'Delay in milliseconds before the filter is applied',
      table: { category: 'Inputs' },
    },
    optionsLimit: {
      name: 'Options Limit',
      description: 'Limit the number of options displayed',
      table: { category: 'Inputs' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle to switch from default state to skeleton state',
      table: { category: 'States' },
    },
    inputSize: {
      name: 'Input Size',
      description: 'Change the size of the input',
      table: { category: 'Inputs' },
    },
    minimumLengthForSearch: {
      name: 'Minimum Length For Search',
      description: 'Minimum length of input before search is triggered',
      table: { category: 'Inputs' },
    },
    customFormLabel: {
      name: 'Custom Form Label',
      description: 'Replaces label text in active state',
      table: { category: 'Label' },
    },
    formFieldLabel: {
      name: 'Form Field Label',
      description: 'Label for the form field',
      table: { category: 'Label' },
    },
    placeholderText: {
      name: 'Placeholder Text',
      description: 'Placeholder text for the input',
      table: { category: 'Label' },
    },
    toggleScroll: {
      name: 'Toggle Scroll',
      description: 'It will add more options to activate scroll',
      table: { category: 'Scenario' },
    },
  },
  parameters: {
    docs: {
      page: basicUsageDocumentation,
    },
    controls: {
      exclude: [
        'options',
        'optionSelect',
        'formControl',
        'cdr',
        'ngOnChanges',
        'uk2SearchMenuDirective',
        'updateOptions',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [SearchInputBasicUsageModule],
    }),
  ],
} as unknown as Meta<SearchInputBasicUsageComponent>;

const basicUsageTemplate: Story<SearchInputBasicUsageComponent> = (args: SearchInputBasicUsageComponent) => ({
  component: SearchInputBasicUsageComponent,
  props: {
    ...args,
  },
});

export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  filterDelay: 0,
  optionsLimit: 20,
  isLoading: false,
  inputSize: Uk2InputSizeEnum.large,
  minimumLengthForSearch: 0,
  customFormLabel: '',
  placeholderText: 'Lorem Ipsum',
  formFieldLabel: 'Search',
  toggleScroll: false,
};
