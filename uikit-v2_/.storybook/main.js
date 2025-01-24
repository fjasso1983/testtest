module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-angular-router',
  ],
  framework: '@storybook/angular',
  staticDirs: [
    {
      from: '../dist/uikit-v2-lib/src/assets',
      to: 'uk2/assets',
    },
    {
      from: '../projects/uikit-v2-docs/src/assets/logos',
      to: 'static-branding-assets/logos',
    },
    {
      from: '../public/components',
      to: 'assets/uk2/components',
    },
  ],
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
