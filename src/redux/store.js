import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from '../redux/reducers/rootReducer'

const middlewares = [thunk,logger];

const store = createStore(rootReducer,applyMiddleware(...middlewares));
export default store;