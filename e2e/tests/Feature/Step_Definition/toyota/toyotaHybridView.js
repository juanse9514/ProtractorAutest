
const toyotaHybrid = {
    carouselButtom : "body > div.wp-block-group > div > div:nth-child(3) > div:nth-child(2) > div.wp-block-columns > div:nth-child(1) > p",
}

module.exports.getRequieredText= async function getRequieredText(){
    return element(by.css(toyotaHybrid.carouselButtom));
}