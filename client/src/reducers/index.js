import {combineReducers} from 'redux';
import authReducer from './auth';
import profileReducer from './profile';
import profilesReducer from './profiles';
import postsReducer from './posts';
import postReducer from './post';
import myPostsReducer from "./myposts";
import errorReducer from './error';

export default combineReducers({authReducer, profileReducer, profilesReducer, postReducer, postsReducer, myPostsReducer, errorReducer});
