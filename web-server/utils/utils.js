const puppeteer = require('puppeteer'),
    $ = require('cheerio');

const scrapper = (url, res) => {

    return puppeteer
        .launch()
        .then((browser) => {
            return browser.newPage();
        })
        .then((page) => {
            // set wait until and time out for not crashing when requests takes some time...
            return page.goto(url, { waitUntil: 'load', timeout: 0 }).then(() => {
                return page.content();
            })
        })
        .then((html) => {
            // handle result html
        })
        .catch((err) => {
            console.log(err)
        });
};

module.exports = scrapper;