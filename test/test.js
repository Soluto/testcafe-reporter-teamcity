var assert           = require('assert');
var normalizeNewline = require('normalize-newline');
var read             = require('read-file-relative').readSync;
var createReport     = require('./utils/create-report');

it('Should produce report without colors', function () {
    var report   = createReport(false);
    var expected = read('./data/report-without-colors');
    
    report   = normalizeNewline(report).trim();
    expected = normalizeNewline(expected).trim();
    assert.strictEqual(report.replace(/Thu.*/g, 'some-time'), expected);
});

it('Should produce `testFinished` message for failed test', function () {
    var finishedMessage = "##teamcity[testFinished name='Second test in first fixture' duration='74000']";
    var report          = createReport(false);
    report = normalizeNewline(report).trim();
    var containsFinishedMessage = report.indexOf(finishedMessage) !== -1;
    assert.ok(containsFinishedMessage);
});
