export default function () {
    return {
        noColors: true,
        failed: 0,
        skipped: 0,
        lastSuiteName: null,

        reportTaskStart (startTime, userAgents, testCount) {
            console.log(escape(`Starting Test Run!\n\tStart Time: ${startTime}\n\tUser Agents: ${userAgents}\n\tTest Count: ${testCount}\n`));
        },

        reportFixtureStart (name) {
            if (this.lastSuiteName) {
                console.log('##teamcity[testSuiteFinished name=\'' + escape(this.lastSuiteName) + '\']');
            }
            console.log('##teamcity[testSuiteStarted name=\'' + escape(name) + '\']');
            this.lastSuiteName = name;
        },

        reportTestDone (name, testRunInfo) {
            console.log('##teamcity[testStarted name=\'' + escape(name) + '\']');
            if (testRunInfo.skipped) {
                this.skipped++;
                console.log('##teamcity[testIgnored name=\'' + escape(name) + '\' message=\'skipped\']');
                return;
            }
            if (testRunInfo.errs && testRunInfo.errs.length > 0) {
                this.failed++;
                console.log('##teamcity[testFailed name=\'' + escape(name) +
                    '\' message=\'' + 'Test Failed' +
                    '\' captureStandardOutput=\'true\' ' +
                    'details=\'' + escape(this.renderErrors(testRunInfo.errs)) + '\']');
                return;

            }
            console.log('##teamcity[testFinished name=\'' + escape(name) + '\' duration=\'' + testRunInfo.durationMs + '\']');
        },

        reportTaskDone (endTime, passed, warnings) {
            console.log(escape(`\nTest Run Completed:\n\tEnd Time: ${endTime}\n\tTests Passed: ${passed}\n\tTests Failed: ${this.failed}\n\tTests Skipped: ${this.skipped}\n\tWarnings:\n\t\t${warnings.join('\n\t\t')}`));
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
