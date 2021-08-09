const { Given, When, Then} = require('cucumber');
var utils = require("../../Utils/Helpers.js");
const expect = require('chai').expect;
const fb = require('./toyota/toyotaHybridView')
const sleep = 5000;

When('click in the button consultar mi priorizacion',{timeout: 20 * 1000}, async () => {
    
    const buttom = await utils.find('css','.btn-primary')

    await utils.click(buttom)

    await browser.sleep(6000);

});


When('click in the acepto button',{timeout: 20 * 1000}, async () => {
    
    const buttom = await utils.find('id','btnAceptarModal')

    await utils.click(buttom)

    await browser.sleep(2000);

});

When('type the identification {string}',{timeout: 20 * 1000}, async (number) => {

    await utils.send('id','numeroIdentificacion',number)


});

When('type the confirmation identification {string}',{timeout: 20 * 1000}, async (number) => {

    await utils.send('id','numeroIdentificacionConfirmacion',number)

});

When('click in calendar',{timeout: 20 * 1000}, async () => {

    const buttom = await utils.find('css','#dpfechaExpDocumento > div')

    await utils.click(buttom)

    await browser.sleep(2000);

});

When('click in day into calendar',{timeout: 20 * 1000}, async () => {

    const buttom = await utils.find('xpath','/html/body/div[3]/div[1]/table/tbody/tr[3]/td[6]')

    await utils.click(buttom)

    await browser.sleep(2000);

});

When('Submit form',{timeout: 20 * 1000}, async () => {

    const buttom = await utils.find('id','btnIngresar')

    await utils.click(buttom)

    await browser.sleep(2000);

});

Then('get error on tipo de documento equal to {string}',{timeout: 20 * 1000}, async function (error) {

    var text = await element(by.css('#tipoIdentificacion-error'))
    expect(await text.getText()).to.equal(error);
});



