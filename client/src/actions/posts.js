import axios from 'axios';

import {
    GET_SINGLE_POST,
    GET_POSTS,
    SINGLE_POST_LOADING,
    POSTS_LOADING,
    GET_MY_POSTS,
    MY_POSTS_LOADING,
    ERRORS
} from './types';


export const getSinglePost = (postId) => {
    return dispatch => {
        dispatch({type: SINGLE_POST_LOADING, payload: {}});
        axios
            .get(`/api/posts/${postId}`)
            .then(res => {
                dispatch({type: GET_SINGLE_POST, payload: res.data});
            })
            .catch(e => dispatch({type: ERRORS, payload: e.response.data.msg}))
    }
};

export const makeComment = (postId, comment) => {
    return dispatch => {
        axios
            .post(`/api/posts/comment/${postId}`, comment)
            .then(r => {
                dispatch({type: SINGLE_POST_LOADING, payload: {}});
                axios
                    .get(`/api/posts/${postId}`)
                    .then(res => {
                        dispatch({type: GET_SINGLE_POST, payload: res.data});
                    })
                    .catch(e => dispatch({type: ERRORS, payload: e.response.data.msg}))
            })
            .catch(e => dispatch({type: ERRORS, payload: e.response.data.msg}))
    };
};

export const getPosts = () => {
    return dispatch => {
        dispatch({type: POSTS_LOADING, payload: {}});
        axios
            .get('/api/posts')
            .then(res => {
                dispatch({type: GET_POSTS, payload: res.data});
            })
            .catch(e => dispatch({type: ERRORS, payload: e.response.data.msg}))
    }
};

export const getMyPosts = () => {
    return dispatch => {
        getMyPostsWithAxios(dispatch);
    }
};

export const makePost = (newPost) => {
    return dispatch => {
        axios
            .post('/api/posts', newPost)
            .then(r => {
                getMyPostsWithAxios(dispatch);
            })
            .catch(e => dispatch({type: ERRORS, payload: e.response.data.msg}))
    }
};

export const deletePost = (postId) => {
    return dispatch => {
        axios
            .delete(`/api/posts/${postId}`)
            .then(r => {
                getMyPostsWithAxios(dispatch);
            })
            .catch(e => dispatch({type: ERRORS, payload: e.response.data.msg}))
    }
};

export const hatePost = (postId) => {
    return dispatch => {
        axios
            .post(`/api/posts/hate/${postId}`)
            .then(r => {
                dispatch({type: POSTS_LOADING, payload: {}});
                axios
                    .get('/api/posts')
                    .then(res => {
                        dispatch({type: GET_POSTS, payload: res.data});
                    })
                    .catch(e => dispatch({type: ERRORS, payload: e.response.data.msg}))
            })
            .catch(e => dispatch({type: ERRORS, payload: e.response.data.msg}))
    }
};

const getMyPostsWithAxios = (dispatch) => {
    dispatch({type: MY_POSTS_LOADING, payload: {}});
    axios
        .get('/api/posts/my')
        .then(res => {
            dispatch({type: GET_MY_POSTS, payload: res.data});
        })
        .catch(e => dispatch({type: ERRORS, payload: e.response.data.msg}))
};


