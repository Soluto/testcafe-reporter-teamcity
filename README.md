# testcafe-reporter-teamcity
[![Build Status](https://travis-ci.org/Soluto/testcafe-reporter-teamcity.svg)](https://travis-ci.org/Soluto/testcafe-reporter-teamcity) 
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This is the **teamcity** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="http://i.imgur.com/7ozfb4Q.png" alt="preview" border="border:2px solid black;"/>
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
