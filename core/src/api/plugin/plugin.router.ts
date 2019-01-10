/*
 * The routes themselves
 */
import { Application } from 'express'

import { assignRoutes } from '../../shared/util/assign-routes';
import { pluginController } from './plugin.controller';
import { pluginValidator } from './plugin.validator';

export default ((app: Application) => {
    assignRoutes(app, '/plugin/:id/:step', pluginController, pluginValidator);
    assignRoutes(app, '/plugin/:id', pluginController, pluginValidator);
});
