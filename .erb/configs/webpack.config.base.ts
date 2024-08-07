/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';
import packageJson from '../../package.json';

const configuration: webpack.Configuration = {
  externals: [...Object.keys(externals || {})],

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        // exclude: /node_modules/,
        exclude: /node_modules|__mocks__/,
        use: {
          loader: 'ts-loader',
          options: {
            // Remove this line to enable type checking in webpack builds
            transpileOnly: true,
            compilerOptions: {
              module: 'esnext',
            },
          },
        },
      },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    // There is no need to add aliases here, the paths in tsconfig get mirrored
    plugins: [new TsconfigPathsPlugins()],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new webpack.DefinePlugin({
      'process.env.APP_NAME': JSON.stringify(packageJson.name),
      'process.env.APP_VERSION': JSON.stringify(packageJson.version),
      'process.env.APP_YEAR': JSON.stringify(packageJson.year),
      'process.env.APP_LICENSE': JSON.stringify(packageJson.license),
      'process.env.APP_LICENSE_URL': JSON.stringify(packageJson.licenseUrl),
      'process.env.APP_GITHUB': JSON.stringify(packageJson.github),
      'process.env.APP_DISCORD': JSON.stringify(packageJson.discord),
      'process.env.APP_PATREON': JSON.stringify(packageJson.patreon),
      'process.env.APP_HOMEPAGE': JSON.stringify(packageJson.homepage),
      'process.env.APP_AUTHOR_NAME': JSON.stringify(packageJson.author.name),
      'process.env.APP_AUTHOR_URL': JSON.stringify(packageJson.author.url)
    }),
  ],
};

export default configuration;
