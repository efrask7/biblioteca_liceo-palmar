import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: './src/static/img/logo_win',
    extraResource: [
      "./src/static/img/logo_win.ico",
      "./src/static/img/logo.png",
    ],
    executableName: 'biblioteca_liceo-palmar'
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({
    authors: 'efrask7',
    description: 'Biblioteca Liceo Palmar',
    setupIcon: './src/static/img/logo_win.ico',
    iconUrl: 'https://efrask7.github.io/biblioteca_liceo-palmar/logo_win.ico'
  }),
  new MakerDeb({
    options: {
      maintainer: 'efrask7',
      homepage: 'https://github.com/efrask7/biblioteca_liceo-palmar',
      categories: ['Education', 'Office'],
      description: 'Biblioteca de liceo Palmar',
      icon: './src/static/img/logo.png'
    }
  })],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "efrask7",
          name: "biblioteca_liceo-palmar"
        },
        authToken: process.env.GITHUB_TOKEN
      }
    }
  ]
};

export default config;
