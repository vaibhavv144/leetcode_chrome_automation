const puppeteer = require("puppeteer");
let page;

const browserOpenPromise = puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args:["--start-maximized"] });

const pageArrayOpenPromise = browserOpenPromise
    .then(function (browser) {
        // currently opened tabs
        return browser.pages();
    })
    .then(function (browserPages) {
        page = browserPages[0];
        let gotoPromise = page.goto("https://google.com");
        return gotoPromise;
    })
    .then(function () {
        //waiting for element to appear on page
        let elementWaitPromise = page.waitForSelector("textarea[name='q']", { visible: true });
        return elementWaitPromise;
    })
    .then(function () {
        // console.log("Page is opened");
        //type any element on the page
        let keysWillSendPromise = page.type("textarea[name='q']", "leetcode");
        return keysWillSendPromise;
    })
    .then(function () {
        //page.keybrd is use to type
        let enterWillBePressed = page.keyboard.press("Enter");
        return enterWillBePressed;
    })
    .then(function () {
      let elementWaitPromise=  page.waitForSelector("h3.LC20lb.MBeuO.DKV0Md",{visible:true});
        return elementWaitPromise;

    }).then(function(){
        let keysWillSendPromise=page.click("h3.LC20lb.MBeuO.DKV0Md");
        return keysWillSendPromise;
     }).then(function () {
        let elementWaitPromiseonLeetcodepage=  page.waitForSelector("a[href='/accounts/login/']", { visible: true });
        return elementWaitPromiseonLeetcodepage;
     }).then(function(){
        let keysWillSendPromiseon_leetcodePage=page.click("a[href='/accounts/login/'] span");
        return keysWillSendPromiseon_leetcodePage;
     })
    .catch(function (err) {
        console.log(err);
    });
    