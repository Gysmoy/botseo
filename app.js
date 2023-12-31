const puppeteer = require('puppeteer');

const init = async (timeout) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            // headless: false,
        });
        const page = await browser.newPage();
        await page.goto('https://www.google.com');
        await page.type('textarea[name="q"]', 'sode.me');
        await page.keyboard.press('Enter');
        await page.waitForNavigation();
        await Promise.all([
            page.click('[data-async-context^="query"] a'),
            page.waitForNavigation(),
            page.waitForResponse(q =>
                q.url().includes('sode.me')
                && q.status() === 200
            )
        ])
        await browser.close();
        console.log(`--> Searching sode.me\n--> Done\nNext search in ${timeout}ms`)
    } catch (error) {
        console.log('Error: ', error.message);
    }
    
}

(async () => {
    let timeout = Math.floor(Math.random() * 10000) + 1000;
    setInterval(async () => {
        timeout = Math.floor(Math.random() * 10000) + 1000;
        await init(timeout);
    }, timeout);
})();