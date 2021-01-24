import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../redux/reducers/rootReducer'

let middlewares = []
if (process.env.NODE_ENV === 'development') {
    middlewares = [...middlewares, thunk, require('redux-logger').default];
    } else {
        middlewares = [...middlewares, thunk];
      }

const store = createStore(rootReducer,applyMiddleware(...middlewares));
export default store;