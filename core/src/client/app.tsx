import * as React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import { Provider } from 'react-redux';
import logger from 'redux-logger'

import { Auth } from './auth/auth';

import './app.scss';
import reducer from './app.reducer';
import epic from './app.epic';

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    reducer,
    compose(applyMiddleware(epicMiddleware, thunk, ...(process.env.NODE_ENV === 'development') ? [logger] : [])),
);

epicMiddleware.run(epic);

export const App = () => (
    <Provider store={store}>
        <Auth />
    </Provider>
);
