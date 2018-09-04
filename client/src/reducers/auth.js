import jwtDecode from 'jwt-decode';
import {SET_CURRENT_USER, SET_USER, UPDATE_USER} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
    msg: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };
        case SET_USER:
            const {msg} = action;
            return {
                ...state,
                isAuthenticated: notEmpty(action.payload),
                user: jwtDecode(action.payload),
                msg
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: notEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}

const notEmpty = (token) => {
    if (!token) {
        return false;
    }
    if (typeof token === 'object' && Object.keys(token).length === 0) {
        return false;
    }
    return true;
}
