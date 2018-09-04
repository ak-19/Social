import {GET_MY_POSTS, MY_POSTS_LOADING} from '../actions/types';

const initialState = {
    loading: false,
    posts: []
};

const myPostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case MY_POSTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_MY_POSTS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            };
        default:
            return state;
    }
};

export default myPostsReducer;