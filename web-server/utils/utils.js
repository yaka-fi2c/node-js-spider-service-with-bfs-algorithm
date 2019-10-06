const puppeteer = require('puppeteer'),
    cheerio = require('cheerio'),
    LinkNode = require('./node-link');

let scrapedData = [];


const urlData = (html, url) => {

    let links = [];
    // set up cheerio with given html result
    const $ = cheerio.load(html);

    // handle resulted html links
    $('a').each((ind, val) => {
        let link = $(val).attr('href');
        // only push link if the link doesnt exist already
        if (!links.includes(link)) {
            links.push(link);
        }
    });

    // construct data from base url
    let baseUrlData = new LinkNode(
        $('title').text(),
        0,
        url,
        links
    );
    return baseUrlData;
};

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
            return urlData(html, url);
        })
        .then((result) => {
            bfs(result.links, 2, 2)    
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err)
        });
};

const bfs = (linkNode, max_depth, max_pages) => {

    if (!linkNode.length) {
        return;
    }

    let queue = [linkNode[0]];
    linkNode.shift();


    let depth = 0;


    while (queue.length !== 0) {
        for (let i = 0; i < max_pages; i++) {
            if (depth < max_depth) {
                
            }
            depth++;
        }
        return scrapedData;
    };
};
module.exports = bfs;


module.exports = scrapper;