import { combineReducers } from 'redux';

import auth, { AuthReducerState } from './auth/auth.reducer';
import secure, { SecureReducerState } from './secure/secure.reducer';

export interface AppReducerState { secure: SecureReducerState, auth: AuthReducerState };

export default combineReducers({ auth, secure });
