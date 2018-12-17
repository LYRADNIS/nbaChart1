import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import rootReducer from './reducers/rootReducer'
// dont know what combineReducers return, if an object wwe can destructure it

export default function configureStore(){
  return createStore(rootReducer, applyMiddleware(thunk, promise(), logger))
}