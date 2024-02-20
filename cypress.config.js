const { defineConfig } = require("cypress");


module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    //reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
    charts: true,
    reportTitle: 'API Testing results'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'https://gorest.co.in/public/v2'
  },
  env: {
      APIKEY: 'baa58b24fdab40d39ee8d39d49075193a04eb513de5ba7619c2669da7d07b449',
    },
});
