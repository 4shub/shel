import * as methods from './secure.methods';

export interface SecureReducerState {

};

const initialState: SecureReducerState = {

};

export const app = (state = initialState, action: any) => {
    switch (action.type) {
        case methods.GET_WEBSITE_CONTENT:
            return {
                ...state,
                isWebsiteToEditLoading: true,
                websiteToTrackError: null,
            };

        default:
            return state;
    }
};

export default app;
