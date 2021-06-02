const timeout = 20000;
var utils = require("../../Utils/Helpers.js");
const {Before, After, BeforeAll,AfterAll,Status} = require('cucumber');
var until = protractor.ExpectedConditions;
const sleep = 50000;



Before({timeout: 20 * 1000},async function () {
})

After({timeout: 20 * 1000},async function () {

})


AfterAll({timeout: 20 * 1000}, async () => {
});


BeforeAll({timeout: 20 * 1000}, async () => {
    
});