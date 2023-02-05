const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  chromeWebSecurity: false,
  video: false, 
  screenshotOnRunFailure: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
      charts: true,
      reportPageTitle: 'My Test Suite',
      embeddedScreenshots: true,
  },
  e2e: {

    setupNodeEvents(on, config) {
  
      preprocessor.addCucumberPreprocessorPlugin(on, config);
      require('cypress-mochawesome-reporter/plugin')(on);
    
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })    
      );
    
      return config;
    },
    baseUrl: 'https://www.google.com',
    excludeSpecPattern: [
      '**/cucumber-tests/**/*[!*.feature]',
      '**/common/**',
      '**/assets/**',
      '**/utils/**',
      '*.md',
    ],
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: false,
  }

});
