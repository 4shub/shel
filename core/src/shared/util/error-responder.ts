import { Response } from 'express';

const errorResponder = (res: Response, error: any, errorObject?: any) => {
    if (error.message && errorObject && errorObject[error.message]) {
        const { code, ...err } = errorObject[error.message];
        return res
            .status(code || 400)
            .send(err);
    }

    res
        .status(500)
        .send({ error });
};

export default errorResponder;
