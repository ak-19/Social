import {GET_PROFILES, PROFILES_LOADING} from '../actions/types';

const initialState = {
    profiles: [],
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PROFILES_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILES:
            return {
                ...state,
                loading: false,
                profiles: action.payload
            };
        default:
            return state;
    }
};

