import {
    GET_PROFILE,
    PROFILE_LOADING,
    PROFILE_NOT_FOUND,
    SET_PROFILE
} from '../actions/types';

const initialState = {
    profile: undefined,
    profiles: [],
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload.data[0],
                loading: false
            };
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case PROFILE_NOT_FOUND:
            return {
                ...state,
                loading: false
            };
        case SET_PROFILE:
            return {
                ...state,
                profile: action.payload.data[0],
                loading: false
            };
        default:
            return state;
    }
};

