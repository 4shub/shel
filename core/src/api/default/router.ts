/*
 * The routes themselves
 */
import { Application } from 'express'

import Controller from './controller';

export default ((app: Application) => {
    const router = new Controller();

    app.get(`*`, router.get.all);
});
