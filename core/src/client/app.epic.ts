import { combineEpics } from 'redux-observable';

import { secureEpic } from './secure/secure.epic';

const epic = combineEpics(
    /**
     * Imported epics
     */
    secureEpic,
);

export default epic;
