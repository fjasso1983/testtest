import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { FileViewerBasicUsageComponent } from './file-viewer-basic-usage.component';
import FileViewerDocumentation from './file-viewer-basic-usage.docs.mdx';
import { FileViewerModule } from './file-viewer-basic-usage.module';

export default {
  title: 'Components/File Viewer',
  component: FileViewerBasicUsageComponent,
  argTypes: {
    fileViewerWidth: {
      name: 'File viewer width',
      description: "Width of the file viewer, representing a valid CSS unit (e.g. '80%' or '80vh')",
      table: { category: 'Dimensions' },
    },
    fileViewerHeight: {
      name: 'File viewer height',
      description: "Height of the file viewer, representing a valid CSS unit (e.g. '80%' or '80vh')",
      table: { category: 'Dimensions' },
    },
    fileViewerHideBorder: {
      name: 'Is Border Visible',
      description:
        'Toggles border visibility to enable the file viewer to be embedded into other components like modals',
      table: { category: 'Border' },
    },
    onClose: {
      action: 'onClose',
      table: { disable: true },
    },
    onExpand: {
      action: 'onExpand',
      table: { disable: true },
    },
    onOpenFullscreen: {
      action: 'onOpenFullscreen',
      table: { disable: true },
    },
    onFlyoutOptionClick: {
      action: 'onFlyoutOptionClick',
      table: { disable: true },
    },
  },
  parameters: {
    actions: {
      handles: ['onClose', 'onExpand', 'onOpenFullscreen', 'onFlyoutOptionClick'],
    },
    docs: {
      page: FileViewerDocumentation,
    },
    controls: {
      exclude: [
        'fileViewerHeight',
        'buttonSmallSize',
        'buttonVariant',
        'svgClose',
        'svgWindow',
        'svgZoomLess',
        'svgZoomMore',
        'svgEllipses',
        'svgCollapse',
        'svgExpand',
        'flyoutMenu',
        'firstItem',
        'secondItem',
        'thirdItem',
        'pdfSrc',
        'ngDoCheck',
        'callBackPDFLoaded',
        'setZoomValue',
        'onBlur',
        'updatePage',
        'keydownPage',
        'onFocus',
        'updateZoom',
        'setCursorPosition',
        'pdfSrc',
        'pdf',
        'pdfPage',
        'inputPage',
        'pdfName',
        'previousPdfPage',
        'pageInputChange',
        'positionLeft',
        'positionCenter',
        'positionRight',
        'buttonSmallSize',
        'buttonVariant',
        'zoom',
        'zoomValues',
        'expanded',
        'syncInputPdfPage',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FileViewerModule],
    }),
  ],
} as Meta<FileViewerBasicUsageComponent>;

const basicUsageTemplate: Story<FileViewerBasicUsageComponent> = (args: FileViewerBasicUsageComponent) => ({
  component: FileViewerBasicUsageComponent,
  props: {
    ...args,
  },
});
export const basicUsage = basicUsageTemplate.bind({});
basicUsage.args = {
  fileViewerWidth: '800px',
  fileViewerHeight: '400px',
  fileViewerHideBorder: false,
};
