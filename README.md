# testcafe-reporter-teamcity
[![Build Status](https://travis-ci.org/soluto/testcafe-reporter-teamcity.svg)](https://travis-ci.org/soluto/testcafe-reporter-teamcity)

This is the **teamcity** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/soluto/testcafe-reporter-teamcity/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-teamcity
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter teamcity
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('teamcity') // <-
    .run();
```

## Author
Soluto (https://github.com/soluto)
