import axios from 'axios';
import setAuthToken from '../util/setauthtoken';
import {SET_CURRENT_USER, SET_USER, UPDATE_USER, ERRORS} from './types';

export const registerUser = (user, history) => {
    return dispatch => {
        axios.post('/api/user', user)
            .then(r => {
                history.push('/login');
            })
            .catch(e => {
                dispatch({type: ERRORS, payload: e.response.data.msg})
            });
    }
};

export const updateAccount = (user) => {
    return dispatch => {
        axios.put('/api/user', user)
            .then(usr => {
                dispatch({type: UPDATE_USER, payload: usr.data})
            })
            .catch(e => {
                const {username, password, msg} = e.response.data;
                const payload = msg || username || password;
                dispatch({type: ERRORS, payload})
            });
    }
};

export const loginUser = (username, password, history) => {
    return dispatch => {
        axios.post('/api/user/login', {username, password})
            .then(payload => {
                const {msg, token} = payload.data;
                localStorage.setItem('token', token);
                setAuthToken(token);
                dispatch({type: SET_USER, payload: token, msg});
                history.push('/wall');
            })
            .catch(e => {
                const {username, password, msg} = e.response.data;
                const payload = msg || username || password;
                dispatch({type: ERRORS, payload})
            });
    }
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const logoutUser = decoded => {
    return dispatch => {
        setAuthToken(false);
        localStorage.removeItem('token');
        dispatch(setCurrentUser({}));
    }
};
