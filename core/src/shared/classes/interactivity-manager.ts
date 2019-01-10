import { attachReturnValueToExistingFunctionReturn } from '../util/misc';

const DEFAULT_API_DATA = {
    api: 'interactivity',
};

interface AskMetaData {
    retryCount?: number;
    retryForever?: boolean;
    failOn?: string | string[]; // if retryForever is true, the program will only fail on if you specify a value here
    caseSensitive?: boolean
}

const InteractivityManager = {
    init: function init() {
        return Object.entries(this)
            .reduce((obj: any, [key, func]) => {
                if (typeof func === 'function' && func.name !== 'init') {
                    // attach default api metadata as a return value to all functions that are not the 'init'
                    func = attachReturnValueToExistingFunctionReturn(func, DEFAULT_API_DATA);
                }

                obj[key] = func;

                return obj;
            }, {});
    },
    ask: function(question: string, answer: string | string[], meta: any) {
        return {
            type: 'requiredTextResponse',
            data: {
                question,
                answer,
                meta,
            },
        };
    },
    askYN: function(question: string) {
        return this.ask(`${question} [Y/N]:`, 'y', {
            retryForever: true,
            failOn: 'n',
            caseSensitive: false,
        });
    },
    askNumOptions: function(question: string, options: string[]) {
        return this.ask(
            `${question}\n${options.map((v, i) => `[${i}] ${v}`).join(' ')}\nAnswer:`,
            new Array(options.length).fill(0).map((v, i) => i),
            {
                caseSensitive: false,
            }
        );
    },
};

export default InteractivityManager;