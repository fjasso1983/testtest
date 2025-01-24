import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { Uk2ProductTileComponentPositionEnum, Uk2TileHeaderTextBehaviorEnum } from '@axos/uikit-v2-lib';

import ProductTileDoc from './product-tile-basic-usage.docs.mdx';
import { ProductTileBasicUsageComponent } from './product-tile-basic-usage.component';
import { ProductTileBasicUsageModule } from './product-tile-basic-usage.module';

export default {
  title: 'Components/Product Tile',
  component: ProductTileBasicUsageComponent,
  argTypes: {
    headerText: {
      name: 'Header text',
      description: 'Customize the text for header.',
      table: { category: 'Header labels' },
    },
    subLineText: {
      name: 'Sub line header text content',
      description: 'Customize the text content inside header sub line.',
      table: { category: 'Header labels' },
    },
    tooltipText: {
      name: 'Tooltip header text content',
      description: 'Customize the text content inside tooltip.',
      table: { category: 'Header labels' },
    },
    isLoading: {
      name: 'Is Loading',
      description: 'Toggle skeleton state',
      table: { category: 'Tile states' },
    },
    tileHeaderComponentPosition: {
      name: 'Tab bar position',
      description: 'Control the position of the Tab bar component in header',
      table: { category: 'Header states' },
    },
    isHeaderAnchor: {
      name: 'Is header link',
      description: 'Toggle link on header to trigger actions on click',
      table: { category: 'Header states' },
    },
    tileBorderSquare: {
      name: 'Tile border square',
      description: 'Toggle square/rounded border for tile',
      table: { category: 'Tile states' },
    },
    fixedHeight: {
      name: 'Has fixed height',
      description: 'Toggle fixed height for tile',
      table: { category: 'Body' },
    },
    textBehavior: {
      name: 'Text behavior',
      description: 'Toggle text behavior of tile header from "truncate" to "wrap"',
      table: { category: 'Header states' },
    },
    showTooltip: {
      name: 'Show header tooltip',
      description: 'Toggle visibility of tooltip in header',
      table: { category: 'Header states' },
    },
    showHeaderTabBar: {
      name: 'Show header tab bar',
      description: 'Toggle visibility of tab bar in header',
      table: { category: 'Header states' },
    },
    showTileActions: {
      name: 'Show header actions',
      description: 'Toggle visibility of actions in header',
      table: { category: 'Header states' },
    },
    isTileFullWidth: {
      name: 'Is tile full width',
      description: 'Toggle full width for tile',
      table: { category: 'Tile states' },
    },
    tileActionsType: {
      name: 'Tile header actions variant',
      description: 'Change between predefined header actions',
      table: { category: 'Header states' },
    },
    showFooter: {
      name: 'Show footer',
      description: 'Toggle visibility of footer',
      table: { category: 'Footer' },
    },
    showHeaderDivider: {
      name: 'Show Header Divider',
      description: 'Toggle visibility of header divider',
      table: { category: 'Header states' },
    },
    showFooterDivider: {
      name: 'Show Footer Divider',
      description: 'Toggle visibility of footer divider',
      table: { category: 'Footer' },
    },
    clickEvent: {
      action: 'clickEvent',
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      page: ProductTileDoc,
    },
    controls: {
      exclude: [
        'handleLoadingClick',
        'toggleComponentPosition',
        'smallSize',
        'triggerScroll',
        'ngOnChanges',
        'buttonSmallSize',
        'tabSmallSize',
        'multipleType',
        'filterIcon',
        'menuItems',
        'listItems',
        'alertType',
        'alertPersistent',
        'singleType',
        'menuSingleItems',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ProductTileBasicUsageModule],
    }),
  ],
} as Meta<ProductTileBasicUsageComponent>;

const basicUsageTemplate: Story<ProductTileBasicUsageComponent> = (args: ProductTileBasicUsageComponent) => ({
  component: ProductTileBasicUsageComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  tooltipText: 'Quae minus sapiente possimus officia iure!',
  subLineText: 'Amet consecutar etum - 1234',
  isLoading: false,
  tileHeaderComponentPosition: Uk2ProductTileComponentPositionEnum.bottom,
  headerText: 'Lorem Ipsum',
  isHeaderAnchor: false,
  tileBorderSquare: false,
  fixedHeight: false,
  textBehavior: Uk2TileHeaderTextBehaviorEnum.truncate,
  showHeaderTabBar: true,
  isTileFullWidth: false,
  showFooter: true,
  showHeaderDivider: true,
  showFooterDivider: true
};
