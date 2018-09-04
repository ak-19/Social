import {GET_SINGLE_POST, SINGLE_POST_LOADING} from '../actions/types';

const initialState = {
    loading: false,
    post: undefined
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SINGLE_POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_SINGLE_POST:
            return {
                ...state,
                loading: false,
                post: action.payload
            };
        default:
            return state;
    }
};

export default postsReducer;