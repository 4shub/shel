/**
 * attaches additional return values to the return value of a particular function
 * @param {Function} func
 * @param {object} retVal
 * @returns {() => {}}
 */
export const attachReturnValueToExistingFunctionReturn = (func: Function, retVal: object) => {
    return (function (){
        const oldFunction = func;

        return function(...args: any) {
            return {
                ...retVal,
                ...oldFunction.apply(this, args),
            };
        };
    })();
}


export const randomTokenGenerator = (length: number) => {
    const a: string[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    const b: string[] = [];
    for (let i = 0; i < length; i++) {
        let j:any = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }

    return b.join("");
}