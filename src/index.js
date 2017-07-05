export default function () {
    return {
        noColors: true,
        
        createErrorDecorator () {
            return {
                'span category':       () => '',
                'span step-name':      str => `"${str}"`,
                'span user-agent':     str => this.chalk.gray(str),
                'div screenshot-info': str => str,
                'a screenshot-path':   str => this.chalk.underline(str),
                'code':                str => this.chalk.yellow(str),
                'code step-source':    str => this.chalk.magenta(this.indentString(str, 4)),
                'span code-line':      str => `${str}\n`,
                'span last-code-line': str => str,
                'code api':            str => this.chalk.yellow(str),
                'strong':              str => this.chalk.cyan(str),
                'a':                   str => this.chalk.yellow(`"${str}"`)
            };
        },
        
        reportTaskStart (/* startTime, userAgents, testCount */) {
            throw new Error('Not implemented');
        },

        reportFixtureStart (/* name, path */) {
            throw new Error('Not implemented');
        },

        reportTestDone (/* name, testRunInfo */) {
            throw new Error('Not implemented');
        },

        reportTaskDone (/* endTime, passed, warnings */) {
            throw new Error('Not implemented');
        }
    };
}
