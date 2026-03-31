const { defineConfig } = require('cypress')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')
require('dotenv').config()

const webpackOptions = {
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: { ignoreDeprecations: '6.0', module: 'CommonJS' },
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
}

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: process.env.BASE_URL,
    specPattern: 'tests/**/*.{cy,spec}.ts',
    supportFile: 'cypress/support/e2e.js',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    env: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      reqresBaseUrl: process.env.REQRES_BASE_URL,
      reqresApiKey: process.env.REQRES_API_KEY,
      grepFilterSpecs: true,
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      on('file:preprocessor', webpackPreprocessor({ webpackOptions }))
      if (config.env.grep) {
        config.expose = config.expose || {}
        config.expose.grep = config.env.grep
      }
      require('@cypress/grep/plugin').plugin(config)
      return config
    },
  },
})
