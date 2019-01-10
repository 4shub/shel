/*
 * Route validation
 */

import Joi from 'joi';
import ExpressValidator from 'express-joi-validation';
import { wrapSchemaWithValidationFunctions } from '../../shared/util/assign-routes';

/*
 * Validators
 */

export const pluginValidator = wrapSchemaWithValidationFunctions(ExpressValidator({}), {
    post: {
        body: {
            command: Joi.string().required(),
            isFromCommandLine: Joi.boolean().allow(null),
            sessionId: Joi.string().allow(null),
        }
    },
});
