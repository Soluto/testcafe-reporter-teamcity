export default function () {
    return {
        noColors: true,
        failed: 0,
        skipped: 0,
        lastSuiteName: null,

        reportTaskStart (startTime, userAgents, testCount) {
            this.write('Starting test run!')
                .newline()
                .setIndent(4)
                .write(`Start Time: ${startTime}`)
                .newline()
                .write(`User Agents: ${userAgents}`)
                .newline()
                .write(`Test Count: ${testCount}`)
                .newline()
                .setIndent(0);
        },

        reportFixtureStart (name) {
            if (this.lastSuiteName) {
                this.write('##teamcity[testSuiteFinished name=\'' + escape(this.lastSuiteName) + '\']').newline();
            }
            this.write('##teamcity[testSuiteStarted name=\'' + escape(name) + '\']').newline();
            this.lastSuiteName = name;
        },

        reportTestDone (name, testRunInfo) {
            this.write('##teamcity[testStarted name=\'' + escape(name) + '\']').newline();
            if (testRunInfo.skipped) {
                this.skipped++;
                this.write('##teamcity[testIgnored name=\'' + escape(name) + '\' message=\'skipped\']').newline();
                return;
            }
            if (testRunInfo.errs && testRunInfo.errs.length > 0) {
                this.failed++;
                this.write('##teamcity[testFailed name=\'' + escape(name) +
                    '\' message=\'' + 'Test Failed' +
                    '\' captureStandardOutput=\'true\' ' +
                    'details=\'' + escape(this.renderErrors(testRunInfo.errs)) + '\']').newline();
                return;

            }
            this.write('##teamcity[testFinished name=\'' + escape(name) + '\' duration=\'' + testRunInfo.durationMs + '\']').newline();
        },

        reportTaskDone (endTime, passed, warnings) {
            if (this.lastSuiteName) {
                this.write('##teamcity[testSuiteFinished name=\'' + escape(this.lastSuiteName) + '\']').newline();
            }
            this.write('Test Run Completed:').newline()
                .setIndent(4)
                .write(`End Time: ${endTime}`).newline()
                .write(`Tests Passed: ${passed}`).newline()
                .write(`Tests Failed: ${this.failed}`).newline()
                .write(`Tests Skipped: ${this.skipped}`).newline()
                .write(`Warnings:\n ${warnings.join('\n\t\t')}`).newline()
                .setIndent(0);
        },

        renderErrors (errors) {
            return errors.reduce((string, err) => string + '\n' + this.formatError(err, '') + '\n\n', "");
        },
    };
}

const escape = (str) => {
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
};
