import axios from 'axios';

import {
    ERRORS,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    PROFILE_NOT_FOUND,
    SET_PROFILE,
    PROFILES_LOADING
} from './types';

export const getProfile = (user) => {
    return dispatch => {
        dispatch({type: PROFILE_LOADING, payload: {}});
        axios.get('/api/profile', user)
            .then(p => {
                dispatch({type: GET_PROFILE, payload: p})
            })
            .catch(e => {
                dispatch({type: PROFILE_NOT_FOUND, payload: e.response.data.msg})
            });
    }
};


export const updateProfile = (profile) => {
    return dispatch => {
        dispatch({type: PROFILE_LOADING, payload: {}});
        axios.post('/api/profile', profile)
            .then(p => {
                dispatch({type: SET_PROFILE, payload: p})
            })
            .catch(e => {
                console.log( e.response.data);
                dispatch({ type: ERRORS, payload: e.response.data.msg});
            });
    }
};


export const getProfiles = () => {
    return dispatch => {
        dispatch({type: PROFILES_LOADING, payload: {}});
        axios.get('/api/profile/all')
            .then(p => {
                dispatch({type: GET_PROFILES, payload: p.data})
            })
            .catch(e => {
                console.log( e.response.data);
                dispatch({ type: ERRORS, payload: e.response.data.msg});
            });
    }
};