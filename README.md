# testcafe-reporter-allure-custom
[![Build Status](https://travis-ci.org/AlexGrisin/testcafe-reporter-allure-custom.svg)](https://travis-ci.org/AlexGrisin/testcafe-reporter-allure-custom)

This is the **allure-custom** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

This plugin extension was made because the original did not contain all the requirements for my project.
This package is meant for personal project use and that is why you will see some specific meta-data, which fits my case the best. But of course you are free to use it for whatever you want.


<p align="center">
    <img src="https://raw.github.com/AlexGrisin/testcafe-reporter-allure-custom/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-allure-custom
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter allure-custom
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('allure-custom') // <-
    .run();
```

## Author
Alexandr Grisin 
