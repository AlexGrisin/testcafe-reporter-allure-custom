# testcafe-reporter-allure-custom
[![Build Status](https://travis-ci.org/AlexGrisin/testcafe-reporter-allure-custom.svg)](https://travis-ci.org/AlexGrisin/testcafe-reporter-allure-custom)

This is the **allure-custom** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

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
