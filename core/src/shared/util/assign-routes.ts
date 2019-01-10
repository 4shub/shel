export const assignRoutes = (app: any, route: string, controllers: any, validators: any = {}) => {
    Object.entries(controllers)
        .forEach(([type, func]) => {
            if (validators[type]) {
                app[type](route, ...validators[type], func);
                return;
            }

            app[type](route, func);
        })
};

/**
 * Wraps each schema with appropriate middleware
 * @param validator
 * @param {Object} schema
 * @returns {{Object}} A object containing an array of schemas to validate requests
 */
export const wrapSchemaWithValidationFunctions = (validator: any, schemaObj: Object) => Object
    .entries(schemaObj)
    .reduce((obj: any, [key, inputObjects]) => {
        obj[key] = Object
            .entries(inputObjects)
            .reduce((arr, [inputType, schema]) => {
                arr.push(validator[inputType](schema));
                return arr;
            }, []);

        return obj;
    }, {});
