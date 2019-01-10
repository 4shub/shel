import pluginRouter from './plugin/plugin.router';
import defaultRouter from './default/router';
import { Application } from 'express';

export default ((app: Application) => {
    pluginRouter(app);
    defaultRouter(app);
});
