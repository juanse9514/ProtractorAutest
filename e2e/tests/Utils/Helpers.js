var until = protractor.ExpectedConditions;
const sleep = 100000;
const expect = require('chai').expect;
const EC = protractor.ExpectedConditions;

//recibe element.all y devuelve el numero de elementos presentes 
// const tabledata = element.all(by.css(".table thead"));
// const fields = tabledata.all(by.tagName("th")); 
// const getLength = await utils.length(fields);
module.exports.length = async function length(element) {

    var size;
    try{
        await element.count().then(function(number){
        
            size=number;
        });

        return size;
    }catch (error) {

        expect(false,"el elemento no puede ser interactuado para obtener su tamaño"+ error).to.be.true;

        //console.error("No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string );
    }
};

//recibe contenido de tabla de la siguiente forma:
// const tabledata = element.all(by.css(".table tbody"));
// const fieldss = tabledata.all(by.tagName("tr"));
// const fields = fieldss.all(by.tagName("td"));
// const contentPageOne = await utils.getTableContent(fields);
// devuelve matriz filas x columnas
module.exports.getTableContent = async function getTableContent(table) {

    var line = [];
    var matrix= [];
    try{
        await table.each(async function(element){
            
            await element.getText().then(function (text) {

                if(text==""){

                    matrix.push(line);

                    line =[];

                }else{

                    line.push(text);

                }

                
            });

        });
        return matrix;
    }catch (error) {

        expect(false,"el elemento no puede ser interactuado"+ error).to.be.true;
    }

    // matrix.forEach(function(elemento) {

    //     console.log(elemento);

    // });

    

}

//recibe n elementos y los guarda en una lista
// const tabledata = element.all(by.css(".table thead"));
// const fields = tabledata.all(by.tagName("th")); 
// const getLength = await utils.length(fields);
// const getHeaders = await utils.getTexts(fields);
// devuelve lista con los elementos string
module.exports.getTexts = async function getTexts(fields) {

    var heads = [];
    
    try{
        await fields.each(async function(element){
            
            await element.getText().then(function (text) {
                console.log(text);
                heads.push(text)

            });

        });

        return heads;
    }catch (error) {

        expect(false,"el elemento no puede ser interactuado"+ error).to.be.true;

        //console.error("No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string );
    }

}

//recibe un element y le hace click
//en caso de obtener un error, envia la tecla enter
module.exports.click = async function click(element){
    
    try{

        browser.actions().mouseMove(element).click().perform();

        
    }catch(error){

        try {

            await element.sendKeys(protractor.Key.ENTER);
            
        } catch (error2) {

            expect(true,"No Se hace enter error: \n"+error2+" error2: "+error).to.equal(false);
            
        }

        expect(true,"No Se hace enter error: \n"+error).to.equal(false);

    }

}


module.exports.find = async function find(locator, string) {
    var elem;
    console.log("encontrando elemento buscado por: "+locator+" con el valor de: "+ string );
    switch(locator) {
        case "css":
            try {

                elem = await element(by.css(string));

                await browser.wait(until.visibilityOf(elem), sleep,'el elemento '+string +' se ha demorado mas de 10 segundos para aparecer en el DOM');
            
                return await browser.driver.findElement(By.css(string));
            } catch (error) {

                console.log(error);

                expect(false,"No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string+ " Error: \n"+error).to.be.true;

                //console.error("No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string );
              }

        case "id":

            try{

                elem = await element(by.id(string));

                await browser.wait(until.visibilityOf(elem), sleep,'el elemento '+string +' se ha demorado mas de 10 segundos para aparecer en el DOM');

                return await browser.driver.findElement(By.id(string));
            } catch (error) {

                expect(false,"No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string+ " Error: \n"+error).to.be.true;

                //console.error("No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string );
              }
            
        case "xpath":

            try{

                elem = await element(By.xpath(string));

                await browser.wait(until.visibilityOf(elem), sleep, 'el elemento ' + string + ' se ha demorado mas de 10 segundos para aparecer en el DOM');

                return await browser.driver.findElement(By.xpath(string));
            } catch (error) {

                expect(false,"No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string+ " Error: \n"+error).to.be.true;

                //console.error("No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string );
              }
        case "text":

            try{

                elem = await element(By.partialLinkText(string));

                await browser.wait(until.visibilityOf(elem), sleep, 'el elemento ' + string + ' se ha demorado mas de 10 segundos para aparecer en el DOM');

                return await browser.driver.findElement(By.linkText(string));
            }catch (error) {

                expect(false,"No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string+ " Error: "+error).to.be.true;

                //console.error("No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string );

            }
            break;
    }
}


//recibe la url que debería redireccionar el browser
//await utils.expectUrl(url);
module.exports.expectUrl = async function expectUrl(url) {

    await browser.wait(EC.urlContains(url), sleep).then(function(result) {

        expect(result).to.equal(true);
    });
    //console.log(browser.wait(await urlChanged(url), sleep));

}

//recibe el locator ("xpath","css","id") mas la cadena de texto y el valor a escribir en el input
//revisa que se haya escrito en el input
//await utils.send("id","firstUserNameForm",nombre1);
module.exports.send = async function send(locator,string,value) {
    try {
        const input = await this.find(locator,string);

        await input.sendKeys(value);
    
        console.log(await input.getAttribute("value"));
    
        expect(await input.getAttribute("value"),"No se ingresó: "+ value).to.contain(value);
    } catch (error) {

        expect(false,"No Se puede enviar lo solicitado: "+locator+" con el valor de: "+ string+ +value+" Error: \n"+error).to.be.true;
        
    }



}

//recibe el locator y la cadena
//encuentra el elemento y selecciona la primera opcion presionando la flecha hacia abajo
//posteriormente pulsa la tecla enter
//verifica que se
module.exports.selectOption = async function selectOption(locator,string) {

    const input = await this.find(locator,string);

    await input.sendKeys(protractor.Key.ARROW_DOWN);

    const option = await this.find("css","li[role='option']");

    await option.sendKeys(protractor.Key.ENTER);

    console.log("valor seleccionado: "+await input.getText());

    expect(await input.getText(),"No se seleccionó nada ").to.not.equal("");

    await browser.sleep(500);

}

module.exports.finds = async function finds(locator, string, index) {
    console.log("encontrando elemento buscado por: "+locator+" con el valor de: "+ string );
    switch(locator) {
        case "css":
            try {


                const elem = await element(by.css(string));

                await browser.wait(until.visibilityOf(elem), sleep,'el elemento ' + string + ' se ha demorado mas de 10 segundos para aparecer en el DOM');
        
                return await element.all(By.css(string)).get(index);

              } catch (error) {

                expect(false,"No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string+ " Error: \n"+error).to.be.true;

                //console.error("No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string );
              }

            break;

        case "id":
            try{

                const elem = await element(by.id(string));

                await browser.wait(await until.visibilityOf(elem), sleep,'el elemento ' + string + ' se ha demorado mas de 10 segundos para aparecer en el DOM');

                return await element.all(By.id(string)).get(index);
            } catch (error) {

                expect(false,"No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string+ " Error: \n"+error).to.be.true;

                //console.error("No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string );
            }
            break;
        case "xpath":

            try{
                const elem = await element(by.xpath(string));

                await browser.wait(await until.visibilityOf(elem), sleep,'el elemento '+string +' se ha demorado mas de 10 segundos para aparecer en el DOM');

                return await element.all(By.xpath(string)).get(index);
            } catch (error) {

                expect(false,"No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string + " Error: \n"+error).to.be.true;

                //console.error("No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string );
            }
            break;
    
    }
}

module.exports.findall = async function findall(locator, string) {
    console.log("encontrando elementos buscados por: "+locator+" con el valor de: "+ string );
    switch(locator) {
        case "css":
            try {

                return element.all(By.css(string));

              } catch (error) {

                expect(false,"No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string+ " Error: \n"+error).to.be.true;

                //console.error("No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string );
              }

            break;

        case "id":
            try{

                return element.all(By.id(string));
            } catch (error) {

                expect(false,"No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string+ " Error: \n"+error).to.be.true;

                //console.error("No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string );
            }
            break;

        case "xpath":

            try{

                return element.all(By.xpath(string));
            } catch (error) {

                expect(false,"No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string + " Error: \n"+error).to.be.true;

                //console.error("No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string );
            }
            break;
    
    }
}


//recibe los id's en un array, recibe strings en array
//encuentra el elemento con el id y envía al input el string
//posteriormente pulsa la tecla enter
//verifica que se
module.exports.sendForms = async function sendForms(strings,ids,locator) {

    if(locator == null){
        locator="id"
    }

    try {

        var i;
        for (i = 0; i < ids.length; i++) {
            await this.send(locator,ids[i],strings[i]);
        }
        
    } catch (error) {

        expect(false,"No Se encuentra elemento buscado por: "+ids+" con el valor de: "+ strings + " Error: \n"+error).to.be.true;
        
    }

}


//recibe un locator (id,xpath...etc)
//encuentra el elemento con el id y envía un click
module.exports.findClick = async function findClick(locator,string) {

    try {

        await this.click(await this.find(locator,string));
        
    } catch (error) {

        expect(false,"No Se encuentra elemento buscado por: "+locator+" con el valor de: "+ string + " Error: \n"+error).to.be.true;
        
    }

}
//recibe un locator (id,xpath...etc)
//encuentra el elemento con el id y envía un click
module.exports.selectOptionList = async function selectOptionList(locator,string,text) {

    try {

        await browser.sleep(3000);
        
        const desplegable = await this.find(locator,string);
        
        await this.click(desplegable);

        await browser.sleep(2000);

        elem = element(by.cssContainingText("li[role='option']",text));

        await browser.wait(until.visibilityOf(elem), sleep,'el elemento '+text +' se ha demorado mas de 10 segundos para aparecer en el DOM');
    
        var option = element(by.cssContainingText("li[role='option']",text));
    
        await this.click(option);

    } catch (error) {

        expect(false,"No Se encuentra elemento en selectOptionList buscado por: "+text+ " Error: \n"+error).to.be.true;
        
    }

}