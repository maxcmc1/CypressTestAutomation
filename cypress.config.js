const { defineConfig } = require("cypress");
const browserify = require("@cypress/browserify-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require('cypress-sql-server');
const excelToJson = require("convert-excel-to-json");
const fs = require('fs');
const ExcelJs = require('exceljs');
const { error } = require("console");

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

  on('task', {
    excelToJsonConverter(filePath){
      const result = excelToJson({
        source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
      });
      return result;
    }
  })

  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);

  await addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
  );

  on('task', {
    async writeExcelTest({searchText, replaceText, change, filePath}) {
        
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(filePath)
        const worksheet = workbook.getWorksheet('Sheet1');
        const output = await readExcel(worksheet, searchText);
        
        const cell = worksheet.getCell(output.row,output.column+change.colChange);
        cell.value = replaceText;
        return workbook.xlsx.writeFile(filePath).then(()=>{
          return true;
        }).catch((error)=>{
          return false;
        })
    }
  })

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
  // require('cypress-mochawesome-reporter/plugin')(on); 
}

async function readExcel(worksheet, searchText) {

  let output = {row:-1, column:-1};
  worksheet.eachRow((row, rowNumber) =>{
      row.eachCell((cell, colNumber)=>{
          if(cell.value === searchText){
              output.row=rowNumber;
              output.column=colNumber;
          }
      })
  })
  return output;
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
