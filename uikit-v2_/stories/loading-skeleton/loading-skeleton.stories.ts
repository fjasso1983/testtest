import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import Documentation from './loading-skeleton.docs.mdx';
import { LoadingSkeletonComponent } from './loading-skeleton.component';
import { LoadingSkeletonModule } from './loading-skeleton.module';

export default {
  title: 'Shimmer Animation',
  component: LoadingSkeletonComponent,
  argTypes: {
    uk2LoadingHeight: {
      name: 'Height',
      description: 'Height of the element with loading animation is running',
      table: {
        category: 'Inputs',
      },
    },
    uk2LoadingWidth: {
      name: 'Width',
      description: 'Width of the element with loading animation is running',
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
        'classPrefixList',
        'uk2IsLoading',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [LoadingSkeletonModule],
    }),
  ],
} as unknown as Meta<LoadingSkeletonComponent>;

const loadingSkeletonTemplate: Story<LoadingSkeletonComponent> = (args: LoadingSkeletonComponent) => ({
  component: LoadingSkeletonComponent,
  props: {
    ...args,
  },
});

export const shimmerAnimation = loadingSkeletonTemplate.bind({});
shimmerAnimation.args = {};

