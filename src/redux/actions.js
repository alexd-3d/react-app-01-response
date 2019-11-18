import axios from 'axios';

export const REQUEST_CANCEL = 'REQUEST_CANCEL';
export const REQUEST_RETRY = 'REQUEST_RETRY';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_LOAD_START = 'REQUEST_LOAD_START';
export const SET_THEME = 'SET_THEME';

export const requestRetry = (url) => ({
    type: REQUEST_RETRY,
    payload: 'Retry'
})

export const requestLoadStart = () => ({
    type: REQUEST_LOAD_START
})

export const requestSuccess = (users) => ({
    type: REQUEST_SUCCESS,
    payload: users
})

export const requestError = (error) => ({
    type: REQUEST_ERROR,
    payload: error
})

export const requestCancel = () => ({
    type: REQUEST_CANCEL
})

export const setTheme = (theme) => ({
    type: SET_THEME,
    payload: theme
})

let source, CancelToken;

export const fetchUsers = () => (dispatch) => {
    dispatch(requestLoadStart());

    CancelToken = axios.CancelToken;
    source = CancelToken.source();
    axios.get(`https://jsonplaceholder.typicode.com/users`, {
        cancelToken: source.token
      })
      .then(res => {
        const users = res.data;
        dispatch(requestSuccess(users));
      })
      .catch((error) => {
        if (!axios.isCancel(error)) dispatch(requestError(error));
      });
}

export const requestCancelHandler = () => (dispatch) => {
    source.cancel('Operation canceled by the user.');
    dispatch(requestCancel());
}

export const requestRetryHandler = () => (dispatch) => {
    dispatch(requestRetry());
    dispatch(fetchUsers());
}
