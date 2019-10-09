const puppeteer = require('puppeteer');

const scrape = async (baseUrl, max_depth, max_pages) => {
    // set initial state of scraping
    const visited = [baseUrl];
    const q = [{ url: visited[0], path: '', depth: 0 }]
    const scrapedData = [];

    // loop over queue of pages
    while (q.length > 0) {
        // deconstruct parameters from the queue.
        let { url, path, depth } = q[0];

        q.shift();

        // check we are not passing given limiters
        if (depth < max_depth && scrapedData.length < max_pages) {

            try {
                // run browser proccess
                const browser = await puppeteer.launch();
                const [page] = await browser.pages();
                await page.goto(url + path, { waitUntil: 'load', timeout: 0 });
                // get all href's from page
                const links = await page.evaluate(
                    () => Array.from(
                        document.querySelectorAll('a[href]'),
                        a => a.getAttribute('href')
                    )
                );
                const title = await page.title();
                // construct new object from page props
                scrapedData.push({
                    title: title,
                    depth: depth,
                    url: url,
                    links: [...new Set(links)]
                });
                // close current browser proccess after data was gathered
                await browser.close();

                for (let link of links) {
                    // push to queue only if its not there already
                    if (!visited.includes(link)) {
                        visited.unshift(link)
                        // check if the link is a relative path or a full link
                        if (link.startsWith('http')) {
                            q.push({ url: link, path: '', depth: depth + 1 });
                        } else {
                            // if it has no http, connect the relative path to base url
                            q.push({ url: url, path: link, depth: depth + 1 });
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
