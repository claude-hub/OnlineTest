import {createStore, combineReducers} from 'redux';
import * as reducers from './reducers'
global.Store = createStore(combineReducers(reducers), {});
export default global.Store