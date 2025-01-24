import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { BreadCrumbsModule } from './breadcrumbs-basic-usage.module';
import { BreadcrumbsBasicUsageComponent } from './breadcrumbs-basic-usage.component';
import Documentation from './breadcrumbs-basic-usage.docs.mdx';

export default {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsBasicUsageComponent,
  argTypes: {
    uk2IsLoading: {
      name: 'Is Loading',
      description: 'Toggle skeleton view',
      table: {
        category: 'Inputs',
      },
    },
  },
  parameters: {
    docs: {
      page: Documentation,
    },
    controls: {
      exclude: [
        'ngOnInit',
        'ngOnChange',
        'updateItems',
        'ngAfterViewInit',
        'resetItems',
        'bindAnchorsClick',
        'items',
        'uk2ButtonSize',
        'ngOnChanges',
        'onItemSelected',
        'addItem',
        'counter',
        'items',
        'breadcrumbItems'
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [BreadCrumbsModule],
    }),
  ],
} as unknown as Meta<BreadcrumbsBasicUsageComponent>;

const basicUsageTemplate: Story<BreadcrumbsBasicUsageComponent> = (args: BreadcrumbsBasicUsageComponent) => {
  args.counter = 1;
  return {
    component: BreadcrumbsBasicUsageComponent,
    props: {
      ...args,
    },
  };
}

export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  uk2IsLoading: false
};
