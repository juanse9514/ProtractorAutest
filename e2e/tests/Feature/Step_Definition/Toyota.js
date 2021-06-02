const { Given, When, Then} = require('cucumber');
var utils = require("../../Utils/Helpers.js");
const expect = require('chai').expect;
const toyotaHybrid = require('./toyota/toyotaHybridView')
const sleep = 5000;


Given('open web page {string}',{timeout: 40 * 1000}, async function (WebPage) {
    
    browser.ignoreSynchronization = true; 

    await browser.driver.get(WebPage);

    await browser.sleep(2000);
});

When('click in the carousel button {string}',{timeout: 20 * 1000}, async (num) => {
    
    const buttom = await utils.find('id','slick-slide-control0'+(num-1))

    await utils.click(buttom)


    
});


When('click in the carousel image {string}',{timeout: 25 * 1000}, async function (num) {
    const image = await utils.find('css','div:nth-of-type('+(num)+') .slide-link');
    await utils.click(image)
    await browser.sleep(sleep);
});

Then('get the text',{timeout: 20 * 1000}, async function () {

    var text = await toyotaHybrid.getRequieredText()
    browser.actions().mouseMove(text).click().perform();
    await browser.sleep(sleep);
    console.log(await text.getText());
});
