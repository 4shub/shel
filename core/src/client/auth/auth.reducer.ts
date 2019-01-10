import * as methods from './auth.methods';

export interface AuthReducerState {
   user: {
       data: string;
   };
};

const initialState: AuthReducerState = {
    user: null
};

export const app = (state = initialState, action: any) => {
    switch (action.type) {
        case methods.LOGIN_USER:

            return {
                ...state,
                user: action.newState,
            };

        default:
            return state;
    }
};

export default app;
