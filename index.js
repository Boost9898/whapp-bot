const puppeteer = require('puppeteer');

// full async code, always write inside the try
(async function main() {
  try {

    // create headless browser and open a new page
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // set user agent to trick whatsapp (let it think we're a browser)
    await page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    );

    // browse to whatsapp > wait for selector to check if the page is loaded > wait 10 seconds
    await page.goto('https://web.whatsapp.com/');
    await page.waitForSelector('._1ADa8');
    await delay(15_000);
    
    // select contact to message > select input field
    const contactName = 'enterNameHere';
    await page.click(`span[title='${contactName}']`);
    await page.waitForSelector('.p3_M1')

    // find message bar and focus on (data-tab could also be 1 if thsi fails)
    // const editor = await page.$("div[class='_1UWac _1LbR4']");
    const editor = await page.$(".p3_M1");
    await editor.focus();

    // set amount of messages it's going to send
    const amountOfMessages = 10;

    // create loop based on amountOfMessages
    for (let i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message = `Spam!`
        document.execCommand('insertText', false, message);
      });
      await page.click("span[data-testid='send']")
      await delay(200);
    }


  } catch (error) {
    console.log(error);
  }
}())


function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}