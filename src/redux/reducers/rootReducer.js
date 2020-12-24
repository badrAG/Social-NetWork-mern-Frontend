import {combineReducers} from 'redux'
import userReducer from './user/userReducer'
import postReducer from './post/postReducer'
import storyReducer from './Story/storyReducer'

const rootReducer = combineReducers({
    user:userReducer,
    post:postReducer,
    story:storyReducer
});

export default rootReducer;