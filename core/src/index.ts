import errorHandler from 'errorhandler';

import app from './app';
import DB from './shared/util/database';
import { pluginManager } from './shared/classes/plugin-manager';

const database = DB.load();

/*
 * Configure app
 */
const DEFAULT_PORT = (() => {
    if (process.env.PORT) {
        return process.env.PORT;
    }

    if (process.env.NODE_ENV === 'testing') {
        return '9001';
    }

    return '9000'
})();

/*
 * Error handling for development
 */
if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}

const afterServerIsOn = () => {
    console.log(
        "[INFO] App is running at http://localhost:%s in %s mode",
        DEFAULT_PORT,
        process.env.NODE_ENV
    );
    console.log("  Press CTRL-C to stop\n");
};

let server = null;

(async () => {
    // connect to db
    await database.connect();

    pluginManager.init();

    // connect to server
    server = app.listen(DEFAULT_PORT, afterServerIsOn);
})();



/*
 * For test suites etc...
 */
export default server;

