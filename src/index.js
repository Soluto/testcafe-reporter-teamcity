export default function () {
    return {
        noColors: true,

        reportTaskStart (startTime, userAgents, testCount) {
            // console.log('\nreportTaskStart\n', startTime, userAgents, testCount);
        },

        reportFixtureStart (name) {
            console.log('##teamcity[testSuiteStarted name=\'' + escape(name) + '\']');
        },

        reportTestDone (name, testRunInfo) {
            if (testRunInfo.skipped) {
                console.log('##teamcity[testIgnored name=\'' + escape(name) + '\' message=\'skipped\']');
                return;
            }
            if (testRunInfo.errs && testRunInfo.errs.length > 0) {
                console.log('##teamcity[testFailed name=\'' + escape(name) +
                    '\' message=\'' + 'Test Failed' +
                    '\' captureStandardOutput=\'true\' ' +
                    'details=\'' + escape(this._renderErrors(testRunInfo.errs)) + '\']');
                return;

            }
            console.log('##teamcity[testFinished name=\'' + escape(name) + '\' duration=\'' + testRunInfo.durationMs + '\']');
        },

        reportTaskDone (endTime, passed, warnings) {
            // console.log('\nreportTaskDone\n', endTime, passed, warnings);
        },

        _renderErrors (errs) {
            let errors = '';
            errs.forEach((err) => {
                errors += '\n' + this.formatError(err, '') + '\n\n';
            });
            return errors;
        },
    };
}

function escape (str) {
    if (!str) return '';
    return str
        .toString()
        .replace(/\x1B.*?m/g, '')
        .replace(/\|/g, '||')
        .replace(/\n/g, '|n')
        .replace(/\r/g, '|r')
        .replace(/\[/g, '|[')
        .replace(/\]/g, '|]')
        .replace(/\u0085/g, '|x')
        .replace(/\u2028/g, '|l')
        .replace(/\u2029/g, '|p')
        .replace(/'/g, '|\'');
}
