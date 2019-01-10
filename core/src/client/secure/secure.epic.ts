import { combineEpics, ofType } from 'redux-observable';
import { of, defer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import moment from 'moment';
import Joi from 'joi';

import * as methods from './secure.methods';
import * as actions from './secure.actions';
import { Tracker, TrackerPartial } from '../../interfaces/tracker';


export const loadTracker = (action$: any) =>
    action$.pipe(
        ofType(methods.INITIALIZE_EDITOR),
        switchMap(({ newState: trackerPartial }: { newState?: TrackerPartial }) => {
            return of(true)
        }));



export const secureEpic = combineEpics(
    loadTracker,
);
