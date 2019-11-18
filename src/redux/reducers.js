import { combineReducers } from 'redux';
import * as actions from './actions';
import Themes from '../components/Themes'

export const storeInitial = {
    app: {
        users: null,
        isLoading: null,
        requestError: null
    },
    theme: Themes.light // отдельно - для демонстрации действия combineReducers
}

const appReducer = (state = storeInitial.app, action) => {
    switch (action.type) {
        case actions.REQUEST_RETRY:
            return state;
        case actions.REQUEST_ERROR:
            return {
                        ...state,
                        isLoading: false,
                        requestError: action.payload
                    };
        case actions.REQUEST_LOAD_START:
            return {
                        ...state, 
                        isLoading: true,
                        requestError: null
                    };
        case actions.REQUEST_SUCCESS:
            return {
                        ...state,
                        users: action.payload,
                        isLoading: false,
                        requestError: null
                    };
        case actions.REQUEST_CANCEL:
            return {
                        ...state,
                        isLoading: false,
                        requestError: null
                    };
        default:
            return state;
    }
}

const themeReducer = (state = storeInitial.theme, action) => {
    switch (action.type) {
        case actions.SET_THEME:
            return action.payload;
        default:
            return state;
    }
}

export const reducers = combineReducers({ 
    app: appReducer,
    theme: themeReducer
});
