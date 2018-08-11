const webdriver = require("selenium-webdriver"),
    By = require("selenium-webdriver").By,
    until = require("selenium-webdriver").until,
    chrome = require("selenium-webdriver/chrome"),
    proxy = require('selenium-webdriver/proxy'),
    chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const setDate = (selector, value, webDriver, callback) => {
    let selectorName;
    switch (selector) {
        case 1:
            selectorName = 'ij_bday';
            break;

        case 2:
            selectorName = 'ij_bmonth';
            break;

        case 3:
            selectorName = 'ij_byear';
            break;
    }

    webDriver.findElement(By.className(selectorName))
        .then((e) => {
            e.click();

            setTimeout(() => {
                webDriver.findElement(By.id('option_list_options_container_' + selector + "_" + (value + 1)))
                    .then((el) => {
                        el.click();
                        callback();
                    });
            }, 150);
        });
} ;

module.exports = (data, store, callback) => {
    store.webDriver = new webdriver
        .Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        //.setProxy(proxy.manual({https: data.proxy, http: data.proxy}))
        .forBrowser('chrome')
        .build();

    store.webDriver.manage().window().maximize();

    store.webDriver.manage().deleteAllCookies();

    //store.webDriver.ignoreSynchronization = true;

    store.webDriver.get("https://vk.com")
        .then(() => {
            store.webDriver.findElement(By.id('ij_first_name'))
                .sendKeys("Вася");

            store.webDriver.findElement(By.id('ij_last_name'))
                .sendKeys("Тестерович");


            setDate(1, 4, store.webDriver, () => {
                setDate(2, 1, store.webDriver, () => {
                    setDate(3, 6, store.webDriver, () => {
                        store.webDriver.findElement(By.id('ij_submit'))
                            .click();

                        setTimeout(() => {
                            store.webDriver.findElement(By.id('join_phone'))
                                .sendKeys("9505899955");


                            const actions = store.webDriver.actions({bridge: true});
                            store.webDriver.findElement(By.id("join_accept_terms_checkbox"))
                                .then((elem)=>{
                                    actions
                                        .move({
                                            duration: 5000,
                                            origin: elem,
                                            x: 10,
                                            y: 10,
                                        })
                                        .click()
                                        .perform()
                                        .then(() => {
                                            store.webDriver.findElement(By.id('join_send_phone'))
                                                .click()
                                                .then(() => {
                                                    callback();
                                                });
                                        });
                                });
                        }, 2000);
                    });
                });
            });

        });
};