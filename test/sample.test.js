const puppeteer = require('puppeteer');

test('First Test', async () =>{
    let browser = await puppeteer.launch({headless: true});
    let page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('http://localhost:3000');

    await page.waitForSelector(".App-logo");
    const html= await page.$eval('.App-logo', element => element.getAttribute("alt"));
    expect(html).toBe("logo");
    browser.close();

},60000);

