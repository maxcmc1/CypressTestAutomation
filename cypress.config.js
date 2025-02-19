const { defineConfig } = require("cypress");
const browserify = require("@cypress/browserify-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require('cypress-sql-server');

async function setupNodeEvents(on, config){

  config.db= {
    userName: "xxxxx",
    password: "xxxxx",
    server: "xxxxx",
    options: {
        database: "xxxxx",
        encrypt: true,
        rowCollectionOnRequestCompletion: true
    }
}

  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);

  await addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
  // require('cypress-mochawesome-reporter/plugin')(on); 
}

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  reporter: 'cypress-mochawesome-reporter',
  env: {
    url: "https://rahulshettyacademy.com"
  },
  retries: {
    runMode: 1
  },
  projectId: "zg4n4r",
  e2e: {
    video: true,
    setupNodeEvents,
    specPattern: 'cypress/integration/examples/',
    //specPattern: 'cypress/integration/examples/BDD/*.feature'
  },
});
