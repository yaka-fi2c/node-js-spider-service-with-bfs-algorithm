const puppeteer = require('puppeteer'),
    NodeLink = require('./node-link');


const scrape = async (baseUrl, max_depth, max_pages) => {
    // set initial state of scraping
    let visited = [baseUrl];
    let q = [{ url: visited[0], path: '', depth: 0 }]
    let scrapedData = [];

    // loop over queue of pages
    while (q.length > 0) {
        let base = q[0].url;
        let path = q[0].path;
        let depth = q[0].depth;

        q.shift();

        // check we are not passing given limiters
        if (depth < max_depth && scrapedData.length < max_pages) {

            try {
                // run browser proccess
                const browser = await puppeteer.launch();
                const [page] = await browser.pages();
                await page.goto(base + path, { waitUntil: 'load', timeout: 0 });
                // get all href's from page
                const links = await page.evaluate(
                    () => Array.from(
                        document.querySelectorAll('a[href]'),
                        a => a.getAttribute('href')
                    )
                );
                const title = await page.title();
                // construct new object from page props
                scrapedData.push(new NodeLink(
                    title,
                    depth,
                    base,
                    links
                ));
                await browser.close();

                for (let link of links) {
                    // push to queue only if its not there already
                    if (!visited.includes(link)) {
                        visited.unshift(link)
                        // check if the link is a relative path or a full link
                        if (link.startsWith('http')) {
                            q.push({ url: link, path: '', depth: depth + 1 });
                        } else {
                            q.push({ url: base, path: link, depth: depth + 1 });
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            return scrapedData;
        }
    };
};

module.exports = scrape;
