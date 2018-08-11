const By = require("selenium-webdriver").By;

module.exports = (data, store, callback) => {
    store.webDriver.findElement(By.id('join_code'))
        .sendKeys("88008");

    store.webDriver.findElement(By.id('join_send_code'))
        .click();

    setTimeout(() => {
        store.webDriver.findElement(By.className('join_skip_link'))
            .click();
    }, 3000);
};