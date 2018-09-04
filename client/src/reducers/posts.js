import {GET_POSTS, POSTS_LOADING} from '../actions/types';

const initialState = {
    loading: false,
    posts: []
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            };
        default:
            return state;
    }
};

export default postsReducer;