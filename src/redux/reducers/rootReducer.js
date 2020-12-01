import {combineReducers} from 'redux'
import userReducer from './user/userReducer'
import postReducer from './post/postReducer'

const rootReducer = combineReducers({
    user:userReducer,
    post:postReducer,
});

export default rootReducer;